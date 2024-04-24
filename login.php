<?php
session_start();

// Connessione al database
$conn = new mysqli("localhost", "root", "", "cinedata");

// Verifica della connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Ricezione dei dati dal form di accesso
$username = $_POST['username'];
$password = $_POST['password'];

// Query per ottenere la password corrispondente all'username fornito
$sql = "SELECT * FROM utenti WHERE username='$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // Verifica se la password fornita corrisponde alla password nel database
    if (password_verify($password, $row['password'])) {
        $_SESSION['username'] = $username;
        echo "Accesso effettuato con successo!";
    } else {
        echo "Password errata!";
    }
} else {
    echo "Utente non trovato!";
}

$conn->close();
?>
