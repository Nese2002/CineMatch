<?php
session_start();
// Connect to the database
$servername = "localhost";
$username_db = "root"; 
$password_db = "";
$dbname = "cinedata"; 
$conn = new mysqli($servername, $username_db, $password_db, $dbname);


// Check connection
if ($conn->connect_error) {
  die("Connessione al database fallita: " . $conn->connect_error);
}

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST['username'];
  $password = $_POST['password'];

  // Check if the user exists in the database
  $sql = "SELECT id, password FROM utenti WHERE username='$username'";
  $result = $conn->query($sql);
  
  if ($result->num_rows > 0) {
    // Verify the password entered by the user
    $row = $result->fetch_assoc();
    $hashed_password = $row["password"];
    if (password_verify($password, $hashed_password)) {
      $_SESSION['user_id'] = $row["id"];
      echo "success";
    } else {
      // Incorrect password
      echo 'password-error';
    }
  } else {
    // User not found in the database
    echo "username-error";
  }
}

$conn->close();

