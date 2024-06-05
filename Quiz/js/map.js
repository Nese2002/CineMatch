document.addEventListener("DOMContentLoaded", function () {
async function fetchData() {
  const response = await fetch("./jsonFiles/iso.json");
  const data = await response.json();
  return data;
}

// Populate the list of countries
function populateList() {
let zonaDinamica = document.getElementById("zonaPaese");
 fetchData().then(data => {
        data.forEach(item => {
          let label = document.createElement("label");
  let input = document.createElement("input");
  let span = document.createElement("span");
    label.setAttribute("class", "checkbox-container");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", item.iso_3166_1);
    input.setAttribute("name", item.language);
    span.setAttribute("class", "map-text");
    span.textContent = item.native_name;

     label.appendChild(input);
     label.appendChild(span);
       zonaDinamica.appendChild(label);
        });
    });
}
window.onload = populateList;

let textInput = document.querySelector("#mapSearch");

// Filter the list of countries
textInput.addEventListener("input", function () {
  let searchText = textInput.value;
  let spans = document.querySelectorAll("#zonaPaese span");
  for (let span of spans) {
    var text = span.innerHTML.toLowerCase();

    if (text.includes(searchText.toLowerCase())) {
      span.parentElement.style.display = "";
    } else {
      span.parentElement.style.display = "none";
    }
  }
});

let form = document.getElementById("paese");
  var width = window.innerWidth <= 1024 ? window.innerWidth / 1.1: window.innerWidth / 2.5;
    height = window.innerWidth <= 1024 ? window.innerHeight / 3 : window.innerHeight / 2.3;

  // Create the map
  var projection = d3
    .geoMercator()
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height / 1.5]);

  var path = d3.geoPath().projection(projection);

  var svg = d3.select("#map").attr("width", width).attr("height", height);

  var zoom = d3.zoom().scaleExtent([0.5, 20]).on("zoom", zoomed);

  svg.call(zoom);

  function zoomed() {
    svg
      .selectAll("path") // To prevent stroke width from scaling
      .attr("transform", d3.event.transform);
  }

  // Load the map from the json file
  d3.json("./jsonFiles/country.json")
    .then(function (world) {

      svg
        .selectAll("path")
        .data(world.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#042608")
        .attr("stroke", "#0FD91D")
        .on("mouseover", function (d) {
          d3.select(this).attr("fill", "#0FD91D");
        })
        .on("mouseout", function (d) {
          let checkbox = document.getElementById(d.id);
          if (checkbox && checkbox.checked) {
            d3.select(this).attr("fill", "#0FD91D");
          } else {
            d3.select(this).attr("fill", "#042608"); 
          }
        })
        .on("click", function (d) {
          let checkbox = document.getElementById(d.id);
          if (checkbox && !checkbox.checked) {
            checkbox.checked = true;
            let event = new Event("change");
            form.dispatchEvent(event);
            d3.select(this).attr("fill", "#0FD91D");
          }
          else {
            checkbox.checked = false;
            let event = new Event("change");
            form.dispatchEvent(event);
            d3.select(this).attr("fill", "#042608");
          }
        });

        setInterval(function () {
          svg.selectAll("path").each(function (d) {
            let checkbox = document.getElementById(d.id);
            if (checkbox && checkbox.checked) {
              d3.select(this).attr("fill", "#0FD91D");
            } else {
              d3.select(this).attr("fill", "#042608");
            }
          });
        }, 1000);
    })
    .catch(function (error) {
      console.log(error);
    });
});
