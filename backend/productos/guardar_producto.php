<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include "../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "No se recibieron datos"]);
    exit;
}

$nombre = $data["nombre"];
$precio = $data["precio"];
$categoria_id = $data["categoria_id"] ?? "";
$codigo = $data["codigo"];

$sql = "INSERT INTO productos (nombre, precio, categoria_id, codigo)
        VALUES ('$nombre', '$precio', '$categoria_id', '$codigo')";

if ($conexion->query($sql)) {

    $producto_id = $conexion->insert_id;

    $sqlInventario = "INSERT INTO inventario (producto_id, stock)
                      VALUES ($producto_id, 0)";

    $conexion->query($sqlInventario);

    echo json_encode(["mensaje" => "Producto creado con exito"]);

} else {
    echo json_encode(["mensaje" => "Error al guardar producto"]);
}
?>

