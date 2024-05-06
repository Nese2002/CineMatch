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
  let query = "";

  for (let button of submitButtons) {
    // Add an event listener to each button
    button.addEventListener("click", function (event) {
      event.preventDefault();

      let form = button.form;
      switch (form.id) {
        case "genere":
          query += "&with_genres=";
          var checkboxes = form.querySelectorAll(
            'input[type="checkbox"]:checked'
          );
          for (let i = 0; i < checkboxes.length; i++) {
            let checkbox = checkboxes[i];
            if (i !== 0) {
              query += "%7C";
            }
            query += checkbox.id;
          }
          break;
        case "anno":
          let minNumber = form.querySelector(
            'input[id="minNumberInput"]'
          ).value;
          let maxNumber = form.querySelector(
            'input[id="maxNumberInput"]'
          ).value;
          query +=
            "&primary_release_date.gte=" +
            minNumber +
            "-01-01&primary_release_date.lte=" +
            maxNumber +
            "-12-31";
          break;

        case "paese":
          query += "&with_origin_country=";
          var checkboxes = form.querySelectorAll(
            'input[type="checkbox"]:checked'
          );
          for (let i = 0; i < checkboxes.length; i++) {
            let checkbox = checkboxes[i];
            if (i !== 0) {
              query += "%7C";
            }
            query += checkbox.id;
          }

          query += "&with_original_language=";
          for (let i = 0; i < checkboxes.length; i++) {
            let checkbox = checkboxes[i];
            if (i !== 0) {
              query += "%7C";
            }
            query += checkbox.name;
          }
          break;

        case "attori":
          query += "&with_people=";
          var checkboxes = form.querySelectorAll(
            'input[type="checkbox"]:checked'
          );
          for (let i = 0; i < checkboxes.length; i++) {
            let checkbox = checkboxes[i];
            if (i !== 0) {
              query += "%7C";
            }
            query += checkbox.id;
          }
          break;

        case "durata":
          let durata = form.querySelector('input[id="durataInput"]').value;
          query += "&with_runtime.lte=" + durata;
          break;

        case "provider":
          query += "&with_watch_providers=";
          var checkboxes = form.querySelectorAll(
            'input[type="checkbox"]:checked'
          );
          for (let i = 0; i < checkboxes.length; i++) {
            let checkbox = checkboxes[i];
            if (i !== 0) {
              query += "%7C";
            }
            query += checkbox.id;
          }
          break;
      }

      if (button.id === "submitFilters") {
        sections = sections.filter((section) =>
          visibleSections.includes(section)
        );
      }
      if (sections.length === 0) {
        sessionStorage.setItem("query", query);
        window.location.href = "../Match/index.html";
      } else {
        var nextSection = sections.shift();
        nextSection.classList.remove("hidden-section");
        nextSection.scrollIntoView({ behavior: "smooth" });

        switch (nextSection.id) {
          case "sectionGenere":
            getGenres();
            break;

          case "sectionCast":
            getPeople();
            break;
          case "sectionProvider":
            getProviders();
            break;
        }
      }

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

  //People Input
  let textInputPeople = document.querySelector("#searchAttori");
  textInputPeople.addEventListener("input", function () {
    let searchText = textInputPeople.value;
    let zonaAttori = document.querySelector("#zonaAttori");
    zonaAttori.innerHTML = "";
    getPeopleFromName(searchText);
    if (searchText === "") {
      getPeople();
    }
  });

  //Provider Input
  let textInputProvider = document.querySelector("#searchProvider");
  textInputProvider.addEventListener("input", function () {
    let searchText = textInputProvider.value;
    let labels = document.querySelectorAll("#zonaProvider label");

    for (let label of labels) {
      var text = label.id.toLowerCase();

      if (text.includes(searchText.toLowerCase())) {
        label.style.display = "";
      } else {
        label.style.display = "none";
      }
    }
  });
});
