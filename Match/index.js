// Call the searchMovies function when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  let query = sessionStorage.getItem("query");
  searchMovies(query);
});

let obj = {
  current_container: 0,
  current_page: 1,
  total_pages: 0,
  cardContainer: null,
  total_containers: 0,
};

// Prepare the page when the searchMovies function is called for the first time
function addMatchEventListener(total_pages, total_containers) {
  let trashes, loves, hero, loading;
  obj.total_pages = total_pages;
  obj.total_containers = total_containers;
  obj.cardContainer = document.querySelector(".card-container");
  trashes = document.getElementsByName("trash");
  loves = document.getElementsByName("love");

  hero = document.querySelector(".hero-load");
  hero.classList.remove("hero-loading");
  hero.classList.add("hero-loaded");

  loading = document.querySelector(".load");
  loading.classList.remove("loading");
  loading.classList.add("loading-complete");

  updateContainers();
  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);
  
  // Add click event listener for trash buttons
  trashes.forEach(function (trash) {
    trash.addEventListener("click", function () {
      let cards = document.querySelectorAll(".container:not(.removed)");
      let moveOutWidth = document.body.clientWidth * 1.5;

      if (!cards.length) {
        return false;
      }
      loadNewMovies();
      let currentCard = cards[0];
      currentCard.classList.add("removed");
      currentCard.style.transform =
        "translate(" + moveOutWidth + "px, -100px) rotate(30deg)";
       
      let imgElement = currentCard.querySelector('img.cover');
      let h1Element = currentCard.querySelector('h1');
      let pElement = currentCard.querySelector('p');

      let imgSrc = imgElement ? imgElement.src : '';
      let h1Text = h1Element ? h1Element.textContent : '';
      let pText = pElement ? pElement.textContent : '';
      let movieId = currentCard.id;      

      let data = {
        direction:  'right',
        imgSrc: imgSrc,
        h1Text: h1Text,
        pText: pText,
        movieId: movieId
      };

      let xhr = new XMLHttpRequest();
      xhr.open('POST', './php/addToWatchlist.php', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(data));
          initCards();
      });
    });

  // Add click event listener for love buttons
  loves.forEach(function (love) {
    love.addEventListener("click", function () {
      let cards = document.querySelectorAll(".container:not(.removed)");
      let moveOutWidth = document.body.clientWidth * 1.5;

      if (!cards.length) {
        return false;
      }
      loadNewMovies();
      let currentCard = cards[0];
      currentCard.classList.add("removed");
      currentCard.style.transform =
        "translate(-" + moveOutWidth + "px, -100px) rotate(-30deg)";

      let imgElement = currentCard.querySelector('img.cover');
      let h1Element = currentCard.querySelector('h1');
      let pElement = currentCard.querySelector('p');

      let imgSrc = imgElement ? imgElement.src : '';
      let h1Text = h1Element ? h1Element.textContent : '';
      let pText = pElement ? pElement.textContent : '';
      let movieId = currentCard.id;      

      let data = {
        direction: 'left',
        imgSrc: imgSrc,
        h1Text: h1Text,
        pText: pText,
        movieId: movieId
      };
      
      let xhr = new XMLHttpRequest();
      xhr.open('POST', './php/addToWatchlist.php', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(data));
          initCards();
    });
  });
}

// Restore the container to its original state when the screen width changes
function restore(container) {
  let gradientDiv = container.querySelector("#gradient");
  let pElement = container.querySelector("p");
  let castDiv = container.querySelector("#cast");

  if (gradientDiv) {
    gradientDiv.classList.remove("gradient-clicked");
    gradientDiv.classList.add("gradient");
  }

  if (pElement) {
    pElement.classList.add("clamp");
  }

  if (castDiv) {
    if (window.matchMedia("(max-width: 1120px)").matches) {
      castDiv.style.display = "none";
    } else {
      castDiv.style.display = "block";
    }
  }
}

// Check if the screen width is less than 1120px
function checkScreenWidth() {
  let containers = document.querySelectorAll(".container");
  for (let container of containers) {
    restore(container);
    if (window.matchMedia("(max-width: 1120px)").matches) {
      container.classList.add("mobile");
    } else {
      container.classList.remove("mobile");
    }
  }
}

//Load new movies
function loadNewMovies(fewMovies = false) {
  
  if ((obj.current_page < obj.total_pages && obj.current_container % 10 === 0) ||(obj.current_page < obj.total_pages && fewMovies) ) {
    obj.current_page++;

    let query = sessionStorage.getItem("query");
    query = query + "&page=" + obj.current_page;
    searchMovies(query);
  }

  obj.current_container++;
  backToQuiz();
}

// Initialize the cards
function initCards() {
  let containers = document.querySelectorAll(".container");
  newCards = document.querySelectorAll(".container:not(.removed)");

  newCards.forEach(function (card, index) {
    card.style.zIndex = containers.length - index;
    if ((20 - index) / 20 >= 0) {
      card.style.transform =
        "scale(" + (20 - index) / 20 + ") translateY(-" + 25 * index + "px)";
    } else {
      card.style.transform = "scale(0) translateY(0)";
    }
  });

  obj.cardContainer.classList.add("loaded");
}

function updateContainers() {
  initCards();
  checkScreenWidth();

  //use Hammer.js to add swipe functionality to the cards
  newCards.forEach(function (container) {
    let hammertime = new Hammer(container);

    // Add pan event listener for every container
    hammertime.on("pan", function (event) {
      if (event.target !== newCards[0]) {
        return; 
      }
      container.classList.add("moving");
      if (event.deltaX === 0) return;
      if (event.center.x === 0 && event.center.y === 0) return;

      obj.cardContainer.classList.toggle("love", event.deltaX < 0);
      obj.cardContainer.classList.toggle("trash", event.deltaX > 0);

      let xMulti = event.deltaX * 0.05;
      let yMulti = event.deltaY / 100;
      let rotate = xMulti * yMulti;

      event.target.style.transform =
        "translate(" +
        event.deltaX +
        "px, " +
        event.deltaY +
        "px) rotate(" +
        rotate +
        "deg)";
    });

    // Add panend event listener for every container
    hammertime.on("panend", function (event) {
      if (event.target !== newCards[0]) {
        return; 
      }
      container.classList.remove("moving");
      obj.cardContainer.classList.remove("love");
      obj.cardContainer.classList.remove("trash");

      let moveOutWidth = document.body.clientWidth;
      let keep =
        Math.abs(event.deltaX) < 100 || Math.abs(event.velocityX) < 0.5;

      event.target.classList.toggle("removed", !keep);

      if (keep) {
        event.target.style.transform = "";
      } else {
        loadNewMovies();

        let endX = Math.max(
          Math.abs(event.velocityX) * moveOutWidth,
          moveOutWidth
        );
        let toX = event.deltaX > 0 ? endX : -endX;
        let endY = Math.abs(event.velocityY) * moveOutWidth;
        let toY = event.deltaY > 0 ? endY : -endY;
        let xMulti = event.deltaX * 0.05;
        let yMulti = event.deltaY / 100;
        let rotate = xMulti * yMulti;

        event.target.style.transform =
          "translate(" +
          toX +
          "px, " +
          (toY + event.deltaY) +
          "px) rotate(" +
          rotate +
          "deg)";
          
        let imgElement = container.querySelector('img.cover');
        let h1Element = container.querySelector('h1');
        let pElement = container.querySelector('p');

        let imgSrc = imgElement ? imgElement.src : '';
        let h1Text = h1Element ? h1Element.textContent : '';
        let pText = pElement ? pElement.textContent : '';
        let movieId = container.id;      

        let data = {
          direction: event.deltaX < 0 ? 'left' : 'right',
          imgSrc: imgSrc,
          h1Text: h1Text,
          pText: pText,
          movieId: movieId
        };

        let xhr = new XMLHttpRequest();
        xhr.open('POST', './php/addToWatchlist.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        initCards();
      }
    });

    // Add click event listener for every container
    if (!container.hasAttribute('data-click-attached')) {
      container.addEventListener("click", function () {
        if (container.classList.contains("mobile")) {
          

          let gradientDiv = container.querySelector("#gradient");
          if (gradientDiv) {
            gradientDiv.classList.toggle("gradient");
            gradientDiv.classList.toggle("gradient-clicked");
          }
    
          let pElement = container.querySelector("p");
          if (pElement) {
            pElement.style.transition = "all 3s ease";
            pElement.classList.toggle("clamp");
          }
    
          let castDiv = container.querySelector("#cast");
          if (castDiv) {
            if (
              castDiv.style.display === "none" ||
              castDiv.style.display === ""
            ) {
              castDiv.style.display = "block";
            } else {
              castDiv.style.display = "none";
            }
          }
        }
      });
    
      // Add attribute to the container to prevent multiple click event listeners
      container.setAttribute('data-click-attached', 'true');
    }
  });
}

// add the movie in the watchlist to the current container number
function updateCurrentContainer(watchedMovieOnThisPage){
  obj.current_container += watchedMovieOnThisPage;
  backToQuiz();
}

// Show the "No movies" message when the user has watched all the movies
function backToQuiz(){
  if (obj.current_container >= obj.total_containers) {
    let backToQuiz = document.querySelector(".no-movies");
    trashes = document.getElementsByName("trash");
    loves = document.getElementsByName("love");
    backToQuiz.style.opacity = 1;
    trashes.forEach(function (trash) {
      trash.style.display = "none";
    });
    loves.forEach(function (love) {
      love.style.display = "none";
    });
  }
}