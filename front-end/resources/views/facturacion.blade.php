<!-- plugins:css -->
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}/Facturación</title>
    <link rel="shortcut icon" href="../../assets/images/logo-black.svg" />
    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link rel="stylesheet" href="/assets/vendors/mdi/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="/assets/vendors/ti-icons/css/themify-icons.css">
    <link rel="stylesheet" href="/assets/vendors/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="/css/parking.css">
    <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.datatables.net/2.1.7/css/dataTables.dataTables.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css">
    @foreach(File::files(public_path('css')) as $file)
        <link rel="stylesheet" href="{{ asset('css/' . $file->getFilename()) }}">
    @endforeach


</head>

<body>
    <div id="app">
        <x-navbar />
        <div class="container-fluid page-body-wrapper ">
            <x-sidebar />
            
               <div class="table-responsive mx-3 my-3" style="width:100%">
                <h3 class="text-center my-2">Espacios</h3>
                <p class="text-center">Selecciona uno de los espacios para realizar la debida facturación</p>
                <table class="table table-responsive" cell-spacing="0" id="datatable" style="width:100%">
                    <thead>
                     <tr>
                        <th>
                            Id Parqueadero
                        </th>
                        <th>
                            Número
                        </th>
                         <th>
                            Estado
                        </th>
                        <th>Acciones</th>
                     </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                asd
                            </td>
                        </tr>
                    </tbody>
                </table>
           
              


            </div>


        </div>
    </div>
      <!-- BillModal -->
    <div class="modal fade text-white text-start" id="billModal" tabindex="-1" aria-labelledby="billModal"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content bg-dark border-0">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Facturar</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <h5>Ocupado/Reservado por: <b id="busiedBy">as</b></h5>
                <h5>Fecha fin: <b id="busiedByEndDate">2024..</b></h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="btnSend">Generar</button>
                </div>
            </div>
        </div>
    </div>


   


    <script src="/assets/vendors/js/vendor.bundle.base.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
    @foreach(File::files(public_path('js')) as $file)
        <script src="{{ asset('js/' . $file->getFilename()) }}"></script>
    @endforeach

    <script src="https://cdn.datatables.net/2.1.7/js/dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/2.1.7/js/dataTables.bootstrap5.js"></script>
    <script>
        const tbody = datatable.querySelector("tbody");

        fetch("{{env("API_URL") . "/espacio/obtener"}}").then(response => response.json()).then((response)=>{

            if(response.length > 0){
                tbody.innerHTML = "";

                response.forEach(e => {
                    if(e.estado == "Ocupado"){
 tbody.innerHTML += `<tr><td>${e.id_parqueadero}</td><td>${e.numero}</td><td>${e.estado}</td><td><button type="button" class="btn btn-primary" onclick="openModal(${e.id})" data-bs-toggle="modal" data-bs-target="#billModal">Facturar</button></td></tr>`;
                    }
                   
                });

                new DataTable("#datatable",
                {
                    language:
                    {
    
                    "emptyTable":     "Sin datos para mostrar",
                    "info":           "Mostrando _START_ a _END_ de _TOTAL_ entradas",
                    "infoEmpty":      "Mostrando 0 a 0 of de entradas",
                    "infoFiltered":   "(filtradas de _MAX_ total entradas)",
                    "infoPostFix":    "",
                    "thousands":      ",",
                    "lengthMenu":     "Mostrar _MENU_ entradas",
                    "loadingRecords": "Cargando...",
                    "processing":     "",
                    "search":         "Buscar:",
                    "zeroRecords":    "Ningún dato encontrado",
                    "paginate": {
                        "first":      "Primero",
                        "last":       "Último",
                        "next":       "Siguiente",
                        "previous":   "Anterior"
                    },
                    "aria": {
                        "orderable":  "Ordenar por esta columna",
                        "orderableReverse": "Orden invertido de esta columna"
                    }
                    }
                });
            }
        }).catch((error)=>{
            Swal.fire({
            position: "center",
            icon:  "error",
            title: "Eror al obtener los contratos",
            showConfirmButton: false,
            timer: 1500 
           })
        });
        const openModal = (id) =>{
            fetch("{{env("API_URL") . "/contrato/obtener/single?id="}}" +id).then(response => response.json())
                            .then(data => {
                               if(data.status == "success"){
                                busiedBy.innerHTML = data.data[1].nombre;
                                busiedByEndDate.innerHTML = data.data[0].fecha_fin.substring(0,10);
                               }
                               else{
                                Swal.fire({
                                position: "center",
                                icon:  "error",
                                title: data.mensaje,
                                showConfirmButton: false,
                                timer: 1500 
                                 });
                               }

                            })
                            .catch(error => {
                                 Swal.fire({
                                position: "center",
                                icon:  "error",
                                title: "Error al obtener los datos del espacio",
                                showConfirmButton: false,
                                timer: 1500 
                                 });
                            });
        }
        
        </script>
</body>

</html>