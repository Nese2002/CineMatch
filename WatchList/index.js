document.addEventListener("DOMContentLoaded", function () {
  // Select the movie-element divs
  let movieElements = document.querySelectorAll(".movie-element");
  let movieTitles = document.querySelectorAll(".movie-details h1");
  let movieDetails = document.querySelectorAll(".movie-details p");
  let movieCovers = document.querySelectorAll(".cover");

  let timeoutIds = [];

  // Add event listener for mouseover
  movieElements.forEach((movieElement, index) => {
    movieElement.addEventListener("mouseover", function () {
      this.style.height = "13rem";
      movieTitles[index].style.transform = "translateY(-10vh)";
      timeoutIds[index] = setTimeout(() => {
        movieTitles[index].style.transition = "transform 0s";
        movieTitles[index].style.transform = "translateY(0)";
        movieDetails[index].style.display = "block";
        movieCovers[index].style.display = "block";
      }, 250);
    });
  });

  // Add event listener for mouseout
  movieElements.forEach((movieElement, index) => {
    movieElement.addEventListener("mouseout", function () {
      clearTimeout(timeoutIds[index]);
      this.style.height = "";
      movieTitles[index].style.transition = "transform 0.5s";
      movieTitles[index].style.transform = "translateY(0)";
      movieDetails[index].style.display = "none";
      movieCovers[index].style.display = "none";
    });
  });
});

let isExpanded = Array(movieElements.length).fill(false);

movieElements.forEach((movieElement, index) => {
  movieElement.addEventListener("click", function () {
    if (!isExpanded[index]) {
      this.style.height = "13rem";
      movieTitles[index].style.transform = "translateY(-10vh)";
      setTimeout(() => {
        movieTitles[index].style.transition = "transform 0s";
        movieTitles[index].style.transform = "translateY(0)";
        movieDetails[index].style.display = "block";
        movieCovers[index].style.display = "block";
      }, 250);
    } else {
      this.style.height = "";
      movieTitles[index].style.transition = "transform 0.5s";
      movieTitles[index].style.transform = "translateY(0)";
      movieDetails[index].style.display = "none";
      movieCovers[index].style.display = "none";
    }
    isExpanded[index] = !isExpanded[index];
  });
});