export function getGenres() {
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
