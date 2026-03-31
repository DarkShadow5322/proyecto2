<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

header("Content-Type: application/json");

include __DIR__ . "/../conexion.php";

$data = json_decode(file_get_contents("php://input"));

// 🔥 VALIDACIÓN CLAVE
if (!$data) {
    echo json_encode(["mensaje" => "No se recibieron datos"]);
    exit;
}

$id = $data->id;
$codigo = $data->codigo;
$nombre = $data->nombre;
$precio = $data->precio;
$categoria_id = $data->categoria_id;

if (!$id || !$codigo || !$nombre || !$precio) {
    echo json_encode(["mensaje" => "Datos incompletos"]);
    exit;
}

$sql = "UPDATE productos 
        SET codigo='$codigo', nombre='$nombre', precio='$precio', categoria_id='$categoria_id'
        WHERE id=$id";

if ($conexion->query($sql)) {
    echo json_encode(["mensaje" => "Producto actualizado"]);
} else {
    echo json_encode(["mensaje" => "Error: " . $conexion->error]);
}
?>