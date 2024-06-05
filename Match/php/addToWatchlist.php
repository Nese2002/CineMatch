<?php
session_start();

// Connect to the database
$servername = "localhost";
$username_db = "root"; 
$password_db = ""; 
$dbname = "cinedata"; 
$conn = new mysqli($servername, $username_db, $password_db, $dbname);

// Get the data from the request
$data = json_decode(file_get_contents('php://input'), true);



// Check connection
if ($conn->connect_error) {
  echo "error" .$conn->connect_error;
  die("Connection failed: " . $conn->connect_error);
}

if ($data['direction'] == "left") {
  // Prepare and bind
  $insert_query = "INSERT INTO watchlist (user_id, movie_id, titolo, trama, copertina) VALUES (?, ?, ?, ?, ?)";
  $stmt = $conn->prepare($insert_query);
  $stmt->bind_param("iisss", $_SESSION['user_id'],$data['movieId'], $data['h1Text'],$data['pText'], $data['imgSrc']);

  $stmt->execute();
}else{
  $insert_query = "INSERT INTO trash (user_id, movie_id) VALUES (?, ?)";
  $stmt = $conn->prepare($insert_query);
  $stmt->bind_param("ii", $_SESSION['user_id'],$data['movieId']);

  $stmt->execute();
}
echo "success";

$stmt->close();
$conn->close();
?>