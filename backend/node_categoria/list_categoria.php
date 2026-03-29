<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../db.php");

$stmt = $conn->prepare("SELECT * FROM categoria");
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
?>