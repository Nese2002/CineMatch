<?php
session_start();
$user_id = $_SESSION['user_id'];

// Create connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cinedata";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT movie_id FROM watchlist WHERE user_id = $user_id UNION SELECT movie_id FROM trash WHERE user_id = $user_id";
$result = $conn->query($sql);

$movie_ids = array();
// return the movie ids as a comma separated string
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $movie_ids[] = $row["movie_id"];
  }
  echo implode(",", $movie_ids);
} else {
  echo "noResults";
}
$conn->close();
?>