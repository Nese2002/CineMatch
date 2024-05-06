document.addEventListener("DOMContentLoaded", function () {
  let query = sessionStorage.getItem("query");
  searchMovies(query);

  // Add click event listener for every container
});

function addMatchEventListener() {
  console.log("addMatchEventListener");
  let cardContainer = document.querySelector(".card-container");
  let trashes = document.getElementsByName("trash");
  let loves = document.getElementsByName("love");
  let containers = document.querySelectorAll(".container");
  console.log(containers);
  let cast = document.querySelector(".cast");

  // Add horizontal scrolling to the cast div
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

  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);

  // Initialize the cards
  function initCards(card, index) {
    var newCards = document.querySelectorAll(".container:not(.removed)");

    newCards.forEach(function (card, index) {
      card.style.zIndex = containers.length - index;
      card.style.transform =
        "scale(" + (20 - index) / 20 + ") translateY(-" + 30 * index + "px)";
      card.style.opacity = (10 - index) / 10;
    });

    cardContainer.classList.add("loaded");
  }
  initCards();

  //use Hammer.js to add swipe functionality to the cards
  containers.forEach(function (container) {
    var hammertime = new Hammer(container);

    hammertime.on("pan", function (event) {
      if (event.target !== container) {
        return; // If it was, exit the function
      }
      container.classList.add("moving");
    });

    hammertime.on("pan", function (event) {
      if (event.target !== container) {
        return; // If it was, exit the function
      }
      if (event.deltaX === 0) return;
      if (event.center.x === 0 && event.center.y === 0) return;

      cardContainer.classList.toggle("love", event.deltaX < 0);
      cardContainer.classList.toggle("trash", event.deltaX > 0);

      var xMulti = event.deltaX * 0.05;
      var yMulti = event.deltaY / 100;
      var rotate = xMulti * yMulti;

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
      if (event.target !== container) {
        return; // If it was, exit the function
      }
      container.classList.remove("moving");
      cardContainer.classList.remove("love");
      cardContainer.classList.remove("trash");

      var moveOutWidth = document.body.clientWidth;
      var keep =
        Math.abs(event.deltaX) < 100 || Math.abs(event.velocityX) < 0.5;

      event.target.classList.toggle("removed", !keep);

      if (keep) {
        event.target.style.transform = "";
      } else {
        var endX = Math.max(
          Math.abs(event.velocityX) * moveOutWidth,
          moveOutWidth
        );
        var toX = event.deltaX > 0 ? endX : -endX;
        var endY = Math.abs(event.velocityY) * moveOutWidth;
        var toY = event.deltaY > 0 ? endY : -endY;
        var xMulti = event.deltaX * 0.05;
        var yMulti = event.deltaY / 100;
        var rotate = xMulti * yMulti;

        event.target.style.transform =
          "translate(" +
          toX +
          "px, " +
          (toY + event.deltaY) +
          "px) rotate(" +
          rotate +
          "deg)";
        initCards();
      }
    });

    // Add click event listener for every container
    container.addEventListener("click", function () {
      if (container.classList.contains("mobile")) {
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
  });

  // Add click event listener for trash and love buttons
  trashes.forEach(function (trash) {
    trash.addEventListener("click", function () {
      var cards = document.querySelectorAll(".container:not(.removed)");
      var moveOutWidth = document.body.clientWidth * 1.5;

      if (!cards.length) {
        return false;
      }

      var currentCard = cards[0];
      currentCard.classList.add("removed");
      currentCard.style.transform =
        "translate(" + moveOutWidth + "px, -100px) rotate(30deg)";
      initCards();
    });
  });

  loves.forEach(function (love) {
    love.addEventListener("click", function () {
      var cards = document.querySelectorAll(".container:not(.removed)");
      var moveOutWidth = document.body.clientWidth * 1.5;

      if (!cards.length) {
        return false;
      }

      var currentCard = cards[0];
      currentCard.classList.add("removed");
      currentCard.style.transform =
        "translate(-" + moveOutWidth + "px, -100px) rotate(-30deg)";
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
  let containers = document.getElementsByClassName("container");
  for (let container of containers) {
    restore(container);
    if (window.matchMedia("(max-width: 1120px)").matches) {
      container.classList.add("mobile");
    } else {
      container.classList.remove("mobile");
    }
  }
}
