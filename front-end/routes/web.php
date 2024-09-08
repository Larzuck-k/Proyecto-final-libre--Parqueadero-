<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;


// Rutas públicas

Route::get('/login', function () {
    return view('login');
})->name('login');

Route::get('/register', function () {
    return view('register');
})->name('register');

// Rutas protegidas por autenticación, estado y roles

Route::middleware(['auth', 'status'])->group(function () {
    Route::get('/home', function () {
        return view('home');
    });
    Route::get('/', function () {
        return view('home');
    });
    Route::get('/databases', function () {
        return view('databases');
    })->name('databases');

    Route::get('/table', function () {
        return view('table');
    })->name('table');
    Route::get('/parking', function () {
        return view('parking');
    })->name('parking');
});



// Autenticación de Laravel
Auth::routes();

