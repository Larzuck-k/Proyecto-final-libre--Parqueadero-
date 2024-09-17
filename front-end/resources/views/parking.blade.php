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
                        <option value="1">Ocupar espacio</option>
                    </select>
                    <div class="d-none" id="searchContainer">
                    <label class="form-label my-3" for="name">Nombres</label>
                    <input type="text" class="form-control" name="name"
                        placeholder="Buscar contratista o cliente" id="search">
                    </div>
                    
                    <form>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Enviar</button>
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

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>


    <script src="/assets/vendors/js/vendor.bundle.base.js"></script>

    @foreach(File::files(public_path('js')) as $file)
        <script src="{{ asset('js/' . $file->getFilename()) }}"></script>
    @endforeach

    <script>
        const placeContainer = document.querySelector("#placeContainer");
        const selectParking = document.querySelector("#selectParking");
        const spaceSelectOption = document.querySelector("#spaceSelectOption");
        const ocuparEspacioModal = document.querySelector("#ocuparEspacioModal");
        const formBodyModal = ocuparEspacioModal.querySelector("form");
        const inputModal = document.querySelector("#search");
        const searchContainer = inputModal.parentElement;
        spaceSelectOption.addEventListener("change", () => {

            if (spaceSelectOption.value == 1) {
                searchContainer.classList.remove("d-none");
                if (inputModal) {
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
                                    select = `<select id="clienteSeleccion" class="form-select mt-2">`;
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

                                    if (select) {
                                        console.log("");
                                        select.remove();
                                    }
                                }

                            })
                            .catch(error => {
                                alert('Error al obtener los datos');
                            });
                    });
                }
            }
            else if (spaceSelectOption.value == 2) {
                searchContainer.classList.remove("d-none");
                formBodyModal.innerHTML = "";
            }
            else {
                searchContainer.classList.add("d-none");
                let select = document.querySelector("#clienteSeleccion");
                if(select){
                  select.remove();
                }
                inputModal.value = "";
            }
        })
        selectParking.addEventListener("change", () => {
            initialData();
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
                            else {
                                stringPlace += `<div class="rectangle-busy" data-bs-toggle="modal" data-bs-target="#infoModal" onclick="openModal(2,${e.id})"></div>`;
                            }
                            stringPlace += "</div>";
                            placeContainer.innerHTML += stringPlace;
                        });
                    } else {
                        alert(
                            "No hay espacios en este parqueadero"); // Display the error message from the API response
                    }
                })
                .catch(error => {
                    alert('Error al obtener los espacios por parqueadero');
                });

        }
        initialData();

        const openModal = (number, element, id) => {
            const ocuparEspacioModal = document.querySelector('#ocuparEspacioModal');
            const infoModal = document.querySelector('#infoModal');
            if (number == 1) {
                ocuparEspacioModal.setAttribute('data-space-id', id);
            }
            else if (number == 2) {
                infoModal.setAttribute('data-space-id', id);
            }

        }
    </script>
</body>

</html>