<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Configuración local XAMPP (para InfinityFree reemplazar con los datos de su hosting)
$servidor   = "localhost";
$usuario    = "root";
$password   = "";
$base_datos = "bd_danilo_benites";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre  = trim($_POST['name'] ?? '');
    $correo  = trim($_POST['email'] ?? '');
    $asunto  = trim($_POST['subject'] ?? '');
    $mensaje = trim($_POST['message'] ?? '');

    if (empty($nombre) || empty($correo) || empty($asunto) || empty($mensaje)) {
        echo "<script>alert('Todos los campos son obligatorios.'); window.history.back();</script>";
        exit;
    }

    try {
        $conn = new mysqli($servidor, $usuario, $password, $base_datos);
        $conn->set_charset("utf8mb4");

        $stmt = $conn->prepare("INSERT INTO portafolio (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $nombre, $correo, $asunto, $mensaje);
        $stmt->execute();

        $stmt->close();
        $conn->close();

        echo "<script>
                alert('¡Mensaje guardado en la base de datos con éxito!');
                window.location.href = 'index.html#contactos';
              </script>";
    } catch (Exception $e) {
        $error_msg = addslashes($e->getMessage());
        echo "<script>
                alert('Error en MySQL: " . $error_msg . "');
                window.history.back();
              </script>";
    }
} else {
    header("Location: index.html");
    exit;
}
?>