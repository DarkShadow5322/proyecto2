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

$producto_id = $data->producto_id;
$cantidad = $data->cantidad;

$sqlStock = "SELECT stock FROM inventario WHERE producto_id = $producto_id";
$result = $conexion->query($sqlStock);
$fila = $result->fetch_assoc();

$stock_actual = $fila['stock'];


if ($stock_actual + $cantidad < 0) {
    echo json_encode(["mensaje" => "Stock insuficiente"]);
    exit;
}

$sql = "UPDATE inventario 
        SET stock = stock + ($cantidad)
        WHERE producto_id = $producto_id";

if ($conexion->query($sql)) {
    echo json_encode(["mensaje" => "Stock actualizado"]);
} else {
    echo json_encode(["mensaje" => "Error"]);
}
?>