<?php
session_start();
$user_id = $_SESSION['user_id'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cinedata";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT movie_id FROM watchlist WHERE user_id = $user_id UNION SELECT movie_id FROM trash WHERE user_id = $user_id";
$result = $conn->query($sql);

$movie_ids = array();
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $movie_ids[] = $row["movie_id"];
  }
  echo implode(",", $movie_ids);
} else {
  echo "0 results";
}
$conn->close();
?>