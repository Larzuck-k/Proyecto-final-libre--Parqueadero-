<?php

use Illuminate\Support\Facades\Route;


Route::get('/login', function () {
    return view('login');
});
Route::get('/register', function () {
    return view('register');
});
Auth::routes();

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
