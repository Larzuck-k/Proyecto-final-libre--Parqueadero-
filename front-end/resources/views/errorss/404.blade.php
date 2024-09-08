<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="{{Vite::asset('resources/images/logo.png')}}" type="image/x-icon">
        <title>El Redentor</title>

        <!-- Fonts -->
        @vite(['resources/css/errors.css'])
    </head>
    <body class="cloak__wrapper">
    <h1>404</h1>
    <div >
  <div class="cloak__container">
    <div class="cloak"></div>
  </div>
</div>
<div class="info-error">
  <h2>No pudimos encontrar la página solicitada</h2>
  <p>
  Estamos bastante seguros de que esa página solía estar aquí, pero parece haber desaparecido. Pedimos disculpas en su nombre.</p><a href="/" rel="noreferrer noopener">Volver al inicio</a>
</div>
    </body>
</html>
