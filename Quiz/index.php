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
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script src="https://unpkg.com/topojson@3"></script>
    <script src="../api_request/apiRequest.js"></script>
    <script src="./js/index.js"></script>
    <script src="./js/"></script>
    <script src="./js/map.js"></script>
    <script
      src="https://kit.fontawesome.com/7b5b8543ec.js"
      crossorigin="anonymous"></script>
    <title>CineMatch</title>
  </head>
  <body>
    <nav>
      <ul class="navbar">
        <li>
          <a href="/">Quiz</a>
          <div class="underline"></div>
        </li>

        <li>
          <a class="" href="../WatchList/index.php">Watchlist</a>
          <div class="underline inactive"></div>
        </li>
      </ul>
    </nav>
    <section id="sectionFilter">
      <div class="center">
        <div class="">
          <h2>Scegli i filtri per questa sera</h2>
          <div class="underline"></div>
        </div>

        <form
          action=""
          method="post"
          name="filters"
          autocomplete="off"
          id="filters">
          <div class="checkbox-grid">
            <label class="checkbox-container">
              <input type="checkbox" id="Genere" />
              <span class="checkbox-text">Genere</span>
            </label>

            <label class="checkbox-container">
              <input type="checkbox" id="Anno" />
              <span class="checkbox-text">Anno</span>
            </label>
            <label class="checkbox-container">
              <input type="checkbox" id="Paese" />
              <span class="checkbox-text">Paese di produzione</span>
            </label>
            <label class="checkbox-container">
              <input type="checkbox" id="Cast" />
              <span class="checkbox-text">Cast</span>
            </label>
            <label class="checkbox-container">
              <input type="checkbox" id="Durata" />
              <span class="checkbox-text">Durata</span>
            </label>
            <label class="checkbox-container">
              <input type="checkbox" id="Provider" />
              <span class="checkbox-text">Dove vederlo</span>
            </label>
          </div>
          <div class="submit-button">
            <div class="submit-relative">
              <button type="submit" class="submit" id="submitFilters">
                <i class="fa-solid fa-check"></i>
              </button>
              <div class="shadow-1"></div>
              <div class="shadow-2"></div>
            </div>
          </div>
        </form>
      </div>
    </section>

    <!-- GENERE -->

    <section class="hidden-section" id="sectionGenere">
      <div class="center">
        <div class="">
          <h2>Che genere di film vuoi vedere?</h2>
          <div class="underline"></div>
        </div>
        <div class="search-bar">
          <i class="fa-solid fa-search"></i>
          <input
            autocomplete="off"
            type="text"
            name="search"
            id="search"
            placeholder="Cerca un genere" />
        </div>
        <form
          action=""
          method="post"
          name="genere"
          autocomplete="off"
          class=""
          id="genere">
          <div id="zonaGenere" class="gridGenere"></div>
          <div class="submit-button">
            <div class="submit-relative">
              <button
                type="submit"
                disabled="true"
                class="submit checkbox"
                id="submitGenere">
                <i class="fa-solid fa-check"></i>
              </button>
              <div class="shadow-1"></div>
              <div class="shadow-2"></div>
            </div>
          </div>
        </form>
      </div>
    </section>

    <!-- ANNO -->

    <section class="hidden-section" id="sectionAnno">
      <div class="center">
        <div class="">
          <h2>Quando è stato prodotto il film?</h2>
          <div class="underline"></div>
        </div>
        <form
          action=""
          method="post"
          name="anno"
          autocomplete="off"
          id="anno"
          class="annoForm">
          <div class="annoGrid">
            <input
              type="number"
              min="1950"
              max="2024"
              value="1950"
              id="minNumberInput" />
            <input
              type="number"
              min="1950"
              max="2024"
              value="2024"
              id="maxNumberInput" />
          </div>
          <div class="submit-button">
            <div class="submit-relative">
              <button type="submit" class="submit" id="submitAnno">
                <i class="fa-solid fa-check"></i>
              </button>
              <div class="shadow-1"></div>
              <div class="shadow-2"></div>
            </div>
          </div>
        </form>
      </div>
    </section>

    <!-- PAESE -->
    <section class="hidden-section" id="sectionPaese">
      <div class="end">
        <div class="">
          <h2>Da quale paese proviene il film?</h2>
          <div class="underline"></div>
        </div>
        <div class="search-bar">
          <i class="fa-solid fa-search"></i>
          <input
            autocomplete="off"
            type=""
            name="search"
            id="mapSearch"
            placeholder="Cerca un paese" />
        </div>
        <div class="">
          <form
            action=""
            method="post"
            name="paese"
            autocomplete="off"
            class=""
            id="paese">
            <div class="select-paese">
              <div id="zonaPaese" class="gridPaese"></div>

              <svg id="map"></svg>
            </div>
            <div class="submit-button">
              <div class="submit-relative">
                <button
                  type="submit"
                  disabled="true"
                  class="submit checkbox"
                  id="submitPaese">
                  <i class="fa-solid fa-check"></i>
                </button>
                <div class="shadow-1"></div>
                <div class="shadow-2"></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- CAST -->
    <section class="hidden-section" id="sectionCast">
      <div class="center">
        <div class="">
          <h2>Quali attori vorresti vedere?</h2>
          <div class="underline"></div>
        </div>
        <div class="search-bar">
          <i class="fa-solid fa-search"></i>
          <input
            autocomplete="off"
            type="text"
            name="search"
            id="searchAttori"
            placeholder="Cerca un attore" />
        </div>
        <form
          action=""
          method="post"
          name="attori"
          autocomplete="off"
          class="form-attori"
          id="attori">
          <div id="zonaAttori" class="actor-grid"></div>
          <div class="submit-button">
            <div class="submit-relative">
              <button
                type="submit"
                disabled="true"
                class="submit checkbox"
                id="submitAttori">
                <i class="fa-solid fa-check"></i>
              </button>
              <div class="shadow-1"></div>
              <div class="shadow-2"></div>
            </div>
          </div>
        </form>
      </div>
    </section>

    <!-- DURATA -->
    <section class="hidden-section" id="sectionDurata">
      <div class="center">
        <div class="">
          <h2>Quanto minuti hai a disposizione?</h2>
          <div class="underline"></div>
        </div>
        <form
          action=""
          method="post"
          name="durata"
          autocomplete="off"
          id="durata"
          class="durataForm">
          <div class="durataGrid">
            <input
              type="number"
              min="0"
              max="500"
              value="135"
              id="durataInput" />
          </div>
          <div class="submit-button">
            <div class="submit-relative">
              <button type="submit" class="submit" id="submitAnno">
                <i class="fa-solid fa-check"></i>
              </button>
              <div class="shadow-1"></div>
              <div class="shadow-2"></div>
            </div>
          </div>
        </form>
      </div>
    </section>

    <!-- PROVIDER -->
    <section class="hidden-section" id="sectionProvider">
      <div class="center">
        <div class="">
          <h2>Dove vuoi vedere il film?</h2>
          <div class="underline"></div>
        </div>
        <div class="search-bar">
          <i class="fa-solid fa-search"></i>
          <input
            autocomplete="off"
            type="text"
            name="search"
            id="searchProvider"
            placeholder="Cerca un provider" />
        </div>
        <form
          action=""
          method="post"
          name="provider"
          autocomplete="off"
          class=""
          id="provider">
          <div id="zonaProvider" class="gridProvider"></div>
          <div class="submit-button">
            <div class="submit-relative">
              <button
                type="submit"
                disabled="true"
                class="submit checkbox"
                id="submitProvider">
                <i class="fa-solid fa-check"></i>
              </button>
              <div class="shadow-1"></div>
              <div class="shadow-2"></div>
            </div>
          </div>
        </form>
      </div>
    </section>
  </body>
</html>
