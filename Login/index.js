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

  //Login form
  var loginForm = document.getElementById("loginForm");
  var loginUsername = document.forms["login"]["username"];
  var loginUsernameLabel = document.getElementById("login-username-text");
  var loginPassword = document.forms["login"]["password"];
  var loginPasswordLabel = document.getElementById("login-password-text");
  var loginMessage = document.getElementById("loginMessage");

  loginForm.addEventListener("submit", function (event) {
    var usernameValue = loginUsername.value;
    var passwordValue = loginPassword.value;

    console.log("Username: " + usernameValue);
    console.log("Password: " + passwordValue);

    if (!validateLoginForm()) {
      event.preventDefault();
    }
  });

  loginForm.addEventListener("change", function (event) {
    if (loginMessage.classList.contains("error")) {
      loginMessage.classList.remove("error");
    }

    if (loginUsername.value !== "") {
      loginUsernameLabel.classList.add("valid");
      console.log("YEEEE");
    } else if (loginUsernameLabel.classList.contains("valid")) {
      loginUsernameLabel.classList.remove("valid");
    }

    if (loginPassword.value !== "") {
      loginPasswordLabel.classList.add("valid");
    } else if (loginPasswordLabel.classList.contains("valid")) {
      loginPasswordLabel.classList.remove("valid");
    }
  });

  //Signup form
  var signupForm = document.getElementById("signupForm");
  var signupUsername = document.forms["signup"]["username"];
  var signupUsernameLabel = document.getElementById("signup-username-text");
  var signupPassword = document.forms["signup"]["password"];
  var signupPasswordLabel = document.getElementById("signup-password-text");
  var signupMessage = document.getElementById("signupMessage");

  signupForm.addEventListener("submit", function (event) {
    var usernameValue = signupUsername.value;
    var passwordValue = signupPassword.value;

    if (!validateSignupForm()) {
      event.preventDefault();
    }
  });

  signupForm.addEventListener("change", function (event) {
    if (signupMessage.classList.contains("error")) {
      signupMessage.classList.remove("error");
    }

    if (signupUsername.value !== "") {
      signupUsernameLabel.classList.add("valid");
    } else if (signupUsernameLabel.classList.contains("valid")) {
      signupUsernameLabel.classList.remove("valid");
    }

    if (signupPassword.value !== "") {
      signupPasswordLabel.classList.add("valid");
    } else if (signupPasswordLabel.classList.contains("valid")) {
      signupPasswordLabel.classList.remove("valid");
    }
  });
});

function validateLoginForm() {
  var username = document.forms["login"]["username"];
  var password = document.forms["login"]["password"];
  var message = document.getElementById("loginMessage");

  if (username.value === "" || password.value === "") {
    message.classList.add("error");
    return false;
  }
  return true;
}

function validateSignupForm() {
  var username = document.forms["signup"]["username"];
  var password = document.forms["signup"]["password"];
  var message = document.getElementById("signupMessage");

  if (username.value === "" || password.value === "") {
    message.classList.add("error");
    return false;
  }
  return true;
}
