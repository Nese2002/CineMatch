document.addEventListener("DOMContentLoaded", function () {
  // Select the movie-element div
  let movieElement = document.querySelector(".movie-element");
  let movieDetails = document.querySelector(".movie-details p");
  let movieCover = document.querySelector(".cover");
  // Add event listener for mouseover
  movieElement.addEventListener("mouseover", function () {
    this.style.height = "12rem";
    timeoutId = setTimeout(() => {
      movieDetails.style.display = "block";
      movieCover.style.display = "block";
    }, 250);
  });

  // Add event listener for mouseout
  movieElement.addEventListener("mouseout", function () {
    clearTimeout(timeoutId);
    this.style.height = "";
    movieDetails.style.display = "none";
    movieCover.style.display = "none";
  });
});
