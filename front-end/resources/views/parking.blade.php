<!-- plugins:css -->
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>
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
            <div class="p-3 table-container table-responsive text-center">
                <div class="row mb-3">
                    <div class="col text-center">
                        <?php
try {
    $parqueaderos = file_get_contents(env("API_URL") . "/parqueadero/obtener");
} catch (Exception $e) {
    echo "<h1>Error al obtener los datos del parqueadero</h1>";
}
$dataParqueaderos = json_decode($parqueaderos, true);

if ($dataParqueaderos == null) {
    echo "<h1>Error al decodificar, el JSON no es válido</h1>";
}
        ?>
                        <select class="form-select d-inline-block" id="selectParking" style="width: 50%;">
                            @foreach ($dataParqueaderos as $parqueadero)
                                <option value="{{ $parqueadero['id'] }}">{{ $parqueadero['nombre'] }}</option>
                            @endforeach
                        </select>
                    </div>

                </div>
                <div class="row" id="placeContainer"></div>


            </div>


        </div>
    </div>


    <!-- Modals -->
    <!-- Modal -->
    <div class="modal fade text-white text-start" id="ocuparEspacioModal" tabindex="-1"
        aria-labelledby="ocuparEspacioModal" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content bg-dark border-0">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Ocupar o reservar espacio</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <select class="form-select" id="spaceSelectOption">
                        <option value="0" selected>Seleccionar acción</option>
                        <option value="1">Reservar espacio</option>
                        <option value="2">Ocupar espacio</option>
                    </select>
                        <div class="my-2 d-flex justify-content-center w-100 d-none" id="containerButtonsAction"> 
                    <button type="button" class="btn btn-success w-100" id="selectPlacaButton">Placa</button>
                    <button type="button" class="btn btn-success ms-3 w-100" id="selectContratoButton">Contrato</button>
                    </div>
                     
                    <div class="d-none" id="searchContainer">
                    <label class="form-label my-3" for="name">Contratista</label>
                    <input type="text" class="form-control" name="name"
                        placeholder="Buscar por nombres o identificación" id="search">
                    </div>
                    <div class="d-none" id="ocuparEspacioContainer">

                    <div class="d-none" id="ocuparEspacioContratista">
                    <label class="form-label my-3">Tiempo</label>
                    <select class="form-select" id="tiempo">
                        <option value="0">Selecciona el tiempo</option>
                        <option value="1">Días</option>
                        <option value="2">Meses</option>
                    </select>
                    <label class="form-label my-3">Cantidad</label>
                    <input type="number" class="form-control" placeholder="Digite un valor" id="cantidad">

                    <label class="form-label my-3">Valor del contrato</label>
                    <input type="number" class="form-control" placeholder="Digite un valor" id="valorContrato" min="1">
                    </div>

                    {{-- Cliente normal --}}
                    <div class="d-none" id="ocuparEspacioClienteNormal"> 
                    <label class="form-label my-3">Placa del vehículo</label>
                    <input type="text" id="placaOcupar" class="form-control" placeholder="Digite la placa">
                    </div>

                    </div>
   
                    <div class="d-none" id="reservarEspacioContainer">
                       
                        <label class="form-label my-3">Placa del vehículo</label>
                        <input type="text" id="placa" class="form-control" placeholder="Digite la placa">
                         <h5 class="text-center mt-2 text-danger">Si la reserva es para un contratista no es necesario digitar la placa del vehículo</h5>
                    </div>
                     <div class="table-responsive mt-3" style="width:100%" id="datatableContainer">

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" id="send">Enviar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- InfoModal -->
    <div class="modal fade text-white text-start" id="infoModal" tabindex="-1" aria-labelledby="infoModal"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content bg-dark border-0">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Información del espacio</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <h5 id="busiedBy"></h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

      <!-- Status -->
    <div class="modal fade text-white text-start" id="statusModal" tabindex="-1" aria-labelledby="statusModal"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content bg-dark border-0">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Reserva</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h4 class="text-center text-danger"><b>Si presionas "Ocupar" y la reserva tiene placa, automáticamente el espacio se ocupará.</b></h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="ocuparButton">Ocupar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="liberarEspacio">Liberar</button>
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
        // Elementos HTML
        const placeContainer = document.querySelector("#placeContainer");
        const selectParking = document.querySelector("#selectParking");
        const spaceSelectOption = document.querySelector("#spaceSelectOption");
        const ocuparEspacioModal = document.querySelector("#ocuparEspacioModal");
        const inputModal = document.querySelector("#search");
        const btnSend = document.querySelector("#send");
        const searchContainer = inputModal.parentElement;
        const id_contratos = document.querySelector("#id_contratos");
        const tiempo = document.querySelector("#tiempo");
        const ocuparEspacioContainer = tiempo.parentElement.parentElement;

        // FIN 
        btnSend.addEventListener("click",()=>{

            if(spaceSelectOption.value == 1){
            const formData = {};
            
            if(placa.value != ""){
            formData.placa = placa.value;
            }

            formData.id_espacio = localStorage.getItem("data-space-id");
            fetch("{{env("API_URL") . "/reserva/crear/"}}", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            
            }) .then(response => response.json())
                .then(data => {

                    if (data.status == "success") {
                        Swal.fire({
                        position: "center",
                        icon:  data.status,
                        title: data.mensaje,
                        showConfirmButton: false,
                        timer: 1500 
                                 }).then(()=>{
                                location.reload();
                                 });
                    } else {
                        Swal.fire({
                        position: "center",
                        icon:  data.status,
                        title: data.mensaje,
                        showConfirmButton: false,
                        timer: 3500 
                                 });
              
                    }
                })
                .catch(error => {
                     Swal.fire({
                        position: "center",
                        icon:  "error",
                        title: "Error al reservar espacio",
                        showConfirmButton: false,
                        timer: 3500 
                                 });
                });
            
            }   
            else if(spaceSelectOption.value == 2){
            if(selectPlacaButton.classList.contains("btn-secondary")){
                 const formData = {};
                    formData.id_espacio = localStorage.getItem("data-space-id");
                    formData.placa = placaOcupar.value;
                    fetch("{{env("API_URL") . "/detalleCliente/crear"}}", {
                    method:"POST",
                    headers: {
                    'Content-Type': 'application/json'
                            },
                    body: JSON.stringify(formData),
                })
                    .then(response => response.json())
                    .then(data => {
                    Swal.fire({
                        position: "center",
                        icon: data.status,
                        title: data.mensaje,
                        showConfirmButton: false,
                        timer: 1500 
                            }).then(()=>{
                                if(data.status == "success"){
                                location.reload();
                                }         
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        alert('Error al ocupar espacio');
                    });
            }
            else{
            if(!document.querySelector("#contratistaSeleccionado")){
                Swal.fire({
                        position: "center",
                        icon:  "warning",
                        title: "Busca y selecciona un contratista",
                        showConfirmButton: false,
                        timer: 1500 
                                 }).then(()=>{
                                    $("#ocuparEspacioModal").modal("show");
                                 });
            
            return;
            }
            const formData = {};

            formData.tiempo = tiempo.value;
            formData.id_contratista = contratistaSeleccionado.value;
            formData.id_espacio = localStorage.getItem("data-space-id");
            formData.cantidad = cantidad.value;
            formData.valor_contrato = valorContrato.value;
            fetch("{{env("API_URL") . "/contrato/crear/"}}", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            
            }) .then(response => response.json())
                .then(data => {

                    if (data.status == "success") {
                        Swal.fire({
                        position: "center",
                        icon:  data.status,
                        title: data.mensaje,
                        showConfirmButton: false,
                        timer: 1500 
                                 }).then(()=>{
                                location.reload();
                                 });
                    } else {
                        Swal.fire({
                        position: "center",
                        icon:  data.status,
                        title: data.mensaje,
                        showConfirmButton: false,
                        timer: 3500 
                                 }).then(()=>{
                                    $("#ocuparEspacioModal").modal("show");
                                 });
              
                    }
                })
                .catch(error => {
                     Swal.fire({
                        position: "center",
                        icon:  "error",
                        title: "Error al ocupar espacio",
                        showConfirmButton: false,
                        timer: 3500 
                                 })
                });
                }
            }
            else{
                Swal.fire({
                        position: "center",
                        icon:  "warning",
                        title: "Selecciona una opción",
                        showConfirmButton: false,
                        timer: 1500 
                                 });
            }
        })
        spaceSelectOption.addEventListener("change", () => {    

            if (spaceSelectOption.value == 1) {
                reservarEspacioContainer.classList.remove("d-none");
                searchContainer.classList.add("d-none");
                if(!ocuparEspacioContainer.classList.contains("d-none")){
                    ocuparEspacioContainer.classList.add("d-none");
                }
                 if(!containerButtonsAction.classList.contains("d-none")){
                    containerButtonsAction.classList.add("d-none");
                }
            }
            else if (spaceSelectOption.value == 2) {
                searchContainer.classList.remove("d-none");
                ocuparEspacioContainer.classList.remove("d-none");
                containerButtonsAction.classList.remove("d-none");
                if(!reservarEspacioContainer.classList.contains("d-none")){
                    reservarEspacioContainer.classList.add("d-none");
                }
            }
            else {
                searchContainer.classList.add("d-none");
                if(!ocuparEspacioContainer.classList.contains("d-none")){
                    ocuparEspacioContainer.classList.add("d-none");
                }
                 if(!reservarEspacioContainer.classList.contains("d-none")){
                    reservarEspacioContainer.classList.add("d-none");
                }
                if(!containerButtonsAction.classList.contains("d-none")){
                    containerButtonsAction.classList.add("d-none");
                }
                datatableContainer.innerHTML = "";
                inputModal.value = "";
            }
        })
        selectParking.addEventListener("change", () => {
            initialData();
        });
        inputModal.addEventListener("input", () => {
            const inputValue = inputModal.value == "" ? "0" : inputModal.value;
            fetch("{{env("API_URL") . "/contratista/obtener/single?parametro="}}" + inputValue).then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        datatableContainer.innerHTML =  `<h4 id="titleDatatable" class="text-center" style="font-weight:bold">Selecciona un contratista</h4>`;
                        datatableContainer.innerHTML += datatableReturn(data);
                        new DataTable("#datatable",{ 
                            searching: false,
                            ordering:  false,
                            lengthChange: false,
                            pageLength: 3,                    
                            language:{
    
                    "emptyTable":     "Sin datos para mostrar",
                    "info":           "_TOTAL_ resultados",
                    "infoEmpty":      "Mostrando 0 a 0 of de contratistas",
                    "infoFiltered":   "(filtradas de _MAX_ total contratistas)",
                    "infoPostFix":    "",
                    "thousands":      ",",
                    "lengthMenu":     "Mostrar _MENU_ contratistas",
                    "loadingRecords": "Cargando...",
                    "processing":     "",
                    "search":         "",
                    "zeroRecords":    "",
                    "paginate": {
                        "first":      "<",
                        "last":       ">>",
                        "next":       ">",
                        "previous":   "<<"
                    },
                    "aria": {
                        "orderable":  "Ordenar por esta columna",
                        "orderableReverse": "Orden invertido de esta columna"
                    }
                    }})
                    }
                    else {
                        datatableContainer.innerHTML = "";
                    }

                })
                .catch(error => {
                    console.log(error);
                    Swal.fire({
                    position: "center",
                    icon:  "error",
                    title: "Error al obtener los datos",
                    showConfirmButton: false,
                    timer: 1500 
                        });
                });
            });
        const initialData = () => {
            fetch("{{env("API_URL") . "/espacio/obtener/parking?id="}}" + selectParking.value, {})
                .then(response => response.json())
                .then(data => {

                    if (data.length > 0) {
                        placeContainer.innerHTML = "";

                        data.forEach(e => {
                            let stringPlace = "";
                            stringPlace += `<div class="col-6 col-sm-3 col-md-2 col-lg-2 col-xxl-2 mb-4">`;
                            if (e.estado == 'Disponible') {
                                stringPlace += `<h4 class="badge rounded-pill text-bg-warning text-light text-center" style="font-weight:bold;">${e.numero}</h4><div class="rectangle" data-bs-toggle="modal" data-bs-target="#ocuparEspacioModal" onclick="openModal(1,'${e.id}',0,'CONTRATISTA')"></div>`;

                            }
                            else if(e.estado == 'Ocupado'){
                                stringPlace += `<h4 class="badge rounded-pill text-bg-warning text-light text-center" style="font-weight:bold;">${e.numero}</h4><div class="rectangle-busy" data-bs-toggle="modal" data-bs-target="#infoModal" onclick="openModal(2,'${e.id}',0,'CONTRATISTA')"></div>`;
                            }
                            else{
                                 // Generar un temporizador dinámico basado en la fecha actual y e.fechaFin
                                stringPlace += `<h4 class="badge rounded-pill text-bg-warning text-light text-center" style="font-weight:bold;">${e.numero}</h4><div class="rectangle-reserva" data-bs-toggle="modal" data-bs-target="#statusModal" onclick="openModal(3,'${e.id}',${e.reserva_table[0].id},'${e.reserva_table[0].placa}')">
                                <span id="temporizador-${e.id}" class="text-center"></span>
                                </div><h4 class="badge rounded-pill text-bg-danger text-light mt-1" style="font-weight:bold;" id="placa-${e.id}">${e.reserva_table[0].placa == "NINGUNO" ? "CONTRATISTA" : e.reserva_table[0].placa }</h4>`;
                                
                                // Llama a la función para iniciar el temporizador
                                crearTemporizador(`temporizador-${e.id}`, e.reserva_table[0].fin_reserva,e.reserva_table[0].id);
                            }
                            stringPlace += "</div>";
                            placeContainer.innerHTML += stringPlace;
                        });
                    } else {
                          Swal.fire({
                                position: "center",
                                icon:  "error",
                                title: "No hay espacios en este parqueadero",
                                showConfirmButton: false,
                                timer: 1500 
                                 }).then(()=>
                                {
                                    placeContainer.innerHTML = "";
                                }
                                ); // Display the error message from the API response
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert('Error al obtener los espacios por parqueadero');
                });

        }
        initialData();

        const openModal = (number, id,reservaId,placa) => {
            const ocuparEspacioModal = document.querySelector('#ocuparEspacioModal');
            const infoModal = document.querySelector('#infoModal');
            if (number == 1 || number == 3) {
                localStorage.setItem("data-space-id",id);
                localStorage.setItem("data-reserva-id",reservaId);
                localStorage.setItem("data-reserva-placa",placa);
            }
            else if (number == 2) {
           
            
                fetch("{{env("API_URL") . "/contrato/obtener/single?id="}}" +id).then(response => response.json())
                            .then(data => {
                               if(data.status == "success"){
                                if(data.data.length > 1){
                                busiedBy.innerHTML = `Este espacio actualmente está ocupado por <b class="text-danger">${data.data[1].nombre}</b>, este mismo finaliza en la fecha <b class="text-danger">${data.data[0].fecha_fin.substring(0,10)}</b>.`;
                                }
                                else if(data.data.length == 1){
                                let now = new Date(data.data[0].hora_entrada);
                                let offset = -5; // Offset en horas para America/Bogota

                                    // Obtener la fecha actual con el offset de la zona horaria
                                let fechaActualizada = new Date(now.getTime() + 5 * 60 * 60 * 1000);

                                busiedBy.innerHTML = `Este espacio actualmente está ocupado por el vehículo identificado con la placa <b class="text-danger">${data.data[0].placa}</b>, la fecha en la que entró es el <b class="text-danger">${fechaActualizada.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</b> a las <b class="text-danger">${fechaActualizada.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</b>.`;
                                }
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

        }
        const datatableReturn = (data) => {
            let table = `<table class="table table-responsive" cell-spacing="0" id="datatable" style="width:100%">
                    <thead>
                     <tr>
                        <th>
                            Identificación
                        </th>
                        <th>
                            Nombres
                        </th>
                        <th>Acciones</th>
                     </tr>
                    </thead>
                    <tbody>`; 
            data.forEach((e)=>{
                table += `<tr><td>${e.identificacion}</td><td>${e.nombre}</td><td><button type="button" class="btn btn-primary client-button" data-client-id="${e.id}" data-client-names="${e.nombre}" onclick="selectClient(this)">Seleccionar</button></td></tr>`;
            });

            table += `</tbody>
                </table>`;
            return table;
        }

        const selectClient = (element)=>{
            datatableContainer.innerHTML = `<label class="form-label my-2 text-danger">Contratista seleccionado</label><select class="form-select" id="contratistaSeleccionado">
                <option value="${element.getAttribute("data-client-id")}">${element.getAttribute("data-client-names")}</option>
                </select>`
            

        }
                // Función para crear un temporizador dinámico
       const crearTemporizador = (elementId, fechaFuturo,reservaId) => {
        let now = new Date();
        let offset = -5; // Offset en horas para America/Bogota

        // Obtener la fecha actual con el offset de la zona horaria
        let fechaActual = new Date(now.getTime() + offset * 60 * 60 * 1000).getTime();
        
        // Obtener la fecha futura en milisegundos
        let fechaObjetivo = new Date(fechaFuturo).getTime();
        
        // Calcular la diferencia entre la fecha objetivo y la fecha actual
        let diferencia = fechaObjetivo - fechaActual;

        if (diferencia <= 0) {
            document.getElementById(elementId).innerHTML = "Expirado";
            return;
        }

        // Actualizar el temporizador cada segundo
        let intervalo = setInterval(function() {
            now = new Date();
            fechaActual = new Date(now.getTime() + offset * 60 * 60 * 1000).getTime();
            diferencia = fechaObjetivo - fechaActual;

            // Convertir la diferencia total a horas, minutos y segundos
            let horasTotales = Math.floor(diferencia / (1000 * 60 * 60));
            let minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            let segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            // Mostrar el temporizador solo con horas, minutos y segundos
            if(!document.getElementById(elementId)){
                clearInterval(intervalo);
            }
            else{
                document.getElementById(elementId).innerHTML = `${horasTotales}h ${minutos}m ${segundos}s`.substring(0,11);
            }
            
            // Detener el temporizador cuando llegue a cero
            if (diferencia <= 0) {
                clearInterval(intervalo);
                updateSpace(document.getElementById(elementId),elementId,reservaId,false);
            }
        }, 1000);
};

        liberarEspacio.addEventListener("click",()=>{
            updateSpace(document.getElementById("temporizador-"+localStorage.getItem("data-space-id")),"temporizador-"+localStorage.getItem("data-space-id"),localStorage.getItem("data-reserva-id"),true);
        });
        const updateSpace = (element,elementId,reservaId,status)=>{
                status = status ? "&status='SI'" : "";
            fetch("{{env("API_URL") . "/reserva/estado?id="}}" +reservaId+status, {
                    method:"POST",
                    headers: {
                    'Content-Type': 'application/json'
                            },
                })
                    .then(response => response.json())
                    .then(data => {
                    Swal.fire({
                        position: "center",
                        icon: data.status,
                        title: data.mensaje,
                        showConfirmButton: false,
                        timer: 1500 
                            }).then(()=>{
                    if(element){
                    element.parentElement.classList.remove("rectangle-reserva");
                    element.parentElement.classList.add("rectangle");
                    element.parentElement.setAttribute("data-bs-toggle","modal");
                    element.parentElement.setAttribute("data-bs-target","#ocuparEspacioModal");
                    element.parentElement.setAttribute("onclick",`openModal(1,${elementId.substring(13,elementId.length)})`);
                
                    document.getElementById(elementId).remove();
                    document.getElementById("placa-"+elementId.substring(13,elementId.length)).remove();
                    }
                    
                    });
                    })
                    .catch(error => {
                        console.log(error);
                        alert('Error al liberar el espacio');
                    });
        }

        ocuparButton.addEventListener("click",()=>{
            const elementBadge = document.getElementById("placa-"+localStorage.getItem("data-space-id"));
            const ocuparEspacioModal = document.getElementById("ocuparEspacioModal");

            if(elementBadge){
                if(elementBadge.innerHTML == "CONTRATISTA"){
                    new bootstrap.Modal(ocuparEspacioModal).show();
                }
                else{
                    const formData = {};
                    formData.id_espacio = localStorage.getItem("data-space-id");
                    formData.placa = localStorage.getItem("data-reserva-placa");
                    fetch("{{env("API_URL") . "/detalleCliente/crear"}}", {
                    method:"POST",
                    headers: {
                    'Content-Type': 'application/json'
                            },
                    body: JSON.stringify(formData),
                })
                    .then(response => response.json())
                    .then(data => {
                    Swal.fire({
                        position: "center",
                        icon: data.status,
                        title: data.mensaje,
                        showConfirmButton: false,
                        timer: 1500 
                            }).then(()=>{
                                if(data.status == "success"){
                                location.reload();
                                }
                                
                    });
                    })
                    .catch(error => {
                        console.log(error);
                        alert('Error al ocupar espacio');
                    });
                }
            }
            else{
                new bootstrap.Modal(ocuparEspacioModal).show();
            }
        });
        selectPlacaButton.addEventListener("click",()=>{
            ocuparEspacioClienteNormal.classList.remove("d-none");
            ocuparEspacioContratista.classList.add("d-none");
            searchContainer.classList.add("d-none");
            selectContratoButton.classList.remove("btn-secondary");
            selectContratoButton.classList.add("btn-success");
            selectPlacaButton.classList.remove("btn-success");
            selectPlacaButton.classList.add("btn-secondary");
            datatableContainer.innerHTML = "";
        });

        selectContratoButton.addEventListener("click",()=>{
            ocuparEspacioContratista.classList.remove("d-none");
            ocuparEspacioClienteNormal.classList.add("d-none");
            searchContainer.classList.remove("d-none");
            selectPlacaButton.classList.remove("btn-secondary");
            selectPlacaButton.classList.add("btn-success");
            selectContratoButton.classList.remove("btn-success");
            selectContratoButton.classList.add("btn-success");
        });

    </script>
</body>

</html>