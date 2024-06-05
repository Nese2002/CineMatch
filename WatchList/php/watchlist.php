<?php
//Create connection
session_start();
$user_id = $_SESSION['user_id'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cinedata";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT titolo, trama, copertina FROM watchlist  WHERE user_id = $user_id";
$result = $conn->query($sql);

$data = array();

// output data of each row
while($row = $result->fetch_assoc()) {
  $data[] = $row;
}
$conn->close();

echo json_encode($data);
?>