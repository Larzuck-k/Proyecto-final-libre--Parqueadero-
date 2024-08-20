<?php
// URL de la API
$apiUrl = 'http://localhost:3100/usuario/obtener'; // Reemplaza con la URL de tu API
$updateUrl = 'http://localhost:3100/usuario/estado'; // Reemplaza con la URL de tu API para actualizar

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
    echo '<tr>';
    foreach ($headers as $header) {
        if ($header === 'Acciones') {
            // Añadir formularios de activar/desactivar en la columna de acciones
            $id = htmlspecialchars($row['ID']); // Asumiendo que tienes un campo 'id' para identificar cada registro
            $status = htmlspecialchars($row['Estado']); // Asumiendo que tienes un campo 'status' para el estado del registro

            $actionForm = $status == 1
                ? "<button class='btn btn-danger' onclick='updateStatus($id, 0)'>Desactivar</button>"
                : "<button class='btn btn-success' onclick='updateStatus($id, 1)'>Activar</button>";

            echo "<td>$actionForm</td>";
        } else {
            echo "<td>" . htmlspecialchars($row[$header]) . "</td>";
        }
    }
    echo '</tr>';
}
echo '</tbody>';
echo '</table>';
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
</script>