<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PeliculaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

 Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
     return $request->user();
 });

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router){
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/me', [AuthController::class, 'me']);
});

Route::group(['middleware' => ['auth:api']], function() {
    
    Route::controller(PeliculaController::class)->group(function () {
        Route::get('/peliculas/usuario', 'index');
        Route::get('/peliculas', 'peliculas');
        Route::post('/pelicula','store');
        Route::get('/pelicula/{id}','show');
        Route::post('/pelicula/{id}','update');
        Route::delete('/pelicula/{id}','destroy');
        Route::post('/pelicula/{id}/categorias','asociarCategorias');
        Route::get('/ultima/pelicula', 'ultimoId');
        Route::get('/pelicula/{id}/categorias', 'categoriasAsociadas');
    
    });
    
    Route::get('/categorias', [CategoriaController::class, 'index']);


});