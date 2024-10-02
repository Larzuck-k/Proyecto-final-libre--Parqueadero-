<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="{{ asset('css/app.css') }}">
  <title>Registro</title>

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
              <h4 class="text-center">Crea tu cuenta</h4>
              <h6 class="font-weight-light text-center">Llena los campos para registrarte</h6>
              <form method="POST" action="{{ route('register') }}" class="pt-3">
                @csrf

                <div class="form-group">
                  <input id="name" type="text" class="form-control form-control-lg @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus placeholder="Nombres">
                  @error('name')
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ $message }}</strong>
                    </span>
                  @enderror
                </div>

                <div class="form-group">
                  <input id="email" type="email" class="form-control form-control-lg @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" placeholder="Correo electrónico">
                  @error('email')
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ $message }}</strong>
                    </span>
                  @enderror
                </div>

                <div class="form-group">
                  <input id="password" type="password" class="form-control form-control-lg @error('password') is-invalid @enderror" name="password" required autocomplete="new-password" placeholder="Contraseña">
                  @error('password')
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ $message }}</strong>
                    </span>
                  @enderror
                </div>

                <div class="form-group">
                  <input id="password-confirm" type="password" class="form-control form-control-lg" name="password_confirmation" required autocomplete="new-password" placeholder="Confirmar contraseña">
                </div>

                <div class="mt-3 d-grid gap-2">
                  <button type="submit" class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">REGISTRARME</button>
                </div>
              </form>
              <div class="text-center mt-4 font-weight-light"> ¿Ya tienes una cuenta? <a href="{{ route('login') }}" class="text-primary">Ingresar</a></div>
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
