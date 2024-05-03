<?php
// Connessione al database
$servername = "localhost";
$username_db = "root"; // Inserisci il tuo username del database
$password_db = ""; // Inserisci la tua password del database
$dbname = "cinedata"; // Nome del tuo database

// Variabile per memorizzare il messaggio di errore
$error_message = "";

// Crea la connessione
$conn = new mysqli($servername, $username_db, $password_db, $dbname);

// Verifica la connessione
if ($conn->connect_error) {
  die("Connessione al database fallita: " . $conn->connect_error);
}

// Recupera i dati dal form di login
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST['username'];
  $password = $_POST['password'];

  // Query per recuperare la password hash dal database
  $sql = "SELECT password FROM utenti WHERE username='$username'";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    // Utente trovato nel database, verifica la password
    $row = $result->fetch_assoc();
    $hashed_password = $row["password"];
    if (password_verify($password, $hashed_password)) {
      echo "success";
    } else {
      // Password non corretta
      echo 'password-error';
    }
  } else {
    // Utente non trovato nel database
    echo "username-error";
  }
}

// Chiudi la connessione al database
$conn->close();

