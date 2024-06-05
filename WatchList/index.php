<?php
  session_start(); 
  if(!isset($_SESSION['user_id'])) { 
    header("Location: ../Login/index.html"); 
    exit();
  }
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <script src="index.js"></script>
    <script
      src="https://kit.fontawesome.com/7b5b8543ec.js"
      crossorigin="anonymous"></script>
    <title>CineMatch</title>
  </head>
  <body>
    <nav>
      <ul class="navbar">
        <li>
          <a href="../Quiz/index.php">Quiz</a>
          <div class="underline inactive"></div>
        </li>

        <li>
          <a class="" href="">Watchlist</a>
          <div class="underline"></div>
        </li>
      </ul>
    </nav>
    <div class="hero" id="zonaDinamica">
   
    </div>
  </body>
</html>
