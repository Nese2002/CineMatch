document.addEventListener("DOMContentLoaded", async function () {

  try {
    await getMovies();
  } catch (error) {
    console.error(error);
  }

  // Select the movie-element divs
  let movieElements = document.querySelectorAll(".movie-element");
  let movieTitles = document.querySelectorAll(".movie-details h1");
  let movieDetails = document.querySelectorAll(".movie-details p");
  let movieCovers = document.querySelectorAll(".cover");
  let checkButtons = document.querySelectorAll(".check-button");
  let bottomLines = document.querySelectorAll("#bottomLine");

  let timeoutIds = [];

  // Add event listener for mouseover


  movieElements.forEach((movieElement, index) => {
    let isExpanded = Array(movieElements.length).fill(false);
    movieElement.addEventListener("mouseover", function (event) {
      
      if (event.fromElement === checkButtons[index] || event.toElement === checkButtons[index]) {
        return;
      }
      console.log(event);
      isExpanded[index] = true;

      timeoutIds[index] = setTimeout(() => {
        movieDetails[index].style.display = "block";
        movieCovers[index].style.display = "block";
        checkButtons[index].style.display = "block";
      }, 100);

    });

    movieElement.addEventListener("mouseout", function (event) {
      // Check if the related target is the checkButtons[i] element
      if ( event.fromElement === checkButtons[index] || event.toElement === checkButtons[index]) {
        console.log(event.relatedTarget);
        return; // If it is, return early to prevent the rest of the code from executing
      }
      isExpanded[index] = false;
      
      clearTimeout(timeoutIds[index]);
      timeoutIds[index] = setTimeout(() => {
        movieDetails[index].style.display = "none";
        movieCovers[index].style.display = "none";
        checkButtons[index].style.display = "none";
    }, 100);
    });



    movieElement.addEventListener("click", function () {
      if (!isExpanded[index]) {
        setTimeout(() => {
          movieDetails[index].style.display = "block";
          movieCovers[index].style.display = "block";
          checkButtons[index].style.display = "block";
        }, 250);
      } else {
        movieDetails[index].style.display = "none";
        movieCovers[index].style.display = "none";
        checkButtons[index].style.display = "none";
      }
      isExpanded[index] = !isExpanded[index];
    });
  });

  // Add event listener for mouseover on checkButtons
checkButtons.forEach((checkButton, index) => {
  checkButton.addEventListener("mouseover", function () {
    movieElements[index].classList.add("checked");
  });

  checkButton.addEventListener("mouseout", function () {
    movieElements[index].classList.remove("checked");
  });

  checkButton.addEventListener("click", function () {
    // Remove the corresponding movieElement
    movieElements[index].remove();

    // Get the title of the movie
    let movieTitle = movieTitles[index].innerText;

    // Make a fetch request to the PHP file
    var xhr = new XMLHttpRequest();
    xhr.open("POST", './php/delete.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
    } else if (xhr.readyState == 4 && xhr.status != 200) {
        console.error("Error: " + xhr.status);
    }
  }
  xhr.send(`titolo=${encodeURIComponent(movieTitle)}`);
  });
});





});

async function getMovies(){
  return new Promise((resolve, reject) => {
    let zonaDinamica = document.getElementById('zonaDinamica');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", './php/watchlist.php', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        if (data.length === 0) {
          // Create div
          let div = document.createElement('div');
          div.className = 'no-movies';

          // Create h1
          let h1 = document.createElement('h1');
          h1.textContent = 'Nessun film nella Watchlist';
          div.appendChild(h1);

          // Create h3
          let h3 = document.createElement('h3');
          h3.textContent = 'Vai al quiz e trovane di nuovi!';
          div.appendChild(h3);

          // Create a
          let a = document.createElement('a');
          a.href = '../Quiz/index.php';

          // Create button
          let button = document.createElement('button');
          button.className = 'to-quiz';
          button.textContent = 'Vai al quiz';
          a.appendChild(button);

          div.appendChild(a);

          // Append to body or other element
          zonaDinamica.appendChild(div);
        }
        console.log(data);
        data.forEach(movie => {
          let movieElement = document.createElement('div');
          movieElement.className = 'movie-element';
          
          let line1 = document.createElement('div');
          line1.className = 'line';
          line1.id = 'upperLine';
          
          let movieDetails = document.createElement('div');
          movieDetails.className = 'movie-details';
          
          let text = document.createElement('div');
          text.className = 'text';
          
          let titolo = document.createElement('div');
          titolo.className = 'titolo';
          
          let h1 = document.createElement('h1');
          h1.innerText = movie.titolo;
          
          let button = document.createElement('button');
          button.className = 'check-button';
          
          let i = document.createElement('i');
          i.className = 'fa-regular fa-circle-check';
          
          button.appendChild(i);
          titolo.appendChild(h1);
          titolo.appendChild(button);
          
          let p = document.createElement('p');
          p.innerText = movie.trama;
          
          text.appendChild(titolo);
          text.appendChild(p);
          
          let img = document.createElement('img');
          img.src = movie.copertina;
          img.alt = 'cover';
          img.className = 'cover';
          
          movieDetails.appendChild(text);
          movieDetails.appendChild(img);
          
          let line2 = document.createElement('div');
          line2.className = 'line';
          line2.id = 'bottomLine';
          
          movieElement.appendChild(line1);
          movieElement.appendChild(movieDetails);
          movieElement.appendChild(line2);
          
          zonaDinamica.appendChild(movieElement);
        });
        resolve();
    } else if (xhr.readyState == 4 && xhr.status != 200) {
        console.error("Error: " + xhr.status);
        reject();
    }
  }
  xhr.send();

});

}
