<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, String $role): mixed
    {
        if (! Auth::check()) {
            return redirect('/login');
        }   
        
        if (Auth::user()->role->value !== $role) {
            abort(403, 'Unauthorized');
        }

        return $next($request);
    }
}
