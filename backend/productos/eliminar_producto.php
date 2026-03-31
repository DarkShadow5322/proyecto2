<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

header("Content-Type: application/json");

include __DIR__ . "/../conexion.php";

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo json_encode(["mensaje" => "No se recibieron datos"]);
    exit;
}

$id = $data->id;

if (!$id) {
    echo json_encode(["mensaje" => "ID inválido"]);
    exit;
}

$sql = "DELETE FROM productos WHERE id = $id";

if ($conexion->query($sql)) {
    echo json_encode(["mensaje" => "Producto eliminado"]);
} else {
    echo json_encode(["mensaje" => "Error: " . $conexion->error]);
}
?>