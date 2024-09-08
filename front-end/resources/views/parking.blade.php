<!-- plugins:css -->
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link rel="stylesheet" href="/assets/vendors/mdi/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="/assets/vendors/ti-icons/css/themify-icons.css">
    <link rel="stylesheet" href="/assets/vendors/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="/css/parking.css">
    @foreach(File::files(public_path('css')) as $file)
        <link rel="stylesheet" href="{{ asset('css/' . $file->getFilename()) }}">
    @endforeach


</head>

<body>
    <div id="app">
        <x-navbar/>
        <div class="container-fluid page-body-wrapper ">
            <x-sidebar />
            <div class="p-3 table-container table-responsive text-center">
            
            <div class="row">
            @for ($i = 0; $i < 200; $i++)
                <div class="col-4 col-sm-3 col-md-2 col-lg-2 col-xxl-2 mb-4">
                @if ($i % 7 == 0)
                    <div class="rectangle-busy">

                    </div>
                @else
                        <div class="rectangle"></div>
                    @endif

                </div>  
            @endfor
                </div>  
            </div>

        </div>
    </div>


    
    <script src="/assets/vendors/js/vendor.bundle.base.js"></script>

    @foreach(File::files(public_path('js')) as $file)
        <script src="{{ asset('js/' . $file->getFilename()) }}"></script>
    @endforeach


</body>

</html>