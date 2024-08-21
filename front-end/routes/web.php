<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MenuController;
Route::get('/login', function () {
    return view('login');
});
Route::get('/register', function () {
    return view('register');
});
Route::get('/table', function () {
    return view('table');
});
Auth::routes();

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/menu', [App\Http\Controllers\MenuController::class, 'index'])->name('menu');
