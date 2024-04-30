<?php
// Connessione al database
$servername = "localhost";
$username = "root"; // Inserisci il tuo username del database
$password = ""; // Inserisci la tua password del database
$dbname = "cinedata"; // Nome del tuo database

// Crea la connessione
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la connessione
if ($conn->connect_error) {
  die("Connessione al database fallita: " . $conn->connect_error);
}

// Recupera i dati dal form di signup
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST['username'];
  $password = $_POST['password'];
  
  // Verifica se l'username è già presente nel database
  $check_query = "SELECT * FROM utenti WHERE username='$username'";
  $check_result = $conn->query($check_query);
  if ($check_result->num_rows > 0) {
    // Username già utilizzato, mostra un messaggio di errore
    echo "L'username inserito è già in uso. Si prega di sceglierne un altro.";
  } else {
    // L'username non è stato trovato nel database, procedi con l'inserimento dei dati
    // Codifica la password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Query per inserire i dati nel database
    $insert_query = "INSERT INTO utenti (username, password) VALUES ('$username', '$hashed_password')";

    if ($conn->query($insert_query) === TRUE) {
      // Dati inseriti nel database con successo
      echo "Registrazione avvenuta con successo!";
    } else {
      // Errore durante l'inserimento dei dati nel database
      echo "Errore durante la registrazione: " . $conn->error;
    }
  }
}

// Chiudi la connessione al database
$conn->close();
?>
