<?php

use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\FeedController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

// public feed, di need ng login

// public feed - lahat makikita
Route::get('/', [FeedController::class, 'index'])->name('feed.index');
Route::get('/post/{post}', [FeedController::class, 'show'])->name('feed.show');

//auth routes - need nakalogin

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function() {
        return match(auth()->user()->role->value) {
            'admin' => redirect('/admin/posts'),
            'default' => redirect('/posts'),
        };
    })->name('dashbord');

    // user posts - sariling posts
    Route::prefix('posts')->name('posts.')->group(function () {
        Route::get('/', [PostController::class, 'index'])->name('index');
        Route::get('create', [PostController::class, 'create'])->name('create');
        Route::post('/', [PostController::class, 'store'])->name('store');
        Route::get('/{post}/edit', [PostController::class, 'edit'])->name('edit');
        Route::post('/{post}', [PostController::class, 'update'])->name('update');
        Route::delete('/{post}', [PostController::class, 'destroy'])->name('delete');
    });
});

// admin routes - need admin 

Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::prefix('posts')->name('posts.')->group(function () {
            Route::get('/', [AdminPostController::class, 'index'])->name('index');
            Route::get('/{post}/post', [AdminPostController::class, 'edit'])->name('edit');
            Route::post('/{post}', [AdminPostController::class, 'update'])->name('update');
            Route::delete('/{post}', [AdminPostController::class, 'delete'])->name('delete');
        });

        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/', [AdminUserController::class, 'index'])->name('index');
            Route::delete('/{user}', [AdminUserController::class, 'destroy'])->name('destroy');
        });
    });




require __DIR__.'/settings.php';
