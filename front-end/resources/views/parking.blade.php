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
    <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
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
                    <h1 class="modal-title fs-5">Crear</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <select class="form-select" id="spaceSelectOption">
                        <option value="0" selected>Seleccionar acción</option>
                        <option value="1">Reservar espacio</option>
                        <option value="2">Ocupar espacio</option>
                    </select>
                    <div class="d-none" id="searchContainer">
                    <label class="form-label my-3" for="name">Nombres</label>
                    <input type="text" class="form-control" name="name"
                        placeholder="Buscar contratista o cliente" id="search">
                    </div>
                    <div class="d-none" id="ocuparEspacioContainer">
                    <label class="form-label my-3">Contratos</label>
                    <select class="form-select" id="id_contratos"></select>
                    <label class="form-label my-3">Tiempo</label>
                    <input type="number" class="form-control" id="tiempo" placeholder="Meses, Dias, Horas o Minutos">

                    </div>
                    <form>

                    </form>
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
                <h5>Ocupado/Reservado por: <b id="busiedBy">as</b></h5>
                <h5>Fecha fin: <b id="busiedByEndDate">2024..</b></h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>


    <script src="/assets/vendors/js/vendor.bundle.base.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
    @foreach(File::files(public_path('js')) as $file)
        <script src="{{ asset('js/' . $file->getFilename()) }}"></script>
    @endforeach

    <script>
        // Elementos HTML
        const placeContainer = document.querySelector("#placeContainer");
        const selectParking = document.querySelector("#selectParking");
        const spaceSelectOption = document.querySelector("#spaceSelectOption");
        const ocuparEspacioModal = document.querySelector("#ocuparEspacioModal");
        const formBodyModal = ocuparEspacioModal.querySelector("form");
        const inputModal = document.querySelector("#search");
        const btnSend = document.querySelector("#send");
        const searchContainer = inputModal.parentElement;
        const id_contratos = document.querySelector("#id_contratos");
        const tiempo = document.querySelector("#tiempo");
        const ocuparEspacioContainer = tiempo.parentElement;

        // FIN 
        btnSend.addEventListener("click",()=>{

            if(spaceSelectOption.value == 1){
            const formData = {};
            if(!document.querySelector("#clienteSeleccion")){
                Swal.fire({
                        position: "center",
                        icon:  "warning",
                        title: "Busca y selecciona un cliente",
                        showConfirmButton: false,
                        timer: 1500 
                                 }).then(()=>{
                                    $("#ocuparEspacioModal").modal("show");
                                 });
            
            return;
            }
            formData.id_cliente_contratista = clienteSeleccion.value;
            formData.id_espacio = ocuparEspacioModal.getAttribute("data-space-free-id");
            formData.tipo = ocuparEspacioModal.innerHTML.includes("Contratista") ? "Contratista" : "Cliente";
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
            if(!document.querySelector("#clienteSeleccion")){
                Swal.fire({
                        position: "center",
                        icon:  "warning",
                        title: "Busca y selecciona un cliente",
                        showConfirmButton: false,
                        timer: 1500 
                                 }).then(()=>{
                                    $("#ocuparEspacioModal").modal("show");
                                 });
            
            return;
            }
            const formData = {};

            formData.tiempo = tiempo.value;
            formData.id_cliente_contratista = clienteSeleccion.value;
            formData.id_contratos = id_contratos.value;
            formData.id_espacio = ocuparEspacioModal.getAttribute("data-space-free-id");
            formData.tipo = ocuparEspacioModal.innerHTML.includes("Contratista") ? "Contratista" : "Cliente";
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
                searchContainer.classList.remove("d-none");
                if(!ocuparEspacioContainer.classList.contains("d-none")){
                    ocuparEspacioContainer.classList.add("d-none");
                }
            }
            else if (spaceSelectOption.value == 2) {
                searchContainer.classList.remove("d-none");
                ocuparEspacioContainer.classList.remove("d-none");
                fetch("{{env("API_URL") . "/contratos/obtener/"}}") .then(response => response.json())
                .then(data => {

                    if (data.length > 0) {
                    id_contratos.innerHTML = "";
                    data.forEach((e)=>{
                    id_contratos.innerHTML += `<option value="${e.id}">${e.nombre}, Tipo: ${e.tipo}, Valor: ${e.valor}, Tiempo: ${e.tiempo}</option>`;
                    })
                    
                    } 
                })
                .catch(error => {
                     Swal.fire({
                        position: "center",
                        icon:  "error",
                        title: "Error al obtener los tipos de contratos",
                        showConfirmButton: false,
                        timer: 3500 
                                 });
                });

            }
            else {
                searchContainer.classList.add("d-none");
                if(!ocuparEspacioContainer.classList.contains("d-none")){
                    ocuparEspacioContainer.classList.add("d-none");
                }
                const select = document.querySelector("#clienteSeleccion");
                const label = document.querySelector("#labelClienteSeleccion");
                if(select){
                  select.remove();
                  label.remove();
                }
                inputModal.value = "";
            }
        })
        selectParking.addEventListener("change", () => {
            initialData();
        });
                    inputModal.addEventListener("input", () => {
                        const inputValue = inputModal.value == "" ? "0" : inputModal.value;
                        fetch("{{env("API_URL") . "/cliente_contratista/obtener/"}}" + inputValue).then(response => response.json())
                            .then(data => {
                                if (data.clientes) {
                                    const clientes = data.clientes;
                                    const contratistas = data.contratistas;
                                    let select = document.querySelector("#clienteSeleccion");
                                    if(select){
                                        select.remove();
                                    }
                                    select = `<label class="form-label my-3" for="clienteSeleccion" id="labelClienteSeleccion">Cliente</label><select id="clienteSeleccion" class="form-select mt-2">`;
                                    clientes.forEach((c) => {
                                        select += `<option value="${c.id}">${c.nombre} - Cliente</option>`;
                                    })
                                    contratistas.forEach((c) => {
                                        select += `<option value="${c.id}">${c.nombre} - Contratista</option>`;
                                    })
                                    select += "</select>";
                                    formBodyModal.innerHTML += select;
                                }
                                else {
                                    const select = document.querySelector("#clienteSeleccion");
                                    const label = document.querySelector("#labelClienteSeleccion");
                                    if (select) {
                                        select.remove();
                                        label.remove();
                                    }
                                }

                            })
                            .catch(error => {
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
                            stringPlace += `<div class="col-4 col-sm-3 col-md-2 col-lg-2 col-xxl-2 mb-4">`;
                            if (e.estado == 'Disponible') {
                                stringPlace += ` <div class="rectangle" data-bs-toggle="modal" data-bs-target="#ocuparEspacioModal" onclick="openModal(1,${e.id})"></div>`;

                            }
                            else if(e.estado == 'Ocupado'){
                                stringPlace += `<div class="rectangle-busy" data-bs-toggle="modal" data-bs-target="#infoModal" onclick="openModal(2,${e.id})"></div>`;
                            }
                            else{
                                stringPlace += `<div class="rectangle-reserva"></div>`;
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
                    alert('Error al obtener los espacios por parqueadero');
                });

        }
        initialData();

        const openModal = (number, id) => {
            const ocuparEspacioModal = document.querySelector('#ocuparEspacioModal');
            const infoModal = document.querySelector('#infoModal');
            if (number == 1) {
                ocuparEspacioModal.setAttribute('data-space-free-id', id);
            }
            else if (number == 2) {
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

        }
    </script>
</body>

</html>