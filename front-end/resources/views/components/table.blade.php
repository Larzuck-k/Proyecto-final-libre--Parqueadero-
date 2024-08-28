<?php
// URL de la API
$apiUrl = $_GET["api_url"]; // Reemplaza con la URL de tu API
$title = $_GET["title"]; // Reemplaza con la URL de tu API

$updateUrl = str_replace("obtener", "estado", $apiUrl); // Reemplaza con la URL de tu API para actualizar


// Obtener los datos de la API
$response = file_get_contents($apiUrl);

// Verificar si la respuesta es válida
if ($response === FALSE) {
    die('Error al obtener los datos de la API');
}

// Decodificar el JSON
$data = json_decode($response, true);

// Verificar si la decodificación fue exitosa
if ($data === NULL) {
    echo ('Error al decodificar el JSON');
}

// Verificar que los datos no están vacíos
if (empty($data)) {
    echo ('No se encontraron datos');
} else {
    // Obtener las claves del primer elemento para usar como encabezados de columna
    $headers = array_keys($data[0]);





    // Añadir una columna de acciones
    $headers[] = 'Acciones';
    echo '<p></p>';
    echo '<span class="display-3 fw-bold">' . $title . '</span>';
    echo '<p></p>';

    // Generar la tabla HTML
    echo '<table border="1" class=" table-responsive table table-striped " cellpadding="5" cellspacing="0">';
    echo '<thead>';
    echo '<tr>';
    foreach ($headers as $header) {
        echo "<th>" . htmlspecialchars($header) . "</th>";
    }
    echo '</tr>';
    echo '</thead>';
    echo '<tbody>';
    foreach ($data as $row) {

        echo '<tr data-id="' . htmlspecialchars($row['ID']) . '">';
        foreach ($headers as $header) {
            if ($header === 'Acciones') {
                // Añadir formularios de activar/desactivar y editar en la columna de acciones
                $id = htmlspecialchars($row['ID']); // Asumiendo que tienes un campo 'id' para identificar cada registro
                $status = htmlspecialchars($row['Estado']); // Asumiendo que tienes un campo 'status' para el estado del registro

                $actionForm = $status == 1
                    ? "<button class='btn btn-danger' onclick='updateStatus($id, 0)'>Desactivar</button>"
                    : "<button class='btn btn-success' onclick='updateStatus($id, 1)'>Activar</button>";

                $editButton = "<button class='btn btn-primary' onclick='showEditModal($id)'>Editar</button>";

                echo "<td>$actionForm $editButton</td>";
            } else {

                if ($header === 'Contraseña') {
                    echo "<td>*****</td>";
                } else {
                    echo "<td>" . htmlspecialchars($row[$header]) . "</td>";
                }
            }
        }
        echo '</tr>';
    }
    echo '</tbody>';
    echo '</table>';


    echo '<div class="modal text-white"    id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">';
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


?>

    <script>
        function updateStatus(id, status) {
            var updateUrl = '<?php echo $updateUrl; ?>';
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
                    alert('Error al actualizar el estado');
                });
        }


        function showEditModal(id) {
            var row = document.querySelector(`tr[data-id="${id}"]`);
            document.getElementById("editthis").value = id
            if (row === null) {
                alert(`No se encontró la fila con id ${id}`);
                return;
            }

            var columns = row.children;
            var formData = {};

            // Crear los campos de edición dinámicamente
            var editForm = document.getElementById('editForm');
            editForm.addEventListener('submit', function(event) {
                event.preventDefault();
                editRecord();
            });
            editForm.innerHTML = '';
            var headers = <?php echo json_encode($headers); ?>;
            for (var i = 0; i < headers.length - 1; i++) {
                var title = document.createElement("span")
                title.setAttribute("class","text-start")
                var columnName = headers[i];
                var input = document.createElement('input');
                input.type = 'text';
                input.className = "form-control rounded-3 ";
                input.setAttribute("required", "");

                if (columnName == "ID") {
                    input.setAttribute("disabled", "")

                }
                if (columnName == "Contraseña") {
                    input.removeAttribute("required")
                    input.name = columnName;
                    var value = "";
                } else {
                    input.name = columnName;
                    var value = row.children[i].textContent;
                }

                if (value.match(/^\d+$/)) {
                    input.value = row.children[i].textContent
                    input.type = 'number';
                }

                if (value.match(/^[a-zA-Z]+$/)) {
                    input.value = row.children[i].textContent
                    input.type = 'text';
                }

                if (value.includes("@")) {
                    input.value = row.children[i].textContent
                    input.type = 'email';
                    input.pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                }


                if (value.includes("T") && value.includes(":") && value.includes("Z")) {
                    var date = new Date(value);
                    var formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}T${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
                    input.value = formattedDate;
                    input.type = 'datetime-local';
                }

                title.innerText = columnName;


                editForm.appendChild(title);
                editForm.appendChild(input);
                editForm.appendChild(document.createElement('br'));
            }

            var modalFooter = document.createElement("div");
            modalFooter.setAttribute("class", "modal-footer");

            var submit = document.createElement("button");
            submit.setAttribute("class", "btn btn-primary");
            submit.setAttribute("type", "submit");
            submit.innerText = "Guardar cambios";
            modalFooter.appendChild(submit);

            var close = document.createElement("a");
            close.setAttribute("class", "btn btn-secondary ");
            close.setAttribute("data-bs-dismiss", "modal");
            close.innerText = "Cerrar";
            modalFooter.appendChild(close);

            editForm.appendChild(modalFooter);

            editForm.addEventListener('submit', function(event) {
                event.preventDefault();
                editRecord();
            });

            editForm.appendChild(modalFooter);
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
                if (input.name !== "Contraseña" || input.value !== "") {
                    formData[input.name] = input.value;
                }
            }

            var updateUrl = '<?php echo str_replace("estado", "editar", $updateUrl); ?>';

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
                        location.reload();
                    } else {
                        alert(data.mensaje); // Display the error message from the API response
                    }
                })
                .catch(error => {
                    alert('Error al editar el registro');
                });

            // Ocultar el modal
            $('#editModal').modal('hide');
        }

        function padZero(value) {
            return (value < 10 ? '0' : '') + value;
        }


        var table = document.querySelector('table');

// Find the column index of the "Estado" column
var columnIndex = -1;
Array.from(table.rows[0].cells).forEach(function(cell, index) {
  if (cell.textContent.trim() === 'Estado') {
    columnIndex = index;
  }
});

// Hide the column
if (columnIndex !== -1) {
  table.querySelectorAll('tr').forEach(function(row) {
    row.cells[columnIndex].style.display = 'none';
  });
}
    </script>
<?php
}
?>