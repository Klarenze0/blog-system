<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth'])->get('/dashboard', function () {
    return match(auth()->user()->role->value) {
        'admin' => redirect('/admin/posts'),
        default => redirect('/posts'),
    };
    
})->name('dashboard');

require __DIR__.'/settings.php';
