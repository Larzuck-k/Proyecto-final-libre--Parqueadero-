<nav class="navbar default-layout-navbar navbar-color col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
  <div class="navbar-color text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
    <a class="navbar-brand brand-logo" href="{{ url('/') }}">
      <img src="{{ asset('assets/images/logo.svg') }}" alt="logo" style="width: 200px; height: 50px;" />
    </a>
    <a class="navbar-brand brand-logo-mini" href="{{ url('/') }}">
      <img src="{{ asset('assets/images/logo-mini.svg') }}" alt="logo" style="width: 200px; height: 50px;" />
    </a>
  </div>
  <div class="navbar-menu-wrapper d-flex align-items-stretch">
    <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
      <span class="mdi mdi-menu"></span>
    </button>
    <div class="search-field d-none d-md-block">
      <form class="d-flex align-items-center h-100" action="#">
        <div class="input-group">
          <div class="input-group-prepend bg-transparent">
            <i class="input-group-text border-0 mdi mdi-magnify"></i>
          </div>
          <input type="text" class="form-control bg-white rounded-4 border-0" placeholder="Buscar..">
        </div>
      </form>
    </div>
    <ul class="navbar-nav navbar-nav-right">
      <!-- Messages Dropdown -->
      <li class="nav-item dropdown">
        <a class="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-bs-toggle="dropdown"
          aria-expanded="false">
          <i class="mdi mdi-email-outline"></i>
          <span class="count-symbol bg-warning"></span>
        </a>
        <div class="dropdown-menu dropdown-menu-end navbar-dropdown preview-list" aria-labelledby="messageDropdown">
          <h6 class="p-3 mb-0 bg-warning">Mensajes</h6>
          <div class="dropdown-divider"></div>
          <!-- Repeat for other messages -->
          <a class="dropdown-item preview-item">
            <div class="preview-thumbnail">
              <img src="{{ asset('assets/images/faces/face4.jpg') }}" alt="image" class="profile-pic">
            </div>
            <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
              <h6 class="preview-subject ellipsis mb-1 font-weight-normal">Marco te envió un mensaje
              </h6>
              <p class="text-gray mb-0">Hace 1 minuto</p>
            </div>
          </a>
          <div class="dropdown-divider"></div>
          <!-- Add more items as needed -->
          <h6 class="p-3 mb-0 text-center bg-primary">4 mensajes nuevos</h6>
        </div>
      </li>

      <!-- Notifications Dropdown -->
      <li class="nav-item dropdown">
        <a class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#"
          data-bs-toggle="dropdown">
          <i class="mdi mdi-bell-outline"></i>
          <span class="count-symbol bg-danger"></span>
        </a>
        <div class="dropdown-menu dropdown-menu-end navbar-dropdown preview-list"
          aria-labelledby="notificationDropdown">
          <h6 class="p-3 mb-0 bg-danger">Notificaciones</h6>
          <div class="dropdown-divider"></div>
          <!-- Repeat for other notifications -->
          <a class="dropdown-item preview-item">
            <div class="preview-thumbnail">
              <div class="preview-icon bg-success">
                <i class="mdi mdi-calendar"></i>
              </div>
            </div>
            <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
              <h6 class="preview-subject font-weight-normal mb-1">Evento hoy</h6>
              <p class="text-gray ellipsis mb-0">Solo recuerda que tienes un evento hoy</p>
            </div>
          </a>
          <div class="dropdown-divider"></div>
          <!-- Add more items as needed -->
          <h6 class="p-3 mb-0 text-center bg-primary">Ver todas las notificaciones</h6>
        </div>
      </li>

      <!-- Profile Dropdown -->
      <li class="nav-item nav-profile dropdown">
        <a class="nav-link dropdown-toggle" id="profileDropdown" href="#" data-bs-toggle="dropdown"
          aria-expanded="false">
          <div class="nav-profile-img">
            <img src="{{ asset('assets/images/faces/face1.jpg') }}" alt="image">
            <span class="availability-status online"></span>
          </div>
          <div class="nav-profile-text">
            <p class="mb-1 text-white">{{ Auth::user()->name }}</p>
          </div>
        </a>
        <div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
          {{-- <a class="dropdown-item" href="#">
            <i class="mdi mdi-cached me-2 text-success"></i> Activity Log
          </a> --}}
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="{{ route('logout') }}"
            onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
            <i class="mdi mdi-logout me-2 text-primary"></i> Cerrar sesión
          </a>
          <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
            @csrf
          </form>
        </div>
      </li>
    </ul>
    <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
      data-toggle="offcanvas">
      <span class="mdi mdi-menu"></span>
    </button>
  </div>
</nav>