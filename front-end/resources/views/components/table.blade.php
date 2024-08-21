<?php
// URL de la API
$apiUrl = 'http://localhost:3100/contratista/obtener'; // Reemplaza con la URL de tu API
$updateUrl = 'http://localhost:3100/contratista/estado'; // Reemplaza con la URL de tu API para actualizar

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
    die('Error al decodificar el JSON');
}

// Verificar que los datos no están vacíos
if (empty($data)) {
    die('No se encontraron datos');
}

// Obtener las claves del primer elemento para usar como encabezados de columna
$headers = array_keys($data[0]);

// Añadir una columna de acciones
$headers[] = 'Acciones';

// Generar la tabla HTML
echo '<table border="1" class="table table-striped" cellpadding="5" cellspacing="0">';
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
            echo "<td>" . htmlspecialchars($row[$header]) . "</td>";
        }
    }
    echo '</tr>';
}
echo '</tbody>';
echo '</table>';


echo '<div class="modal"    id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">';
echo '<div class="modal-dialog" role="document">';
echo '<div class="modal-content">';
echo '<div class="modal-header">';
echo '<h5 class="modal-title" id="editModalLabel">Editar registro</h5>';

echo '</div>';
echo '<div class="modal-body">';
echo '<form id="editForm">';
echo '</form>';
echo '</div>';
echo '<div class="modal-footer">';
echo '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>';
echo '<button type="button" class="btn btn-primary" onclick="editRecord()">Guardar cambios</button>';
echo '</div>';
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
        if (row === null) {
            alert(`No se encontró la fila con id ${id}`);
            return;
        }

        var columns = row.children;
        var formData = {};
   
        // Crear los campos de edición dinámicamente
        var editForm = document.getElementById('editForm');
        editForm.innerHTML = '';
        var headers = <?php echo json_encode($headers); ?>;
        for (var i = 0; i < headers.length - 1; i++) {
            var title = document.createElement("span")
            var columnName = headers[i];
            var input = document.createElement('input');
            input.type = 'text';
            input.className = "form-control";
        
            input.name = columnName;
            var value = row.children[i].textContent;
    

           if(   value.match(/^\d+$/)){
            input.value = row.children[i].textContent
            input.type = 'number';
           }
           
           if(   value.match(/^[a-zA-Z]+$/)){
            input.value = row.children[i].textContent
            input.type = 'text';
           }
           
           if(  value.includes("@")){
            input.value = row.children[i].textContent
            input.type = 'email';
           }

            
           if(  value.includes("T") && value.includes(":") && value.includes("Z")){
            input.value = row.children[i].textContent
            input.type = 'datetime';
           }

           title.innerText = columnName;


           editForm.appendChild(title);
            editForm.appendChild(input);
            editForm.appendChild(document.createElement('br'));
        }

        // Mostrar el modal
        $('#editModal').modal('show');
    }

    function editRecord() {
        var id = document.querySelector(`tr[data-id="${id}"]`).dataset.id;
        var formData = {};
        var editForm = document.getElementById('editForm');
        var inputs = editForm.children;
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            formData[input.name] = input.value;
        }

        var updateUrl = '<?php echo $updateUrl; ?>';
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
</script>