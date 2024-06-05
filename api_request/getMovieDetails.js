//Search Movies By Filters
// &with_genres=18%2C27
// &release_date.gte=1950-01-01&release_date.lte=2024-12-31
// &with_origin_country=18
// &with_people=21%2C18
// with_runtime.lte=135
// &with_watch_providers=18%2C27

let moviesResponse;
let castResponse = [];
let detailsResponse = [];
let watchedMovies = [];

//Check if the movie is already in the database
function binarySearch(arr, x) {
  let start = 0, end = arr.length - 1;

  while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      if (arr[mid] === x) return true;
      else if (arr[mid] < x) 
           start = mid + 1;
      else
           end = mid - 1;
  }

  return false;
}

//Get Movies from database
function getMovieId() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        watchedMovies = this.responseText.split(',').map(Number).sort((a, b) => a - b);
        resolve(watchedMovies);
      } else if (this.readyState == 4) {
        reject(new Error('Failed to fetch movie ID'));
      }
    };
    xhr.open("GET", "./php/getMovieId.php", true);
    xhr.send();
  });
}


//Search Movies
function searchMovies(query) {
  const data = null;
  let vote_count = 100;
  if(query.includes("&with_people"))
    vote_count = 0;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = handleMovies;

  xhr.open(
    "GET",
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=it-IT&watch_region=IT&sort_by=vote_average.desc&vote_count.gte="+vote_count +
      query
  );

  xhr.setRequestHeader("accept", "application/json");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmUyMmQxMWUzN2Y0MDliMmRhNGM2NWZjOTQ0NmRkNSIsInN1YiI6IjY2MjI4NzEzODdhZTdiMDE4OGQ5Nzk2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICLH9FOUKx13sY07NC861dluoMEiX7VkGlpuazq5VpA"
  );

  xhr.send(data);
}

//Get Cast

function getCast(movieId, i) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          castResponse[i] = JSON.parse(xhr.responseText);
          resolve();
        } else {
          reject("Error: " + xhr.status);
        }
      }
    };

    xhr.open(
      "GET",
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/credits?language=it-IT"
    );
    xhr.setRequestHeader("accept", "application/json");
    xhr.setRequestHeader(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmUyMmQxMWUzN2Y0MDliMmRhNGM2NWZjOTQ0NmRkNSIsInN1YiI6IjY2MjI4NzEzODdhZTdiMDE4OGQ5Nzk2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICLH9FOUKx13sY07NC861dluoMEiX7VkGlpuazq5VpA"
    );

    xhr.send();
  });
}

//Get Details
function getDetails(movieId, i) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          detailsResponse[i] = JSON.parse(xhr.responseText);
          resolve();
        } else {
          reject("Error: " + xhr.status);
        }
      }
    };

    xhr.open(
      "GET",
      "https://api.themoviedb.org/3/movie/" + movieId + "?language=it-IT"
    );
    xhr.setRequestHeader("accept", "application/json");
    xhr.setRequestHeader(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmUyMmQxMWUzN2Y0MDliMmRhNGM2NWZjOTQ0NmRkNSIsInN1YiI6IjY2MjI4NzEzODdhZTdiMDE4OGQ5Nzk2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICLH9FOUKx13sY07NC861dluoMEiX7VkGlpuazq5VpA"
    );

    xhr.send();
  });
}

//Handle Movies
async function handleMovies(e) {
  if (e.target.readyState === 4 && e.target.status === 200) {
    try {
      const movieId = await getMovieId();
      // Continue with the rest of your code
    } catch (error) {
      console.error('Failed to get movie ID:', error);
    }

    moviesResponse = JSON.parse(e.target.responseText);
    let zonaDinamica = document.getElementById("zonaFilm");
    let watchedMovieOnThisPage = 0;
    // sessionStorage.setItem("total_pages", moviesResponse.total_pages);
    let promises = moviesResponse["results"].map(async (result, i) => {
      let movieId = result["id"];
      if (binarySearch(watchedMovies, movieId)){ 
        watchedMovieOnThisPage++;
      }
      else{
      return Promise.all([getCast(movieId, i), getDetails(movieId, i)])
        .then(() => {
          if (moviesResponse && castResponse[i] && detailsResponse[i]) {
            createElement(i, zonaDinamica);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      }
    });

    Promise.all(promises)
      .then(() => {
        if (moviesResponse.page === 1)
          addMatchEventListener(
        moviesResponse.total_pages,
        moviesResponse.total_results
      );
      else {
        updateContainers();
      }
      if(watchedMovieOnThisPage >= 10){
        loadNewMovies(true);
      }
      updateCurrentContainer(watchedMovieOnThisPage)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

//Handle Cast
function handleCast(e) {
  return new Promise((resolve, reject) => {
    if (e.target.status === 200 && e.target.responseText !== "") {
      try {
        castResponse.push(JSON.parse(e.target.responseText));
        resolve();
      } catch (error) {
        reject("Error: Failed to parse cast response");
      }
    } else {
      reject("Error: Cast not found");
    }
  });
}

//Handle Details
function handleDetails(e) {
  return new Promise((resolve, reject) => {
    if (e.target.status === 200 && e.target.responseText !== "") {
      try {
        detailsResponse.push(JSON.parse(e.target.responseText));
        resolve();
      } catch (error) {
        reject("Error: Failed to parse details response");
      }
    } else {
      reject(e.target);
    }
  });
}

//Create Element
function createElement(i, zonaDinamica) {
  let container = document.createElement("div");
  container.className = "container";
  container.id = moviesResponse["results"][i]["id"];

  // Create and append img
  let img = document.createElement("img");
  img.src =
    "https://image.tmdb.org/t/p/w500/" + detailsResponse[i]["poster_path"];
  img.alt = "cover";
  img.className = "cover";
  container.appendChild(img);

  // Create and append gradient div
  let gradient = document.createElement("div");
  gradient.id = "gradient";
  gradient.className = "gradient";
  container.appendChild(gradient);

  // Create and append text-container
  let textContainer = document.createElement("div");
  textContainer.className = "text-container";
  container.appendChild(textContainer);

  // Create and append title-div
  let titleDiv = document.createElement("div");
  titleDiv.className = "title-div";
  textContainer.appendChild(titleDiv);

  // Create and append title, runtime, originCountry
  let h1 = document.createElement("h1");
  h1.textContent = detailsResponse[i]["title"];
  titleDiv.appendChild(h1);

  // Create and append flex-container
  let flexContainer = document.createElement("div");
  flexContainer.className = "flex-container";
  titleDiv.appendChild(flexContainer);

  let h3 = document.createElement("h3");
  h3.textContent = detailsResponse[i]["runtime"] + " min";
  h3.className = "runtime";
  flexContainer.appendChild(h3);

  h3 = document.createElement("h3");
  h3.textContent = detailsResponse[i]["origin_country"][0];
  flexContainer.appendChild(h3);

  // Create and append rating
  h3 = document.createElement("h3");
  let vote_average = detailsResponse[i]["vote_average"];
  vote_average = Math.floor(vote_average * 10) / 10;
  h3.textContent = vote_average;
  flexContainer.appendChild(h3);

  let icon = document.createElement("i");
  icon.className = "fa-solid fa-star";
  flexContainer.appendChild(icon);

  // Create and append subtitle-div
  let subtitleDiv = document.createElement("div");
  subtitleDiv.className = "subtitle-div";
  textContainer.appendChild(subtitleDiv);

  // Create and append h3 for year
  h3 = document.createElement("h3");
  h3.textContent = detailsResponse[i]["release_date"].substring(0, 4);
  subtitleDiv.appendChild(h3);

  // Create and append div for genres
  let genreDiv = document.createElement("div");
  subtitleDiv.appendChild(genreDiv);

  // Create and append h3 for each genre
  for (let j = 0; j < detailsResponse[i]["genres"].length && j < 3; j++) {
    h3 = document.createElement("h3");
    h3.textContent = detailsResponse[i]["genres"][j]["name"];
    genreDiv.appendChild(h3);
  }

  // Create and append p for description
  let p = document.createElement("p");
  p.className = "clamp";
  p.textContent = detailsResponse[i]["overview"];
  textContainer.appendChild(p);

  // Create and append cast-text for pc
  let h2 = document.createElement("h2");
  h2.textContent = "Cast";
  h2.className = "cast-text";
  textContainer.appendChild(h2);

  // Create and append cast-div
  let castDiv = document.createElement("div");
  castDiv.id = "cast";
  castDiv.className = "cast";
  textContainer.appendChild(castDiv);

  // Create and append cast-text for mobile
  h2 = document.createElement("h2");
  h2.textContent = "Cast";
  castDiv.appendChild(h2);

  // Create and append cast-container
  let castContainer = document.createElement("div");
  castContainer.className = "grid";
  castDiv.appendChild(castContainer);

  //Create cast element for each actor
  for (let j = 0; j < castResponse[i]["cast"].length && j < 15; j++) {
    // Create and append div
    let actorDiv = document.createElement("div");
    actorDiv.className = "relative";
    castContainer.appendChild(actorDiv);

    // Create and append img for actor profile picture
    let img = document.createElement("img");
    img.src =
      "https://image.tmdb.org/t/p/w500/" +
      castResponse[i]["cast"][j]["profile_path"];
    img.alt = "Profile Picture";
    actorDiv.appendChild(img);

    // Create and append h6 for actor name
    let h6 = document.createElement("h6");
    h6.textContent = castResponse[i]["cast"][j]["name"];
    actorDiv.appendChild(h6);
  }
  // Finally, append the main container to the body (or any other parent element)
  zonaDinamica.appendChild(container);
}
