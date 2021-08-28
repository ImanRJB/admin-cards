<?php

namespace Milyoona\AdminCards\Http\Controllers;

use GuzzleHttp\Client;
use Milyoona\AdminCards\Model\Microservice;
use phpDocumentor\Reflection\Types\Self_;

class SupervisorController
{
    public function index()
    {
        $microservices = Microservice::select(['status', 'port', 'hostname', 'name'])->get();

        foreach ($microservices as $microservice) {
            try {
                $client = new Client();
                $url = $microservice->hostname . ':' . $microservice->port . '/microservice/' . $microservice->name . '/service/status';
                $response = $client->get($url);

                $microservice->update([
                    'status' => 1
                ]);
            } catch (\Exception $exception) {
                $microservice->update([
                    'status' => 0
                ]);
            }
        }

//        return self::getSupervisorInfo($microservice['name']);

        foreach ($microservices as $microservice) {
            $microservice['supervisor'] = self::getSupervisorInfo($microservice['name']);
        }

        return response(['microservices' => $microservices], 200);
    }


    public function supervisorStart($microservice)
    {
        try {
            $supervisor = self::getSupervisor();
            $supervisor->startProcess($microservice, false);
            return response(['message' => 'سرویس با موفقیت فعال شد', 'status' => 200]);
        } catch (\Exception $exception) {
            if ($exception->getMessage() == 'ALREADY_STARTED: ' . $microservice) {
                return response(['message' => 'سرویس در حال حاضر فعال می باشد', 'status' => 200]);
            }
            return response(['message' => 'خطای ناشناس', 'status' => 500]);
        }
    }


    public function supervisorRestart($microservice)
    {
        try {
            $supervisor = self::getSupervisor();
            $supervisor->stopProcess($microservice, false);
            sleep(2);
            $supervisor->startProcess($microservice, false);
            return response(['message' => 'سرویس با موفقیت ریست شد', 'status' => 200]);
        } catch (\Exception $exception) {
            if ($exception->getMessage() == 'NOT_RUNNING: ' . $microservice) {
                return response(['message' => 'سرویس در حال حاضر فعال نمی باشد', 'status' => 500]);
            }
            return response(['message' => 'خطای ناشناس', 'status' => 500]);
        }
    }


    public function supervisorStop($microservice)
    {
        try {
            $supervisor = self::getSupervisor();
            $supervisor->stopProcess($microservice, false);
            return response(['message' => 'سرویس با موفقیت غیرفعال شد', 'status' => 200]);
        } catch (\Exception $exception) {
            if ($exception->getMessage() == 'NOT_RUNNING: ' . $microservice) {
                return response(['message' => 'سرویس در حال حاضر فعال نمی باشد', 'status' => 500]);
            }
            return response(['message' => 'خطای ناشناس', 'status' => 500]);
        }
    }


    private function getSupervisor() {
        $guzzleClient = new \GuzzleHttp\Client([
            'auth' => [
                config('microservice-monitor.supervisor_username'),
                config('microservice-monitor.supervisor_password')
            ],
        ]);

        $client = new \fXmlRpc\Client(
            config('microservice-monitor.supervisor_url'),
            new \fXmlRpc\Transport\HttpAdapterTransport(
                new \Http\Message\MessageFactory\GuzzleMessageFactory(),
                new \Http\Adapter\Guzzle7\Client($guzzleClient)
            )
        );

        return new \Supervisor\Supervisor($client);
    }


    private function getSupervisorInfo($microservice) {
        try {
            $supervisor = self::getSupervisor();
            $process = $supervisor->getProcess($microservice);
            return $process->getPayload();
        } catch (\Exception $exception) {
            return ['statename' => 'NOT FOUND'];
        }
    }
}
