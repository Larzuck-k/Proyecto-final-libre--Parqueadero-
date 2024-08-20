<?php
// URL de la API
$apiUrl = 'http://localhost:3000/cliente/obtener'; // Reemplaza con la URL de tu API
$updateUrl = 'http://localhost:3000/cliente/editar'; // Reemplaza con la URL de tu API para actualizar

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
                ? "<form action='$updateUrl' method='PUT' style='display:inline;'>
                      <input type='hidden' name='id' value='$id'>
                      <input type='hidden' name='status' value='0'>
                      <button type='submit' class='btn btn-danger'>Desactivar</button>
                  </form>"
                : "<form action='$updateUrl' method='PUT' style='display:inline;'>
                      <input type='hidden' name='id' value='$id'>
                      <input type='hidden' name='status' value='1'>
                      <button type='submit' class='btn btn-success'>Activar</button>
                  </form>";

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

<?php
// Este código PHP debe estar en un archivo separado que maneje la actualización del estado
// Se debe incluir el siguiente código para manejar la solicitud POST

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $status = $_POST['status'];

    // Validar los datos recibidos
    if (empty($id) || !in_array($status, [0, 1])) {
        die('Datos inválidos');
    }

    // Preparar los datos para la solicitud PUT
    $updateData = [
        'id' => $id,
        'status' => $status
    ];

    // Hacer la solicitud PUT a la API
    $ch = curl_init($updateUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($updateData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json',
    ]);
    $response = curl_exec($ch);
    curl_close($ch);

    // Verificar la respuesta
    $responseData = json_decode($response, true);
    if (isset($responseData['success']) && $responseData['success']) {
        header('Location: ' . $_SERVER['PHP_SELF']); // Redirigir para actualizar la tabla
        exit;
    } else {
        die('Error al actualizar el estado');
    }
}
?>
