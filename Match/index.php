<?php
  session_start(); // inizia la sessione
  if(!isset($_SESSION['user_id'])) { // se la sessione non è stata inizializzata
    header("Location: ../Login/index.html"); // reindirizza l'utente alla pagina di login
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
    <script src="../api_request/getMovieDetails.js"></script>
    <script
      src="https://kit.fontawesome.com/7b5b8543ec.js"
      crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Rokkitt:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet" />
    <title>CineMatch</title>
  </head>
  <body>
    <nav>
      <a  class="back-to-quiz" href="../Quiz/index.php">
        <i class="fa-solid fa-arrow-left"></i>
      </a>
      <ul class="navbar">
        <li>
          <a href="../Quiz/index.php">Quiz</a>
          <div class="underline"></div>
        </li>

        <li>
          <a class="" href="../WatchList/index.php">Watchlist</a>
          <div class="underline inactive"></div>
        </li>
      </ul>
    </nav>
    <div class="hero-container">
      <div class="load loading">
        <div class="loader"></div>
      </div>
      <div class="no-movies">
        <h1>Non ci sono Altri film con questi filtri</h1>
        <h3>Cambia i filtri e cerca altri film!</h3>
        <a href="../Quiz/index.php">
          <button class="to-quiz">Torna al quiz</button>
        </a>
      </div>
      <div class="hero-load hero-loading">
        <div class="pc_submit">
          <div class="submit-button">
            <div class="submit-relative">
              <button type="submit" class="submit" name="love">
                <i class="fa-regular fa-heart icon"></i>
              </button>
              <div class="shadow-1"></div>
              <div class="shadow-2"></div>
            </div>
          </div>
        </div>
        <div class="card-container" id="zonaFilm">
          <div class="card-status">
            <i class="fa-regular fa-heart icon"></i>
            <i class="fa-solid fa-x icon"></i>
          </div>
        </div>

        <div class="pc_submit">
          <div class="submit-button">
            <div class="submit-relative">
              <button type="submit" class="submit" name="trash">
                <i class="fa-solid fa-x icon"></i>
              </button>
              <div class="shadow-1"></div>
              <div class="shadow-2"></div>
            </div>
          </div>
        </div>
        <div class="mobile_submit">
          <div class="submit-button">
            <div class="submit-relative">
              <button type="submit" class="submit" name="love">
                <i class="fa-regular fa-heart icon"></i>
              </button>
              <div class="shadow-1"></div>
              <div class="shadow-2"></div>
            </div>
          </div>
          <div class="submit-button">
            <div class="submit-relative-trash">
              <button type="submit" class="submit" name="trash">
                <i class="fa-solid fa-x icon"></i>
              </button>
              <div class="shadow-1"></div>
              <div class="shadow-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
