<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../conexion.php";

$sql = "SELECT * FROM categorias";
$resultado = $conexion->query($sql);

$categorias = [];

while ($fila = $resultado->fetch_assoc()) {
    $categorias[] = $fila;
}

echo json_encode($categorias);
?>
