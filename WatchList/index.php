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
   
      <!-- <div class="movie-element">
        <div class="line"></div>
        <div class="movie-details">
          <div class="text">
            <div class="titolo">

              <h1>Parasite</h1>
              <button class="check-button">
                <i class="fa-regular fa-circle-check"></i>
              </button>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              eros lorem, congue a libero sed, bibendum pellentesque elit. Sed
              pretium eros non mauris placerat cursus. Nulla non risus id lectus
              interdum mattis. Vestibulum euismod, dolor ut aliquet faucibus,
              ipsum ante efficitur nunc, ac ullamcorper justo lectus eu ipsum.
              Fusce rutrum nisi vitae enim blandit, id egestas enim dignissim.
              Phasellus nisl dui, mollis sed venenatis quis, aliquet a est.
              Vestibulum commodo purus vitae sapien scelerisque pulvinar.
              Phasellus faucibus felis eget nisi lacinia aliquam. Curabitur
              aliquam cursus leo congue mattis. Curabitur id posuere ex. Proin
              vestibulum nisl ac leo gravida euismod.
            </p>
          </div>
          <img
            src="https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
            alt="cover"
            class="cover" />
        </div>
        <div class="line"></div>
      </div> -->
    </div>
  </body>
</html>