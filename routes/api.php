<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Milyoona\AdminCards\Http\Controllers\SupervisorController;
use Milyoona\AdminCards\Http\Controllers\MicroserviceController;

/*
|--------------------------------------------------------------------------
| Card API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your card. These routes
| are loaded by the ServiceProvider of your card. You're free to add
| as many additional routes to this file as your card may require.
|
*/

// Supervisor
Route::get('/supervisors', SupervisorController::class . '@index');
Route::get('/supervisor/start/{microservice}', SupervisorController::class . '@supervisorStart');
Route::get('/supervisor/restart/{microservice}', SupervisorController::class . '@supervisorRestart');
Route::get('/supervisor/stop/{microservice}', SupervisorController::class . '@supervisorStop');

// Microservice Status
Route::get('/microservice/status', MicroserviceController::class . '@index');