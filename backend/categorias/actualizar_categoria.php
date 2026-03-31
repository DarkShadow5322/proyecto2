<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

header("Content-Type: application/json");

include "../conexion.php";

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$nombre = $data->nombre;

$sql = "UPDATE categorias SET nombre='$nombre' WHERE id=$id";

if ($conexion->query($sql)) {
    echo json_encode(["mensaje" => "Categoría actualizada"]);
} else {
    echo json_encode(["mensaje" => "Error"]);
}
?>