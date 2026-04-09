<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecordController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->post('/records', [RecordController::class, 'addRecord']);
Route::middleware('auth:sanctum')->get('/loadRecords', [RecordController::class, 'loadRecords']);
Route::middleware('auth:sanctum')->get('/loadAmount', [RecordController::class, 'loadAmount']);
Route::middleware('auth:sanctum')->get('/filterCategory', [RecordController::class, 'filterCategory']);
Route::middleware('auth:sanctum')->delete('/deleteRecord/{id}', [RecordController::class, 'deleteRecord']);
