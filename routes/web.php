<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\AssociationController;
use App\Http\Controllers\AssociationMemberController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('associations', AssociationController::class)
     ->middleware(['auth', 'verified']);

Route::resource('roles', RoleController::class)
     ->middleware(['auth', 'verified']);

Route::resource('members', MemberController::class)
     ->middleware(['auth', 'verified']);
 
Route::post('/associations/{association}/members', [AssociationController::class, 'storeMemberAssociation'])->name('associations.members.store');

Route::post('/roles/add-member', [RoleController::class, 'addMember'])->name('roles.addMember');

Route::delete('/member-amount/{id}', [AssociationMemberController::class, 'destroy'])->name('member-amount.destroy');

     
  
require __DIR__.'/auth.php';
