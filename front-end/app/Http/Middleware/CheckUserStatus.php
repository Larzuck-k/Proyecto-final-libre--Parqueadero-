<?php

// app/Http/Middleware/CheckUserStatus.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckUserStatus
{
    /**
     * Manejar una petición entrante.
     */
    public function handle($request, Closure $next)
    {
        // Verifica que el usuario esté autenticado y que esté activo
        if (Auth::check() && Auth::user()->estado == 1) {
            return $next($request);
        }
        Auth::logout();
        // Si el usuario no está activo, redirigir
        return redirect('/login')->with('error', 'Tu cuenta está inactiva.');
    }
}
