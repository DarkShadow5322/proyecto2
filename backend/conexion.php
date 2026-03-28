<?php
$host = "localhost";
$usuario = "root";
$password = "";
$bd = "sis_inventario";

// Crear conexión
$conexion = new mysqli($host, $usuario, $password, $bd);

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Opcional: establecer codificación UTF-8
$conexion->set_charset("utf8");
?>