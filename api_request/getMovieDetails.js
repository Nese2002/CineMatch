//Search Movies By Filters
// &with_genres=18%2C27
// &release_date.gte=1950-01-01&release_date.lte=2024-12-31
// &with_origin_country=18
// &with_people=21%2C18
// with_runtime.lte=135
// &with_watch_providers=18%2C27

let moviesResponse;
let castResponse;
let detailsResponse;

//Search Movies
function searchMovies(query) {
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = handleMovies;

  xhr.open(
    "GET",
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=it-IT&page=1&watch_region=IT&sort_by=vote_average.desc&vote_count.gte=500" +
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
//Get Cast
function getCast(movieId) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          castResponse = JSON.parse(xhr.responseText);
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
function getDetails(movieId) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          detailsResponse = JSON.parse(xhr.responseText);
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
function handleMovies(e) {
  if (e.target.readyState === 4 && e.target.status === 200) {
    moviesResponse = JSON.parse(e.target.responseText);
    let zonaDinamica = document.getElementById("zonaFilm");
    console.log(moviesResponse["results"]);
    let promises = [];

    for (let i = 0; i < moviesResponse["results"].length; i++) {
      let movieId = moviesResponse["results"][i]["id"];
      let promise = Promise.all([getCast(movieId), getDetails(movieId)])
        .then(() => {
          if (moviesResponse && castResponse && detailsResponse) {
            createElement(i, zonaDinamica);
            console.log("YEEE");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      promises.push(promise);
    }

    Promise.all(promises)
      .then(() => {
        addMatchEventListener();
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
        castResponse = JSON.parse(e.target.responseText);
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
      console.log("responseText:", e.target.responseText);
      console.log("response:", e.target.response);
      try {
        detailsResponse = JSON.parse(e.target.responseText);
        console.log(detailsResponse);
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

  // Create and append img
  let img = document.createElement("img");
  img.src = "https://image.tmdb.org/t/p/w500/" + detailsResponse["poster_path"];
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

  // Create and append flex-container
  let flexContainer = document.createElement("div");
  flexContainer.className = "flex-container";
  titleDiv.appendChild(flexContainer);

  // Create and append title, runtime, originCountry
  let h1 = document.createElement("h1");
  h1.textContent = detailsResponse["title"];
  flexContainer.appendChild(h1);

  let h3 = document.createElement("h3");
  h3.textContent = detailsResponse["runtime"] + " min";
  flexContainer.appendChild(h3);

  h3 = document.createElement("h3");
  h3.textContent = detailsResponse["origin_country"][0];
  flexContainer.appendChild(h3);

  // Create and append flex-container
  flexContainer = document.createElement("div");
  flexContainer.className = "flex-container";
  titleDiv.appendChild(flexContainer);

  // Create and append rating
  h3 = document.createElement("h3");
  let vote_average = detailsResponse["vote_average"];
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
  h3.textContent = detailsResponse["release_date"].substring(0, 4);
  subtitleDiv.appendChild(h3);

  // Create and append div for genres
  let genreDiv = document.createElement("div");
  subtitleDiv.appendChild(genreDiv);

  // Create and append h3 for each genre
  for (let j = 0; j < detailsResponse["genres"].length; j++) {
    h3 = document.createElement("h3");
    h3.textContent = detailsResponse["genres"][j]["name"];
    genreDiv.appendChild(h3);
  }

  // Create and append p for description
  let p = document.createElement("p");
  p.className = "clamp";
  p.textContent = detailsResponse["overview"];
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
  for (let j = 0; j < castResponse["cast"].length && j < 15; j++) {
    // Create and append div
    let actorDiv = document.createElement("div");
    actorDiv.className = "relative";
    castContainer.appendChild(actorDiv);

    // Create and append img for actor profile picture
    let img = document.createElement("img");
    img.src =
      "https://image.tmdb.org/t/p/w500/" +
      castResponse["cast"][j]["profile_path"];
    img.alt = "Profile Picture";
    actorDiv.appendChild(img);

    // Create and append h6 for actor name
    let h6 = document.createElement("h6");
    h6.textContent = castResponse["cast"][j]["name"];
    actorDiv.appendChild(h6);
  }
  // Finally, append the main container to the body (or any other parent element)
  zonaDinamica.appendChild(container);
}
