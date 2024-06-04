//Genre
function getGenres() {
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = handleGenres;

  xhr.open("GET", "https://api.themoviedb.org/3/genre/movie/list?language=it");
  xhr.setRequestHeader("accept", "application/json");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmUyMmQxMWUzN2Y0MDliMmRhNGM2NWZjOTQ0NmRkNSIsInN1YiI6IjY2MjI4NzEzODdhZTdiMDE4OGQ5Nzk2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICLH9FOUKx13sY07NC861dluoMEiX7VkGlpuazq5VpA"
  );

  xhr.send(data);
}

//Cast
function getPeople() {
  const data = null;

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = handlePeople;

  xhr.open(
    "GET",
    "https://api.themoviedb.org/3/person/popular?language=it-IT&page=1"
  );
  xhr.setRequestHeader("accept", "application/json");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmUyMmQxMWUzN2Y0MDliMmRhNGM2NWZjOTQ0NmRkNSIsInN1YiI6IjY2MjI4NzEzODdhZTdiMDE4OGQ5Nzk2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICLH9FOUKx13sY07NC861dluoMEiX7VkGlpuazq5VpA"
  );

  xhr.send(data);
}

function getPeopleFromName(name) {
  const data = null;

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = handlePeople;

  xhr.open(
    "GET",
    "https://api.themoviedb.org/3/search/person?include_adult=false&language=it-IT&page=1&query=" +
      name
  );
  xhr.setRequestHeader("accept", "application/json");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmUyMmQxMWUzN2Y0MDliMmRhNGM2NWZjOTQ0NmRkNSIsInN1YiI6IjY2MjI4NzEzODdhZTdiMDE4OGQ5Nzk2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICLH9FOUKx13sY07NC861dluoMEiX7VkGlpuazq5VpA"
  );

  xhr.send(data);
}

//Providers
function getProviders() {
  const data = null;

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = handleProviders;

  xhr.open(
    "GET",
    "https://api.themoviedb.org/3/watch/providers/movie?language=it-IT&watch_region=it"
  );
  xhr.setRequestHeader("accept", "application/json");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmUyMmQxMWUzN2Y0MDliMmRhNGM2NWZjOTQ0NmRkNSIsInN1YiI6IjY2MjI4NzEzODdhZTdiMDE4OGQ5Nzk2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICLH9FOUKx13sY07NC861dluoMEiX7VkGlpuazq5VpA"
  );

  xhr.send(data);
}

//Handle functions
function handleGenres(e) {
  if (e.target.readyState === 4 && e.target.status === 200) {
    const response = JSON.parse(e.target.responseText);
    let zonaDinamica = document.getElementById("zonaGenere");

    for (let i = 0; i < response["genres"].length; i++) {
      // Create new elements
      let label = document.createElement("label");
      let input = document.createElement("input");
      let span = document.createElement("span");

      // Set their properties
      label.setAttribute("class", "checkbox-container");
      input.setAttribute("type", "checkbox");
      input.setAttribute("id", response["genres"][i]["id"]);
      span.setAttribute("class", "checkbox-text");
      span.textContent = response["genres"][i]["name"];

      // Append the input and span to the label
      label.appendChild(input);
      label.appendChild(span);

      // Append the label to the parent element
      zonaDinamica.appendChild(label);
    }
  }
}

function handlePeople(e) {
  if (e.target.readyState === 4 && e.target.status === 200) {
    const response = JSON.parse(e.target.responseText);
    let zonaDinamica = document.getElementById("zonaAttori");

    for (let i = 0; i < response["results"].length; i++) {
      // Create new elements
      let img = document.createElement("img");
      let label = document.createElement("label");
      let input = document.createElement("input");
      let div = document.createElement("div");
      let nome = document.createElement("span");
      let ruolo = document.createElement("span");
      let textDiv = document.createElement("div");

      // Set their properties
      if (response["results"][i]["profile_path"] == null) {
        img.setAttribute("src", "./assets/noImage.jpg");
      } else {
        img.setAttribute(
          "src",
          "https://image.tmdb.org/t/p/w500" +
            response["results"][i]["profile_path"]
        );
      }
      img.setAttribute("class", "actor-img");
      div.setAttribute("class", "actor-checkbox");
      label.setAttribute("class", "actor-container");
      input.setAttribute("type", "checkbox");
      input.setAttribute("id", response["results"][i]["id"]);
      nome.setAttribute("class", "actor-text");
      nome.textContent = response["results"][i]["name"];
      ruolo.setAttribute("class", "ruolo-text");
      ruolo.textContent = response["results"][i]["known_for_department"];
      textDiv.setAttribute("class", "text-div");

      // Append the input and span to the label
      label.appendChild(input);
      label.appendChild(div);
      div.appendChild(img);
      div.appendChild(textDiv);
      textDiv.appendChild(nome);
      textDiv.appendChild(ruolo);

      // Append the label to the parent element
      zonaDinamica.appendChild(label);
    }
  }
}

function handleProviders(e) {
  if (e.target.readyState === 4 && e.target.status === 200) {
    const response = JSON.parse(e.target.responseText);
    let zonaDinamica = document.getElementById("zonaProvider");
    for (let i = 0; i < response["results"].length; i++) {
      // Create new elements
      let label = document.createElement("label");
      let input = document.createElement("input");
      let img = document.createElement("img");

      // Set their properties
      label.setAttribute("class", "checkbox-container");
      input.setAttribute("type", "checkbox");
      label.setAttribute("id", response["results"][i]["provider_name"]);
      input.setAttribute("id", response["results"][i]["provider_id"]);
      img.setAttribute("class", "checkbox-img");
      img.setAttribute(
        "src",
        "https://image.tmdb.org/t/p/w500" + response["results"][i]["logo_path"]
      );

      // Append the input and span to the label
      label.appendChild(input);
      label.appendChild(img);

      // Append the label to the parent element
      zonaDinamica.appendChild(label);
    }
  }
}

function handleMovies(e) {
  if (e.target.readyState === 4 && e.target.status === 200) {
    const response = JSON.parse(e.target.responseText);
    console.log(response);
    let zonaDinamica = document.getElementById("zonaFilm");
    zonaDinamica.innerHTML = "";
    for (let i = 0; i < response["results"].length; i++) {
      // Create main container
      let container = document.createElement("div");
      container.className = "container";

      // Create and append img
      let img = document.createElement("img");
      img.src =
        "https://image.tmdb.org/t/p/w500/" +
        response["results"][i]["poster_path"];
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

      // Create and append h1, h3, h3
      let h1 = document.createElement("h1");
      h1.textContent = response["results"][i]["title"];
      flexContainer.appendChild(h1);

      let h3 = document.createElement("h3");
      h3.textContent = response["results"][i]["release_date"];
      flexContainer.appendChild(h3);

      h3 = document.createElement("h3");
      h3.textContent = "Korea";
      flexContainer.appendChild(h3);

      // ... continue for the rest of the elements

      // Finally, append the main container to the body (or any other parent element)
      zonaDinamica.appendChild(container);
    }
    // let zonaDinamica = document.getElementById("zonaFilm");
    // zonaDinamica.innerHTML = "";
    // for (let i = 0; i < response["results"].length; i++) {
    //   // Create new elements
    //   let img = document.createElement("img");
    //   let div = document.createElement("div");
    //   let title = document.createElement("span");
    //   let vote = document.createElement("span");
    //   let overview = document.createElement("span");
    //   let textDiv = document.createElement("div");

    //   // Set their properties
    //   if(response["results"][i]["poster_path"] == null){
    //     img.setAttribute("src", "./assets/noImage.jpg");
    //   }
    //   else{
    //     img.setAttribute("src", "https://image.tmdb.org/t/p/w500" + response["results"][i]["poster_path"]);
    //   }
    //   img.setAttribute("class", "movie-img");
    //   div.setAttribute("class", "movie-container");
    //   title.setAttribute("class", "movie-text");
    //   title.textContent = response["results"][i]["title"];
    //   vote.setAttribute("class", "vote-text");
    //   vote.textContent = "Voto: " + response["results"][i]["vote_average"];
    //   overview.setAttribute("class", "overview-text");
    //   overview.textContent = response["results"][i]["overview"];
    //   textDiv.setAttribute("class", "text-div");

    //   // Append the input and span to the label
    //   div.appendChild(img);
    //   div.appendChild(textDiv);
    //   textDiv.appendChild(title);
    //   textDiv.appendChild(vote);
    //   textDiv.appendChild(overview);

    //   // Append the label to the parent element
    //   zonaDinamica.appendChild(div);
    // }
  }
}
