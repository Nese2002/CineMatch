import { getGenres } from "../api_request/apiRequest.js";

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
document.addEventListener("DOMContentLoaded", function () {
  var sections = Array.from(document.getElementsByClassName("hidden-section"));
  var visibleSections = [];
  var formFilters = document.forms["filters"];
  let allForms = Array.from(document.getElementsByTagName("form"));
  let quizForms = allForms.filter((form) => form.id !== "filters");
  let submitButtons = document.querySelectorAll('button[type="submit"]');

  for (let button of submitButtons) {
    // Add an event listener to each button
    button.addEventListener("click", function (event) {
      event.preventDefault();
      if (button.id === "submitFilters") {
        sections = sections.filter((section) =>
          visibleSections.includes(section)
        );
      }

      var nextSection = sections.shift();
      nextSection.classList.remove("hidden-section");
      nextSection.scrollIntoView({ behavior: "smooth" });

      switch (nextSection.id) {
        case "sectionGenere":
          getGenres();
          break;
        // case "sectionPaese":
        //   getPaese();
        //   break;
        case "sectionCast":
          getCast();
          break;
        case "sectionProvider":
          getProviders();
          break;
      }

      // let genresCheckbox = formFilters.querySelector('input[id="Genere"]');
      // if (genresCheckbox.checked) {
      //   //switch on "input[id]"" to get the right api request
      //   getGenres();
      // }

      formFilters.reset();
    });
  }
  let submitFilters = document.getElementById("submitFilters");
  submitFilters.disabled = true;

  formFilters.addEventListener("change", function (e) {
    var section = document.getElementById("section" + e.target.id);

    if (e.target.checked) {
      visibleSections.push(section);

      submitFilters.disabled = false;
    } else {
      visibleSections = visibleSections.filter((s) => s !== section);

      let checkboxes = formFilters.querySelectorAll('input[type="checkbox"]');
      let isAnyCheckboxChecked = Array.from(checkboxes).some(
        (checkbox) => checkbox.checked
      );
      submitFilters.disabled = !isAnyCheckboxChecked;
    }
  });

  for (let form of quizForms) {
    form.addEventListener("change", function (e) {
      var submit = form.querySelector(".checkbox");
      if (e.target.checked) {
        submit.disabled = false;
      } else {
        let checkboxes = form.querySelectorAll('input[type="checkbox"]');
        let isAnyCheckboxChecked = Array.from(checkboxes).some(
          (checkbox) => checkbox.checked
        );
        submit.disabled = !isAnyCheckboxChecked;
      }
    });
  }

  //Genre Input
  let textInput = document.querySelector('input[type="text"]');
  textInput.addEventListener("input", function () {
    let searchText = textInput.value;
    let spans = document.querySelectorAll("#zonaGenere span");

    for (let span of spans) {
      var text = span.innerHTML.toLowerCase();

      if (text.includes(searchText.toLowerCase())) {
        span.parentElement.style.display = "";
      } else {
        span.parentElement.style.display = "none";
      }
    }
  });
});
