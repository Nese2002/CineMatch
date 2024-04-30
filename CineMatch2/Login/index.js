document.addEventListener("DOMContentLoaded", function () {
  var switchButton = document.getElementById("switchButton");
  var loginPage = document.getElementById("loginPage");
  var filmText = document.querySelector(".film-text");
  var signupText = document.querySelector(".signup-text");

  switchButton.addEventListener("click", function () {
    if (loginPage.style.left === "0px") {
      loginPage.style.left = "50%";
      loginPage.style.borderRadius = "0 20px 20px 0";
      filmText.innerText = "TROVA IL FILM GIUSTO PER LA TUA SERATA";
      signupText.innerText = "Signup";
    } else {
      loginPage.style.left = "0";
      loginPage.style.borderRadius = "20px 0 0 20px";
      filmText.innerText = "HAI GIA' UN ACCOUNT?";
      signupText.innerText = "Login";
    }
  });

  // Login form
  var loginForm = document.getElementById("loginForm");
  var loginUsername = document.forms["login"]["username"];
  var loginPassword = document.forms["login"]["password"];
  var loginMessage = document.getElementById("loginMessage");

  loginForm.addEventListener("submit", function (event) {
    var usernameValue = loginUsername.value;
    var passwordValue = loginPassword.value;

    if (!validateLoginForm()) {
      event.preventDefault(); // Prevent default form submission if validation fails
    }
  });

  loginForm.addEventListener("change", function () {
    validateLoginForm();
  });

  // Signup form
  var signupForm = document.getElementById("signupForm");
  var signupUsername = document.forms["signup"]["username"];
  var signupPassword = document.forms["signup"]["password"];
  var signupMessage = document.getElementById("signupMessage");

  signupForm.addEventListener("submit", function (event) {
    var usernameValue = signupUsername.value;
    var passwordValue = signupPassword.value;

    if (!validateSignupForm()) {
      event.preventDefault(); // Prevent default form submission if validation fails
    }
  });

  signupForm.addEventListener("change", function () {
    validateSignupForm();
  });

  function validateLoginForm() {
    var message = document.getElementById("loginMessage");

    if (loginUsername.value === "" || loginPassword.value === "") {
      message.classList.add("error");
      return false; // Return false if validation fails
    } else {
      message.classList.remove("error");
      return true; // Return true if validation succeeds
    }
  }

  function validateSignupForm() {
    var message = document.getElementById("signupMessage");

    if (signupUsername.value === "" || signupPassword.value === "") {
      message.classList.add("error");
      return false; // Return false if validation fails
    } else {
      message.classList.remove("error");
      return true; // Return true if validation succeeds
    }
  }
});
