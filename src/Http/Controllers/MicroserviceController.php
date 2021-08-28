<?php

namespace Milyoona\AdminCards\Http\Controllers;

use GuzzleHttp\Client;
use Milyoona\AdminCards\Model\Microservice;

class MicroserviceController
{
    public function index()
    {
        $microservices = Microservice::select(['status'])->all();

        foreach ($microservices as $microservice) {
            try {
                $client = new Client();
                $url = $microservice->hostname . ':' . $microservice->port . '/microservice/' . $microservice->name . '/service/status';
                $response = $client->get($url);
                $response = json_decode($response->getBody());


                $microservice->update([
                    'status' => 1
                ]);
            } catch (\Exception $exception) {
                $microservice->update([
                    'status' => 0
                ]);
            }
        }

        foreach ($microservices as $microservice) {
            $microservice['supervisor'] = self::getSupervisorInfo($microservice['name']);
        }

        return response(['microservices' => $microservices], 200);
    }
}
