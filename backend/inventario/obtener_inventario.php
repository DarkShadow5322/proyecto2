<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include __DIR__ . "/../conexion.php";

$sql = "SELECT productos.id, productos.nombre, inventario.stock
        FROM productos
        LEFT JOIN inventario ON productos.id = inventario.producto_id";

$resultado = $conexion->query($sql);

$data = [];

while ($fila = $resultado->fetch_assoc()) {
    $data[] = $fila;
}

echo json_encode($data);
?>