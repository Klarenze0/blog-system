<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    //pakita lahat ng user
    public function index(): Response {
        $users = User::withCount('posts');

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    // delete users kasama mga posts

    public function destroy(User $user): RedirectResponse {
        if ($user->id === auth()->id()) {
            return redirect()
                ->back()
                ->with('error', 'You cannot delete your own account.');
        }    

        $user->delete();

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }
}
