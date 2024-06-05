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

  // let cast = document.querySelector("#cast");

  // // Add horizontal scrolling to the cast div
  // cast.addEventListener(
  //   "wheel",
  //   function (e) {
  //     // Prevent the default vertical scrolling
  //     e.preventDefault();

  //     // Scroll horizontally instead
  //     cast.scrollLeft += e.deltaY;
  //   },
  //   { passive: false }
  // );

  updateContainers();
  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);
  // Add click event listener for trash and love buttons
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
           // Query verso il database
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
        // Query verso il database
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
  console.log(
    "currentPage=" +
      obj.current_page +
      " obj.total_pages=" +
      obj.total_pages +
      " current_container=" +
      obj.current_container
  );
  if ((obj.current_page < obj.total_pages && obj.current_container % 10 === 0) ||(obj.current_page < obj.total_pages && fewMovies) ) {
    obj.current_page++;

    let query = sessionStorage.getItem("query");
    query = query + "&page=" + obj.current_page;
    searchMovies(query);
  }

  obj.current_container++;
  backToQuiz();
  // return { current_container, current_page };
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

    hammertime.on("pan", function (event) {
      if (event.target !== newCards[0]) {
        return; // If it was, exit the function
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

    hammertime.on("panend", function (event) {
      if (event.target !== newCards[0]) {
        return; // If it was, exit the function
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
        // current_container = result.current_container;
        // current_page = result.current_page;

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
          // Query verso il database
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
          console.log("clicked");
          // Toggle the class "gradient-clicked" of its child
          let gradientDiv = container.querySelector("#gradient");
          if (gradientDiv) {
            gradientDiv.classList.toggle("gradient");
            gradientDiv.classList.toggle("gradient-clicked");
          }
    
          // Toggle the class "clamp" from its p child
          let pElement = container.querySelector("p");
          if (pElement) {
            pElement.style.transition = "all 3s ease";
            pElement.classList.toggle("clamp");
          }
    
          // Toggle the class "visible-cast" of its child
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
    
      container.setAttribute('data-click-attached', 'true');
    }
  });
}

function updateCurrentContainer(watchedMovieOnThisPage){
  obj.current_container += watchedMovieOnThisPage;
  console.log(typeof obj.current_container, typeof obj.total_containers, obj.current_container, obj.total_containers);
  backToQuiz();
}

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