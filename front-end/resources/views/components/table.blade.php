<?php
// URL de la API
$apiUrl = $_GET["api_url"]; // Reemplaza con la URL de tu API
$title = $_GET["title"]; // Reemplaza con la URL de tu API

$pages = ['Usuarios', 'Clientes','Contratistas','Contratos', 'Espacios', 'Facturas contratistas','Facturas clientes','Parqueaderos', 'Reservas', 'Roles'];
$pagesAdmin = ['Usuarios',  'Espacios', 'Parqueaderos','Facturas contratistas','Facturas clientes', 'Roles'];
if (!in_array($title, $pages)) {
    ?>
<script>
    location.href = "/home";
</script>
<?php
}
if (in_array($title, $pagesAdmin) && Auth::user()->id_rol != 1) {
    ?>
<script>
    location.href = "/home";
</script>
<?php 
}
$updateUrl = str_replace("obtener", "estado", $apiUrl); // Reemplaza con la URL de tu API para actualizar


// Obtener los datos de la API
$response = FALSE;
$roles = FALSE;
$parqueaderos = FALSE;
$messageError = "";
try {
    $response = file_get_contents($apiUrl);
    if ($title == "Usuarios") {
        $roles = file_get_contents(env("API_URL") . "/rol/obtener");
    } else if ($title == "Espacios") {
        $parqueaderos = file_get_contents(env("API_URL") . "/parqueadero/obtener");
    }
} catch (Exception $e) {
    if (!$roles && $title == "Usuarios") {
        $messageError .= "Error al obtener los datos de los roles\n";
    }
    if (!$parqueaderos && $title == "Espacios") {
        $messageError .= "Error al obtener los datos de los parqueaderos\n";
    }

    if ($response == FALSE) {
        $messageError .= "Error al obtener los datos de $title\n";
    }
    $response = false;
    $roles = false;
    $parqueaderos = false;
}


// Decodificar el JSON
$data = json_decode($response, true);
$dataRoles = json_decode($roles, true);
$dataParqueaderos = json_decode($parqueaderos, true);
$headersRoles = [];
$headersParqueaderos = [];

if ($title == "Usuarios") {
    if ($dataRoles === NULL) {
        $messageError .= "Error al decodificar el JSON roles\n";
    }

    if (empty($dataRoles)) {
        $data = [];
    } else {
        $headersRoles = array_keys($dataRoles[0]);
    }
} else if ($title == "Espacios") {
    if ($dataParqueaderos === NULL) {
        $messageError .=  "Error al decodificar el JSON parqueaderos\n";
    }
   
    $todosVacios = true;
    foreach ($dataParqueaderos[0] as $valor) {
        if (!empty($valor)) {
            $todosVacios = false;
            break;
        }
    }

    if ($todosVacios) {
        $messageError .= "Necesitas crear un parqueadero primero para gestionar los espacios\n";
    } 
   else {
        $headersParqueaderos = array_keys($dataParqueaderos[0]);
    }
}

// Verificar si la decodificación fue exitosa
if ($data === NULL) {
    $messageError .=  "Error al decodificar el JSON\n";
}

// Verificar que los datos no están vacíos
if (empty($data)) {
    $messageError .=  "No se encontraron datos\n";

} 

if($messageError == ""){
    // Obtener las claves del primer elemento para usar como encabezados de columna
    $headers = array_keys($data[0]);
    // Añadir una columna de acciones
    if (in_array('estado', $headers) && $title != "Contratos" && $title != "Facturas contratistas" && $title != "Facturas clientes" && $title != "Clientes" && $title != "Reservas") {
        $headers[] = 'Acciones';
    }

    echo '<p></p>';
    echo '<span class="display-3 fw-bold">' . $title . '</span>';
    echo '<p></p>';

    if ($title != "Roles" && $title != "Contratos" && $title != "Reservas" && $title != "Facturas contratistas" && $title != "Facturas clientes" && $title != "Clientes") {
        echo '<button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#createModal">Crear Nuevo</button>';
    }

    echo '<p></p>';


    // Generar la tabla HTML
    echo '<table border="1" class=" table-responsive table table-striped " cellpadding="5" cellspacing="0">';
    echo '<thead>';
    echo '<tr>';
    foreach ($headers as $header) {
        $header = strtoupper(substr($header, 0, 1)) . substr($header, 1, strlen($header) - 1);
        switch (strtolower($header)) {
            case "estado":
                $header = "Estado";
                break;
            case "ultima_visita":
                $header = "Última visita";
                break;
            case "email":
                $header = "Correo";
                break;
            case "password":
                $header = "Contraseña";
                break;
            case "id_usuario":
                $header = "Id usuario";
                break;
            case "name":
                $header = "Nombre";
                break;
            case "nombre_rol":
                $header = "Rol";
                break;
            case "id_parqueadero":
                $header = "Id parqueadero";
                break;
            case "fecha_inicio":
                $header = "Fecha inicio";
                break;
            case "fecha_fin":
                $header = "Fecha fin";
                break;
            case "id_contratista":
                $header = "Id contratista";
                break;
            case "id_espacio":
                $header = "Id espacio";
                break;
            case "fin_reserva":
                $header = "Fin reserva";
                break;
            case "fecha_emision":
                $header = "Fecha de emisión";
                break;
            case "monto_total":
                $header = "Monto total";
                break;
            case "identificacion":
                $header = "Identificación";
                break;
            case "id_contrato":
                $header = "Id contrato";
                break;
            case "valor_hora":
                $header = "Valor hora";
                break;
            case "hora_entrada":
                $header = "Hora entrada";
                break;
            case "hora_salida":
                $header = "Hora salida";
                break;
            case "id_cliente":
                $header = "Id cliente";
                break;
            case "valor_contrato":
                $header = "Valor contrato";
                break;
        }

        if (strtolower($header) != "id_rol" && $header != "Id parqueadero"  && strtolower($header) != "id_detalle_cliente") {
                echo "<th>" . htmlspecialchars(__($header)) . "</th>";
        }
    }
    echo '</tr>';
    echo '</thead>';
    echo '<tbody>';
    foreach ($data as $row) {
        $isEmptyRow = true;
        foreach ($row as $column => $value) {
            if ($column !== 'id' && !empty($value)) {
                $isEmptyRow = false;
                break;
            }
        }
        if (!$isEmptyRow) {

            echo '<tr data-id="' . htmlspecialchars($row['id']) . '">';
            foreach ($headers as $header) {
                if (isset($row[$header]) || $header == "Acciones") {  // Verificar si la columna existe en la fila
                    if ($header === 'Acciones') {
                        // Añadir formularios de activar/desactivar y editar en la columna de acciones
                        $id = htmlspecialchars(is_array($row['id']) ? implode(', ', $row['id']) : $row['id']);


                        $status = isset($row['estado']) ? htmlspecialchars(is_array($row['estado']) ? implode(', ', $row['estado']) : $row['estado']) : "";

                        $actionForm = $status == 1
                            ? "<button class='btn btn-danger' onclick='updateStatus($id, 0)'>Desactivar</button>"
                            : "<button class='btn btn-success' onclick='updateStatus($id, 1)'>Activar</button>";

                                $editButton = "<button class='btn btn-primary' onclick='showEditModal($id)'>Editar</button>";
                        if($title != "Espacios" && $title != "Contratos" && $title != "Reservas" && $title != "Facturas clientes" && $title != "Facturas contratistas" && $title != "Clientes"){
                                echo "<td>$actionForm $editButton</td>";
                        }
                        else if($title == "Espacios"){
                                echo "<td>$editButton</td>";
                        }
                      

                    } else {
                        // Verificar si el valor en $row[$header] es un array
                        $cellValue = is_array($row[$header]) ? implode(', ', $row[$header]) : $row[$header];
                        if ($header === 'estado') {
                            if ($title != "Espacios") {
                                $cellValue = $cellValue == 1 ? "Activo" : "Inactivo";
                            }

                        }
                        if ($header === 'password') {
                            echo "<td>*****</td>";
                        } else {
                            // Verificar si el valor es una fecha en formato ISO 8601
                            $date = DateTime::createFromFormat(DateTime::ATOM, $cellValue);
                            if ($date === false) {
                                // Intentar otro formato si es necesario
                                $date = DateTime::createFromFormat('Y-m-d\TH:i:s.u\Z', $cellValue);
                            }
                            if ($date !== false) {
                                // Si es una fecha, formatear
                                $formattedDate = $date->format('Y/m/d H:i:s');
                                echo "<td>" . htmlspecialchars($formattedDate) . "</td>";
                            } else {

                                // Si no es una fecha, sanitizar la salida
                                if ($header != "id_rol") {
                                    if($header == "estado"){
                                        if($cellValue == "Activo" || $cellValue == "Disponible"){
                                            echo "<td><span class=\"badge rounded-pill text-bg-success text-light\" style=\"font-weight: bold\">" . htmlspecialchars($cellValue) . "</span></td>";
                                        }
                                        else if($cellValue == "Reservado"){
                                           echo "<td><span class=\"badge rounded-pill text-bg-warning text-light\" style=\"font-weight: bold\">" . htmlspecialchars($cellValue) . "</span></td>"; 
                                        }
                                        else{
                                            echo "<td><span class=\"badge rounded-pill text-bg-danger text-light\" style=\"font-weight: bold\">" . htmlspecialchars($cellValue) . "</span></td>";
                                        }
                                        
                                    }
                                    else if ($header == "id_parqueadero") {
                                        echo "<td style=\"display:none\">" . htmlspecialchars($cellValue) . "</td>";
                                    } else {
                                        echo "<td>" . htmlspecialchars($cellValue) . "</td>";
                                    }
                                }



                            }
                        }
                    }
                } else {
                    // Manejo del caso en que la columna no existe en la fila
                    if($header == "hora_salida"){
                    echo "<td>SIN REGISTRAR</td>";
                    }else{
                    echo "<td>Columna no disponible</td>";
                    }
                    
                }
            }



        }
        echo '</tr>';
    }
    echo '</tbody>';
    echo '</table>';


    echo '<div class="modal text-white text-start"    id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">';
    echo '<div class="modal-dialog" role="document">';
    echo '<div class="modal-content bg-dark border-0">';
    echo '<div class="modal-header">';
    echo '<h5 class="modal-title" id="editModalLabel">Editar registro</h5>';

    echo '</div>';
    echo '<div class="modal-body">';
    echo '<form id="editForm">';
    echo '</form>';
    echo '</div>';

    echo '<input type="hidden" value="" id="editthis"/>';

    echo '</div>';
    echo '</div>';
    echo '</div>';




    // ... (rest of your code remains the same)

    echo '<div class="modal text-white text-start" id="createModal" tabindex="-1" role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">';
    echo '<div class="modal-dialog" role="document">';
    echo '<div class="modal-content bg-dark border-0">';
    echo '<div class="modal-header">';
    echo '<h5 class="modal-title" id="createModalLabel">Crear Nuevo Registro</h5>';

    echo '</div>';
    echo '<div class="modal-body">';
    echo '<form id="createForm">';
    echo '</form>';
    echo '</div>';

    echo '</div>';
    echo '</div>';
    echo '</div>';
    ?>
    <script>
    function updateStatus(id, status) {
        var updateUrl = '<?php    echo $updateUrl; ?>';
        var data = {
            id: id,

        };

        fetch(updateUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {

                if (data.status === 'success') {
                    location.reload();
                } else {
                    alert(data.mensaje); // Display the error message from the API response
                }

            })
            .catch(error => {
                Swal.fire({
                position: "center",
                icon: "error",
                title: "Error al actualizar estado",
                showConfirmButton: false,
                timer: 1500 
                });
            });
    }


    function showEditModal(id) {
        var row = document.querySelector(`tr[data-id="${id}"]`);
        document.getElementById("editthis").value = id;
        if (row === null) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `No se encontró la fila con id ${id}`,
                showConfirmButton: false,
                timer: 1500 
                });
            return;
        }

        var columns = row.children;
        var formData = {};

        // Crear los campos de edición dinámicamente
        var editForm = document.getElementById('editForm');
        editForm.innerHTML = '';
        var headers = <?php    echo json_encode($headers); ?>;
        for (var i = 0; i < headers.length - 1; i++) {
            var title = document.createElement("label");
            var columnName = headers[i];
            title.setAttribute("for", columnName);
            title.setAttribute("class", "m-2");
            var input = document.createElement('input');
            input.type = 'text';
            input.className = "form-control rounded-3 ";
            input.setAttribute("required", "");

            var value = row.children[i].textContent.trim();
            input.value = value;

            if (columnName === "id") {
                input.setAttribute("disabled", "");
            }
            if (columnName === "password") {
                input.removeAttribute("required");
                input.name = columnName;
                input.value = "";
                value = "";
            } else {
                input.name = columnName;
            }

            if (value.match(/^\d+$/)) {
                input.value = value;
                input.type = 'number';
                input.min = 0;
            } else if (value.includes("@")) {
                input.value = value;
                input.type = 'email';
                input.pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            } else if (value.match(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/)) {
                var date = new Date(value.replace(/\//g, '-'));
                var formattedDate =
                    `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}T${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
                input.value = formattedDate;
                input.type = 'datetime-local';
            }

            switch (columnName) {
                case "id_usuario":
                    columnName = "none";
                    title.style = "display:none";
                    input.style = "display:none";
                    break;
                case "ultima_visita":
                    columnName = "Última visita";
                    title.style = "display:none";
                    input.style = "display:none";
                    break;
                case "identificacion":
                    input.type = "number";
                    input.name = columnName;
                    columnName = "Identificación";
                    input.className = "form-control rounded-3";
                    break;
                case "name":
                    input.type = 'text';
                    input.name = columnName;
                    columnName = "Nombre";
                    input.className = "form-control rounded-3";
                    break;
                case "password":
                    input.autocomplete = "new-password";
                    input.type = "password";
                    input.name = columnName;
                    input.placeholder = "CAMPO NO OBLIGATORIO";
                    input.className = "form-control rounded-3";
                    columnName = "Contraseña";
                    break;
                case "telefono":
                    columnName = "Teléfono";
                    break;
                case "correo":
                case "email":
                    columnName = "Correo";
                    break;
                case "valor":
                    input.name = columnName;
                    input.type = "number";
                    input.className = "form-control rounded-3";
                    break;
                case "tipo":
                    input = document.createElement("select");
                    input.name = columnName;
                    input.className = "form-select";
                    input.innerHTML =
                        `<option value="Contrato" ${value === "Contrato" ? "selected" : ""}>Contrato</option><option value="Tiempo" ${value === "Tiempo" ? "selected" : ""}>Tiempo</option>`;
                    break;
                case "tiempo":
                    input = document.createElement("select");
                    input.name = columnName;
                    input.className = "form-select";
                    input.innerHTML =
                        `<option value="minutos" ${value === "minutos" ? "selected" : ""}>Minutos</option><option value="horas" ${value === "horas" ? "selected" : ""}>Horas</option><option value="dias" ${value === "dias" ? "selected" : ""}>Días</option><option value="meses" ${value === "meses" ? "selected" : ""}>Meses</option>`;
                    break;
                case "nombre_rol":
                    @if($title == "Usuarios")
                                    input = document.createElement("select");
                                    input.name = "id_rol";
                                    input.className = "form-select";
                                    columnName = "Rol";
                                    input.innerHTML += `<?php

                        foreach ($dataRoles as $rol) {
                            $id_rol = $rol['id'];
                            $nombre_rol = $rol['nombre'];
                            echo "<option value=\"$id_rol\"/>$nombre_rol</option>";
                        }
                                                                    ?>`;
                                    Array.from(input.options).forEach((element) => {
                                        if (element.innerText == row.children[i - 1].textContent.trim()) {
                                            element.setAttribute("selected", true);
                                        }
                                    })

                    @endif

                    break;
                case "id_parqueadero":
                    @if($title == "Espacios")
                                    input = document.createElement("select");
                                    input.name = "id_parqueadero";
                                    input.className = "form-select";
                                    columnName = "Parqueadero";
                                    input.innerHTML += `<?php

                        foreach ($dataParqueaderos as $parqueadero) {
                            $id_parqueadero = $parqueadero['id'];
                            $nombre_parqueadero = $parqueadero['nombre'];
                            echo "<option value=\"$id_parqueadero\">$nombre_parqueadero</option>";
                        }
                                                                                                                ?>`;
                    @endif

                    Array.from(input.options).forEach((element) => {
                        if (element.innerText == row.children[i + 2].textContent.trim()) {
                            element.setAttribute("selected", true);
                        }
                    })
                    break;
            }


            if (columnName.match(/^id_.+/)) {
                let apiname = columnName.replace("id_", "");
                let api = "<?php    echo $apiUrl; ?>";
                let desarmapi = api.split("/");
                desarmapi[3] = apiname.toLowerCase();
                let apiUrl = `${desarmapi[0]}//${desarmapi[2]}/${desarmapi[3]}/${desarmapi[4]}` + " ";

                input.autocomplete = "off";
                var dataList = document.createElement("datalist");
                dataList.id = "autocomplete-list-" + columnName;
                input.setAttribute("list", dataList.id);

                input.addEventListener("input", function () {
                    var params = {
                        column: columnName,
                        query: input.value
                    };
                    fetch(apiUrl, {
                        method: 'GET',
                        params: params
                    })
                        .then(response => response.json())
                        .then(data => {
                            dataList.innerHTML = "";
                            data.forEach(element => {
                                var option = document.createElement("option");
                                option.value = element.id;
                                option.text = element.Nombre;
                                dataList.appendChild(option);
                            });
                        });
                });

                editForm.appendChild(dataList);
            }

            title.innerText = columnName.charAt(0).toUpperCase() + columnName.slice(1);
            if (columnName !== "id_rol" && columnName !== "estado" && columnName != "tipo_ocupacion" && columnName != "parqueadero") {
                editForm.appendChild(title);
                editForm.appendChild(input);
                editForm.appendChild(document.createElement('br'));
            }
        }

        var modalFooter = document.createElement("div");
        modalFooter.setAttribute("class", "modal-footer");

        var submit = document.createElement("button");
        submit.setAttribute("class", "btn btn-success");
        submit.setAttribute("type", "submit");
        submit.innerText = "Guardar cambios";
        modalFooter.appendChild(submit);

        var close = document.createElement("a");
        close.setAttribute("class", "btn btn-secondary ");
        close.setAttribute("data-bs-dismiss", "modal");
        close.innerText = "Cerrar";
        modalFooter.appendChild(close);

        editForm.appendChild(modalFooter);

        editForm.addEventListener('submit', function (event) {
            event.preventDefault();
            editRecord();
        });

        // Mostrar el modal
        $('#editModal').modal('show');
    }

    function editRecord() {
        var id = document.getElementById("editthis").value
        var formData = {};
        var editForm = document.getElementById('editForm');
        var inputs = editForm.children;
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            if (input.name !== "password" || input.value !== "") {
                formData[input.name] = input.value;
            }
        }

        var updateUrl = '<?php echo str_replace('estado', 'editar', $updateUrl); ?>';

        fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
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
                icon: "error",
                title: data.mensaje,
                showConfirmButton: false,
                timer: 1500 
                }); // Display the error message from the API response
                }
            })
            .catch(error => {
                console.error(error);
               Swal.fire({
                position: "center",
                icon: "error",
                title: error,
                showConfirmButton: false,
                timer: 1500 
                }); 
            });

        // Ocultar el modal
        $('#editModal').modal('hide');
    }

    function padZero(value) {
        return (value < 10 ? '0' : '') + value;
    }


    var table = document.querySelector('table');

    // Find the column index of the "estado" column
    var columnIndex = -1;
    Array.from(table.rows[0].cells).forEach(function (cell, index) {
        if (cell.textContent.trim() === 'estado') {
            columnIndex = index;
        }
    });

    // Hide the column
    if (columnIndex !== -1) {
        table.querySelectorAll('tr').forEach(function (row) {
            row.cells[columnIndex].style.display = 'none';
        });
    }

    // Create the form fields dynamically
    var headers = <?php    echo json_encode($headers); ?>;
    headers = headers.filter(header => header !== "Acciones");

    for (var i = 0; i < headers.length; i++) {
        var title = document.createElement("label");
        var columnName = headers[i];
        title.setAttribute("for", columnName);
        title.setAttribute("class", "m-2");

        var input;

        switch (columnName) {
            case "id":
                input = document.createElement('input');
                input.name = columnName;
                input.type = 'text';
                input.className = "form-control rounded-3";
                input.setAttribute("disabled", "");
                input.placeholder = "Automático";
                break;

            case "password":
                input = document.createElement('input');
                input.name = columnName;
                input.type = "password";
                columnName = "Contraseña";
                input.className = "form-control rounded-3";
                input.removeAttribute("required");
                break;

            case "correo":
            case "email":
                input = document.createElement('input');
                input.name = columnName;
                input.type = 'email';
                columnName = "Correo";
                input.className = "form-control rounded-3";
                input.pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                break;

            case "estado":
                input = document.createElement("select");
                input.name = columnName;
                input.className = "form-select";
                input.innerHTML = `<option value="1" selected>Activo</option><option value="0">Inactivo</option>`;
                title.style.display = "none";
                input.style.display = "none";
                break;

            case "ultima_visita":
                input = document.createElement('input');
                input.name = columnName;
                input.type = 'text'; // Use 'text' or 'date' depending on your requirement
                input.style.display = "none";
                title.style.display = "none";
                break;
            case "identificacion":
                    input = document.createElement('input');;
                    input.name = columnName;
                    input.type = 'number';
                    input.value = "";
                    columnName = "Identificación";
                    input.className = "form-control rounded-3";
                    break;
            case "name":
                input = document.createElement('input');
                input.type = 'text';
                input.name = columnName;
                columnName = "Nombre";
                input.className = "form-control rounded-3";
                break;

            case "telefono":
                input = document.createElement('input');
                input.name = columnName;
                input.type = 'text';
                input.className = "form-control rounded-3";
                break;

            case "id_usuario":
                input = document.createElement('input');
                input.name = columnName;
                input.type = "number";
                input.value = <?php    echo Auth::id(); ?>;
                input.style.display = "none";
                title.style.display = "none";
                break;

            case "valor":
                input = document.createElement('input');
                input.name = columnName;
                input.type = "number";
                input.className = "form-control rounded-3";
                break;

            case "tipo":
                input = document.createElement("select");
                input.name = columnName;
                input.className = "form-select";
                input.innerHTML =
                    `<option value="Contrato" selected>Contrato</option><option value="Tiempo">Tiempo</option>`;
                break;

            case "tiempo":
                input = document.createElement("select");
                input.name = columnName;
                input.className = "form-select";
                input.innerHTML =
                    `<option value="minutos" selected>Minutos</option><option value="horas">Horas</option><option value="dias">Días</option><option value="meses">Meses</option>`;
                break;
            case "nombre_rol":
                @if($title == "Usuarios")
                            input = document.createElement("select");
                            input.name = "id_rol";
                            input.className = "form-select";
                            columnName = "Rol";
                            input.innerHTML += `<?php

                    foreach ($dataRoles as $rol) {
                        $id_rol = $rol['id'];
                        $nombre_rol = $rol['nombre'];
                        echo "<option value=\"$id_rol\">$nombre_rol</option>";
                    }
                                                    ?>`;


                @endif
                break;
            case "id_parqueadero":
                @if($title == "Espacios")

                            input = document.createElement("select");
                            input.name = "id_parqueadero";
                            input.className = "form-select";
                            columnName = "Parqueadero";
                            input.innerHTML += `<?php

                    foreach ($dataParqueaderos as $parqueadero) {
                        $id_parqueadero = $parqueadero['id'];
                        $nombre_parqueadero = $parqueadero['nombre'];
                        echo "<option value=\"$id_parqueadero\">$nombre_parqueadero</option>";
                    }
                                                                                ?>`;
                @endif
                break;
            default:
                input = document.createElement('input');
                input.name = columnName;
                input.type = 'text';
                input.className = "form-control rounded-3";
                break;
        }


        // Set the label text
        var labelText = columnName.charAt(0).toUpperCase() + columnName.slice(1);
        title.innerText = labelText;

        if (columnName != "id_rol" && columnName != "parqueadero") {
            createForm.appendChild(title);
            createForm.appendChild(input);
            createForm.appendChild(document.createElement('br'));
        }

    }

    // Add autocomplete for columns with "ID_somename"
    for (var i = 0; i < headers.length; i++) {
        var columnName = headers[i];
        if (columnName.match(/^id_.+/)) {
            let apiname = columnName.replace("id_", "");
            let api = "<?php    echo $apiUrl; ?>";
            let desarmapi = api.split("/");
            desarmapi[3] = apiname.toLowerCase();
            let apiUrl = `${desarmapi[0]}//${desarmapi[2]}/${desarmapi[3]}/${desarmapi[4]}`;

            var input = createForm.querySelector(`input[name="${columnName}"]`);
            if (input) {
                input.autocomplete = "off"; // disable browser autocomplete
                var dataList = document.createElement("datalist");
                dataList.id = "autocomplete-list-" + columnName;
                input.setAttribute("list", dataList.id);

                input.addEventListener("input", function () {
                    var params = {
                        column: columnName,
                        query: input.value
                    };
                    fetch(apiUrl, {
                        method: 'GET',
                        params: params
                    })
                        .then(response => response.json())
                        .then(data => {
                            dataList.innerHTML = "";
                            data.forEach(element => {
                                var option = document.createElement("option");
                                option.value = element.id;
                                option.text = element.Nombre;
                                dataList.appendChild(option);
                            });
                        });
                });

                createForm.appendChild(dataList);
            }
        }
    }

    // Add footer with submit and close buttons
    var modalFooter = document.createElement("div");
    modalFooter.setAttribute("class", "modal-footer");

    var submit = document.createElement("button");
    submit.setAttribute("class", "btn btn-success");
    submit.setAttribute("type", "submit");
    submit.innerText = "Crear Registro";
    modalFooter.appendChild(submit);

    var close = document.createElement("a");
    close.setAttribute("class", "btn btn-secondary");
    close.setAttribute("data-bs-dismiss", "modal");
    close.innerText = "Cerrar";
    modalFooter.appendChild(close);

    createForm.appendChild(modalFooter);

    // Handle form submission
    createForm.addEventListener('submit', function (event) {
        event.preventDefault();
        createRecord();
    });

    // Function to create a new record
    function createRecord() {
        var formData = {};
        var inputs = createForm.querySelectorAll('input, select');
        inputs.forEach(input => {

                formData[input.name] = input.value;
          
        });

        var createUrl = '<?php    echo str_replace('obtener', 'crear', $apiUrl); ?>';
        fetch(createUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
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
                icon: "error",
                title: data.mensaje,
                showConfirmButton: false,
                timer: 1500 
                }); // Display the error message from the API response
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                position: "center",
                icon: "error",
                title: error,
                showConfirmButton: false,
                timer: 1500 
                });
            });

        // Close the modal
        $('#createModal').modal('hide');
    }
    </script>
    <?php
}
else{
    ?>

    <script>
        const messageError = `{{substr($messageError,0,strlen($messageError))}}`;
        Swal.fire({
                position: "center",
                icon: "error",
                title: messageError,
                showConfirmButton: false,
                timer: 3500 
                });
        
    </script>
    <?php
}   