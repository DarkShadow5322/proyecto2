<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

header("Content-Type: application/json");

include "../conexion.php";

$data = json_decode(file_get_contents("php://input"));

$nombre = $data->nombre;

$sql = "INSERT INTO categorias (nombre) VALUES ('$nombre')";

if ($conexion->query($sql)) {
    echo json_encode(["mensaje" => "Categoría guardada"]);
} else {
    echo json_encode(["mensaje" => "Error"]);
}
?>