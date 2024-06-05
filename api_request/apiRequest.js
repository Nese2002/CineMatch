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

    // Create dinamically the checkboxes
    for (let i = 0; i < response["genres"].length; i++) {
      let label = document.createElement("label");
      let input = document.createElement("input");
      let span = document.createElement("span");

      label.setAttribute("class", "checkbox-container");
      input.setAttribute("type", "checkbox");
      input.setAttribute("id", response["genres"][i]["id"]);
      span.setAttribute("class", "checkbox-text");
      span.textContent = response["genres"][i]["name"];

      label.appendChild(input);
      label.appendChild(span);

      zonaDinamica.appendChild(label);
    }
  }
}

function handlePeople(e) {
  if (e.target.readyState === 4 && e.target.status === 200) {
    const response = JSON.parse(e.target.responseText);
    let zonaDinamica = document.getElementById("zonaAttori");

    // Create dinamically the checkboxes
    for (let i = 0; i < response["results"].length; i++) {
      if (response["results"][i]["known_for_department"] === "Acting") {

      let img = document.createElement("img");
      let label = document.createElement("label");
      let input = document.createElement("input");
      let div = document.createElement("div");
      let nome = document.createElement("span");
      let ruolo = document.createElement("span");
      let textDiv = document.createElement("div");

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

      label.appendChild(input);
      label.appendChild(div);
      div.appendChild(img);
      div.appendChild(textDiv);
      textDiv.appendChild(nome);
      textDiv.appendChild(ruolo);

      zonaDinamica.appendChild(label);
    }
  }

  }
}

function handleProviders(e) {
  if (e.target.readyState === 4 && e.target.status === 200) {
    const response = JSON.parse(e.target.responseText);
    let zonaDinamica = document.getElementById("zonaProvider");

    // Create dinamically the checkboxes
    for (let i = 0; i < response["results"].length; i++) {
      let label = document.createElement("label");
      let input = document.createElement("input");
      let img = document.createElement("img");

      label.setAttribute("class", "checkbox-container");
      input.setAttribute("type", "checkbox");
      label.setAttribute("id", response["results"][i]["provider_name"]);
      input.setAttribute("id", response["results"][i]["provider_id"]);
      img.setAttribute("class", "checkbox-img");
      img.setAttribute(
        "src",
        "https://image.tmdb.org/t/p/w500" + response["results"][i]["logo_path"]
      );

      label.appendChild(input);
      label.appendChild(img);

      zonaDinamica.appendChild(label);
    }
  }
}
