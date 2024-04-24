<?php
// Connessione al database
$conn = new mysqli("localhost", "root", "", "cinedata");

// Verifica della connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Ricezione dei dati dal form di registrazione
$username = $_POST['username'];
$password = $_POST['password'];

// Codifica della password (opzionale, ma consigliato per motivi di sicurezza)
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Query per inserire i dati nel database
$sql = "INSERT INTO utenti (username, password) VALUES ('$username', '$hashed_password')";

if ($conn->query($sql) === TRUE) {
    echo "Registrazione avvenuta con successo!";
} else {
    echo "Errore durante la registrazione: " . $conn->error;
}

$conn->close();
?>
