<nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">

        <li class="nav-item">
            <a class="nav-link" href="/">
                <x-menu /> <!-- Llama al componente 'menu.blade.php' -->
                <span class="menu-title">Menú principal</span>
                <i class="mdi mdi-home menu-icon"></i>
            </a>
        </li>


        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false"
                aria-controls="ui-basic">
                <span class="menu-title">Tablas</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi-table-large menu-icon"></i>
            </a>
            <div class="collapse" id="ui-basic">
                <ul class="nav flex-column sub-menu">
                    @if (Auth::user()->id_rol == 1)
                        <li class="nav-item">
                            <a class="nav-link"
                                href="/databases/?api_url={{ env('API_URL') }}/usuario/obtener&title=Usuarios">Usuarios</a>
                        </li>
                    @endif
                     <li class="nav-item">
                        <a class="nav-link"
                            href="/databases/?api_url={{ env('API_URL') }}/detalleCliente/obtener&title=Clientes">Clientes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"
                            href="/databases/?api_url={{ env('API_URL') }}/contratista/obtener&title=Contratistas">Contratistas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"
                            href="/databases/?api_url={{ env('API_URL') }}/contrato/obtener&title=Contratos">Contratos</a>
                    </li>
                     @if (Auth::user()->id_rol == 1)
                    <li class="nav-item">
                        <a class="nav-link"
                            href="/databases/?api_url={{ env('API_URL') }}/factura_contratista/obtener&title=Facturas contratistas">Facturas contratistas</a>
                    </li>
                       @endif
                        @if (Auth::user()->id_rol == 1)
                    <li class="nav-item">
                        <a class="nav-link"
                            href="/databases/?api_url={{ env('API_URL') }}/factura_cliente/obtener&title=Facturas clientes">Facturas clientes</a>
                    </li>
                       @endif
                    @if (Auth::user()->id_rol == 1)
                        <li class="nav-item">
                            <a class="nav-link"
                                href="/databases/?api_url={{ env('API_URL') }}/parqueadero/obtener&title=Parqueaderos">Parqueaderos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"
                                href="/databases/?api_url={{ env('API_URL') }}/espacio/obtener&title=Espacios">Espacios</a>
                        </li>
                    @endif
                    
                    <li class="nav-item">
                        <a class="nav-link"
                            href="/databases/?api_url={{ env('API_URL') }}/reserva/obtener&title=Reservas">Reservas</a>
                    </li>
                    @if (Auth::user()->id_rol == 1)
                        <li class="nav-item">
                            <a class="nav-link"
                                href="/databases/?api_url={{ env('API_URL') }}/rol/obtener&title=Roles">Roles</a>
                        </li>
                    @endif

                    <!-- Más enlaces -->
                </ul>


            </div>
        </li>
    <li class="nav-item">
            <a class="nav-link" href="/parking">
                <span class="menu-title">Parqueadero</span>
                <i class="mdi mdi-car menu-icon"></i>
            </a>
    </li>

        <li class="nav-item">
            <a class="nav-link" href="/facturacion">
                <span class="menu-title">Facturación</span>
                <i class="mdi mdi-cash-register menu-icon"></i>
            </a>
        </li>
    </ul>
</nav>
