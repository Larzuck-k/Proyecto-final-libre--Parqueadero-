<?php

// app/Http/Middleware/RoleMiddleware.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Manejar una petición entrante.
     */
    public function handle($request, Closure $next)
    {
        // Verifica que el usuario esté autenticado y tenga el rol requerido
        if (Auth::check() && Auth::user()->id_rol == 1) {
            return $next($request);
        }

        // Si el usuario no tiene el rol adecuado, redirigir
        return redirect('/')->with('error', 'No tienes permiso para acceder a esta página.');
    }
}
