<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../conexion.php";

$sql = "SELECT productos.*, categorias.nombre AS categoria_nombre
        FROM productos
        LEFT JOIN categorias
        ON productos.categoria_id = categorias.id";
$resultado = $conexion->query($sql);

$productos = [];

while ($fila = $resultado->fetch_assoc()) {
    $productos[] = $fila;
}

echo json_encode($productos);
?>