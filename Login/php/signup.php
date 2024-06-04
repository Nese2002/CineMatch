<?php
session_start();
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

// Recupera i dati dal form di signup
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST['username'];
  $password = $_POST['password'];
  
  // Verifica se l'username è già presente nel database
  $check_query = "SELECT * FROM utenti WHERE username='$username'";
  $check_result = $conn->query($check_query);
  if ($check_result->num_rows == 0) {
    // L'username non è stato trovato nel database, procedi con l'inserimento dei dati
    // Codifica la password
    if($password != "" && strlen($password) >= 6) {
      $hashed_password = password_hash($password, PASSWORD_DEFAULT);
      
      // Query per inserire i dati nel database
      $insert_query = "INSERT INTO utenti (username, password) VALUES ('$username', '$hashed_password')";
      
      if ($conn->query($insert_query) === TRUE) {
        $user_id = $conn->insert_id;

        // Memorizza l'ID dell'utente nella sessione
        $_SESSION['user_id'] = $user_id;
        // Dati inseriti nel database con successo
        echo "success";

      
      } 

      

    } else {
      // Password non valida, mostra un messaggio di errore
      echo 'password-error';
    }

  
} else {
    // Username già utilizzato, mostra un messaggio di errore
    echo 'username-error';
}
}

// Chiudi la connessione al database
$conn->close();
