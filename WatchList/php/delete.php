<?php
session_start();
$user_id = $_SESSION['user_id'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cinedata";

// Crea connessione
$conn = new mysqli($servername, $username, $password, $dbname);

// Controlla connessione
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
// Get the movie title from the request
$movieTitle = $_POST['titolo'];

$sql = "DELETE FROM watchlist WHERE user_id = $user_id AND titolo = '$movieTitle'";
$result = $conn->query($sql);


echo "Movie deleted successfully";
?>