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
      // Password corretta, login effettuato con successo
      // Reindirizzamento alla pagina quiz.html
      header("Location: ../../Quiz/index.html");
      exit(); // Assicura che il codice successivo non venga eseguito dopo il reindirizzamento
    } else {
      // Password non corretta
      $error_message = "Password non valida";
    }
  } else {
    // Utente non trovato nel database
    $error_message = "Nome utente non trovato";
  }
}

// Chiudi la connessione al database
$conn->close();
?>

<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
</head>
<body>
  <h2>Login</h2>
  <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
    <label for="username">Username:</label><br>
    <input type="text" id="username" name="username"><br>
    <label for="password">Password:</label><br>
    <input type="password" id="password" name="password"><br><br>
    <input type="submit" value="Login">
  </form>
  <?php 
  // Mostra il messaggio di errore se presente
  if (!empty($error_message)) {
    echo "<p style='color: red;'>$error_message</p>";
  }
  ?>
</body>
</html>
