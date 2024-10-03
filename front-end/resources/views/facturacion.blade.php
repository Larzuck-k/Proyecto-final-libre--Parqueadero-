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
            
               <div class="table-responsive mx-5 my-3" style="width:100%">
                <h3 class="text-center my-2">Espacios</h3>
                <p class="text-center">Selecciona uno de los espacios para realizar la debida facturación</p>
                <table class="table table-responsive" cell-spacing="0" id="datatable" style="width:100%">
                    <thead> 
                     <tr>
                        <th>
                            Id
                        </th>
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
                <h4 class="text-center"><b class="text-success">Seleccionar "Generar" para crear la factura del respectivo espacio</b></h4>
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
        localStorage.clear();
        const tbody = datatable.querySelector("tbody");

        fetch("{{env("API_URL") . "/espacio/obtener"}}").then(response => response.json()).then((response)=>{

            if(response.length > 0){
                tbody.innerHTML = "";

                response.forEach(e => {
                    if(e.estado == "Ocupado"){
                    tbody.innerHTML += `<tr><td>${e.id}</td><td>${e.id_parqueadero}</td><td>${e.numero}</td><td>${e.estado}</td><td><button type="button" class="btn btn-primary" onclick="openModal('${e.id}',${e.id_parqueadero})" data-bs-toggle="modal" data-bs-target="#billModal">Facturar</button></td></tr>`;
                    }
                   
                });

                new DataTable("#datatable",
                {
                    columnDefs:[{
                    target:0,
                    visible:false,
                    searchable:false,
                    }],
                    lengthChange: false,
                    pageLength: 15,
                    ordering: false,
                    language:
                    {
    
                    "emptyTable":     "Sin datos para mostrar",
                    "info":           "_TOTAL_ Facturas totales",
                    "infoEmpty":      "Mostrando 0 a 0 de entradas",
                    "infoFiltered":   "(filtradas de _MAX_ total entradas)",
                    "infoPostFix":    "",
                    "thousands":      ",",
                    "lengthMenu":     "Mostrar _MENU_ entradas",
                    "loadingRecords": "Cargando...",
                    "processing":     "",
                    "search":         "Buscar:",
                    "zeroRecords":    "Ningún dato encontrado",
                    "paginate": {
                        "first":      "<<",
                        "last":       ">>",
                        "next":       ">",
                        "previous":   "<"
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
        const openModal = (id,parkingId) =>{
            localStorage.setItem("data-bill-space-id",id);
            localStorage.setItem("data-bill-parking-id",parkingId);
        }
        btnSend.addEventListener("click",()=>{
            const query = `?id_espacio=${localStorage.getItem("data-bill-space-id")}&id_parqueadero=${localStorage.getItem("data-bill-parking-id")}`;
             fetch("{{env("API_URL") . "/espacio/obtener/tipo"}}"+query).then(response => response.json())
                            .then(data => {
                                if(data.status == "success"){
                                    crearFactura(data.tipo);
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

                            }).catch(error => {
                                 Swal.fire({
                                position: "center",
                                icon:  "error",
                                title: "Error al crear la factura",
                                showConfirmButton: false,
                                timer: 1500 
                                 });
                            });
        });
        
        const crearFactura = (tipo) =>{
            console.log(tipo);
            const formData = {};
            formData.id_espacio = localStorage.getItem("data-bill-space-id");
            formData.id_parqueadero = localStorage.getItem("data-bill-parking-id");
            if(tipo == 1){
                fetch("{{env("API_URL") . "/factura_contratista/crear"}}",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body: JSON.stringify(formData)
            }).then(response => response.json())
            .then(data => {
                if(data.status == "success"){
                    Swal.fire({
                position: "center",
                icon:  "success",
                title: data.mensaje,
                showConfirmButton: false,
                timer: 1500 
                    }).then(()=>{
                        location.reload();
                    });
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

            }).catch(error => {
                console.log(error);
                    Swal.fire({
                position: "center",
                icon:  "error",
                title: "Error al crear la factura",
                showConfirmButton: false,
                timer: 1500 
                    });
            }); 
            }
            else if(tipo == 2){
                Swal.fire({
  title: 'Ingresa el valor de la hora',
  input: 'number',
  inputLabel: 'Valor',
  inputPlaceholder: 'Digita el valor',
  inputAttributes: {
    min: 1, // valor mínimo que se puede ingresar
    step: 1 // paso del incremento o decremento
  },
  showCancelButton: true,
  confirmButtonText: 'Generar Factura',
  cancelButtonText: 'Cancelar',
  inputValidator: (value) => {
    if (!value || isNaN(value)) {
      return 'Debes ingresar un valor válido'; // Mensaje de validación si no se ingresa un número
    }
  }
}).then((result) => {
  if (result.isConfirmed) {
    // Aquí obtienes el valor ingresado
    const valorIngresado = parseFloat(result.value);
    formData.valor_hora = valorIngresado;
    fetch("{{env("API_URL") . "/factura_cliente/crear"}}",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body: JSON.stringify(formData)
            }).then(response => response.json())
            .then(data => {
                if(data.status == "success"){
                    Swal.fire({
                position: "center",
                icon:  "success",
                title: data.mensaje,
                showConfirmButton: false,
                timer: 1500 
                    }).then(()=>{
                        location.reload();
                    });
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

            }).catch(error => {
                console.log(error);
                    Swal.fire({
                position: "center",
                icon:  "error",
                title: "Error al crear la factura",
                showConfirmButton: false,
                timer: 1500 
                    });
            }); 

            }
            });

            }
        }
        </script>
</body>

</html>
