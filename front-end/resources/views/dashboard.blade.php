<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <title>Laravel</title>

    <!-- Fonts -->

    <!-- Styles -->
    @foreach(File::files(public_path('css')) as $file)
    <link rel="stylesheet" href="{{ asset('css/' . $file->getFilename()) }}">
    @endforeach
    <!-- plugins:css -->
    <link rel="stylesheet" href="assets/vendors/mdi/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="assets/vendors/ti-icons/css/themify-icons.css">
    <link rel="stylesheet" href="assets/vendors/css/vendor.bundle.base.css">
    <link rel="stylesheet" href="assets/vendors/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/vendors/font-awesome/css/font-awesome.min.css" />
    <link rel="stylesheet" href="assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css">

    
    <!-- End layout styles -->


</head>

<body>



        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <x-navbar />
            <x-sidebar />


            <x-content />

        </div>



        <!-- Load scripts from resources/js -->

        <script src="assets/vendors/js/vendor.bundle.base.js"></script>

        <script src="assets/vendors/chart.js/chart.umd.js"></script>
        <script src="assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.js"></script>

        @foreach(File::files(public_path('js')) as $file)
        <script src="{{ asset('js/' . $file->getFilename()) }}"></script>
        @endforeach

</body>


</html>