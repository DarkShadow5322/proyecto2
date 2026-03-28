<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 👇 MUY IMPORTANTE (manejar preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include "conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "No se recibieron datos"]);
    exit;
}

$nombre = $data["nombre"];
$precio = $data["precio"];
$categoria = $data["categoria"] ?? "";
$codigo = $data["codigo"];

$sql = "INSERT INTO productos (nombre, precio, categoria, codigo)
        VALUES ('$nombre', '$precio', '$categoria', '$codigo')";

if ($conexion->query($sql)) {
    echo json_encode(["mensaje" => "Producto guardado"]);
} else {
    echo json_encode(["error" => "Error al guardar"]);
}
?>