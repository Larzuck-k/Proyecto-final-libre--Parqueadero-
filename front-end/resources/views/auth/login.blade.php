<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="{{ asset('css/app.css') }}">
  <link rel="stylesheet" href="assets/vendors/mdi/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="assets/vendors/ti-icons/css/themify-icons.css">
    <link rel="stylesheet" href="assets/vendors/css/vendor.bundle.base.css">
    <link rel="stylesheet" href="assets/vendors/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/vendors/font-awesome/css/font-awesome.min.css" />
    <link rel="stylesheet" href="assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css">
  <title>Ingreso</title>

  <!-- Styles -->
  @foreach(File::files(public_path('css')) as $file)
  <link rel="stylesheet" href="{{ asset('css/' . $file->getFilename()) }}">
  @endforeach
  <!-- End layout styles -->
  <link rel="shortcut icon" href="../../assets/images/logo-black.svg" />
</head>
<body>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth">
        <div class="row flex-grow">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left p-5 bgd">
              <div class="brand-logo text-center">
                <img src="../../assets/images/logo-black.svg">
              </div>
              <h4 class="text-center">Bienvenido a ParkingAPP</h4>
              <h6 class="font-weight-light text-center">Inicia sesión para continuar</h6>
              <form method="POST" action="{{ route('login') }}" class="pt-3">
                @csrf
                <div class="form-group">
                  <input id="email" type="email" class="form-control form-control-lg @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" placeholder="Correo electrónico">
                  @error('email')
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ $message }}</strong>
                    </span>
                  @enderror
                </div>
                <div class="form-group">
                  <input id="password" type="password" class="form-control form-control-lg @error('password') is-invalid @enderror" name="password" required autocomplete="current-password" placeholder="Contraseña">
                  @error('password')
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ $message }}</strong>
                    </span>
                  @enderror
                </div>
                <div class="mt-3 d-grid gap-2">
                  <button type="submit" class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">INGRESAR</button>
                </div>
                <div class="my-2 d-flex justify-content-between align-items-center">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}> Recordarme
                    </label>
                  </div>
                  {{-- @if (Route::has('password.request'))
                    <a href="{{ route('password.request') }}" class="auth-link text-primary">Forgot password?</a>
                  @endif --}}
                </div>
                <div class="text-center mt-4 font-weight-light"> ¿No tienes una cuenta? <a href="{{ route('register') }}" class="text-primary">Registrarme</a></div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <!-- container-scroller -->
  <!-- plugins:js -->
  <script src="assets/vendors/js/vendor.bundle.base.js"></script>
  <script src="assets/vendors/chart.js/chart.umd.js"></script>
  <script src="assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.js"></script>

  @foreach(File::files(public_path('js')) as $file)
  <script src="{{ asset('js/' . $file->getFilename()) }}"></script>
  @endforeach
  <!-- endinject -->
</body>
</html>
