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
  $check_query = "SELECT * FROM utenti WHERE username='$username'";
  $check_result = $conn->query($check_query);
  if ($check_result->num_rows == 0) {

    // Hash the password
    if($password != "" && strlen($password) >= 6) {
      $hashed_password = password_hash($password, PASSWORD_DEFAULT);
      
      // Insert the user into the database
      $insert_query = "INSERT INTO utenti (username, password) VALUES ('$username', '$hashed_password')";
      
      if ($conn->query($insert_query) === TRUE) {
        $user_id = $conn->insert_id;

        $_SESSION['user_id'] = $user_id;
        echo "success";
      } 
    } else {
      // Not a valid password
      echo 'password-error';
    }

  
} else {
  // User already exists
  echo 'username-error';
}
}

$conn->close();
