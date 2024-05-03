document.addEventListener("DOMContentLoaded", function () {
  var switchButton = document.getElementById("switchButton");
  var loginPage = document.getElementById("loginPage");
  var filmText = document.querySelector(".film-text");
  var signupText = document.querySelector(".signup-text");
  console.log("YEEaaa");
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
    var username = loginUsername.value;
    var password = loginPassword.value;

    event.preventDefault(); // Prevent the form from submitting normally

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php/login.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        if (this.responseText.includes("success")) {
          window.location.href = "../Quiz/index.html";
          console.log("Login successful");
        } else if (this.responseText.includes("username-error")) {
          console.log("Login failed: " + this.responseText);
          loginMessage.classList.add("error");
          loginMessage.innerText = "Username non trovato";
        } else {
          console.log("Login failed: " + this.responseText);
          loginMessage.classList.add("error");
          loginMessage.innerText = "Password errata";
        }
      }
    };
    xhr.send(
      "username=" +
        encodeURIComponent(username) +
        "&password=" +
        encodeURIComponent(password)
    );
    console.log("Username: " + username);
    console.log("Password: " + password);
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
    var username = signupUsername.value;
    var password = signupPassword.value;

    event.preventDefault(); // Prevent the form from submitting normally

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php/signup.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        if (this.responseText.includes("success")) {
          signupMessage.classList.add("success");
          signupMessage.innerText = "Registazione avvenuta con successo...";
          setTimeout(function () {
            window.location.href = "../Quiz/index.html";
          }, 3000);

          console.log("Signup successful");
        } else if (this.responseText.includes("username-error")) {
          console.log("Signup failed: " + this.responseText);
          signupMessage.classList.add("error");
          signupMessage.innerText = "Username già in uso";
        } else {
          console.log("Signup failed: " + this.responseText);
          signupMessage.classList.add("error");
          signupMessage.innerText =
            "Inserire una password di almeno 6caratteri";
        }
      }
    };
    xhr.send(
      "username=" +
        encodeURIComponent(username) +
        "&password=" +
        encodeURIComponent(password)
    );
    console.log("Username: " + username);
    console.log("Password: " + password);
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

// function validateLoginForm() {
//   var username = document.forms["login"]["username"];
//   var password = document.forms["login"]["password"];
//   var message = document.getElementById("loginMessage");

//   if (username.value === "" || password.value === "") {
//     message.classList.add("error");
//     return false;
//   }
//   return true;
// }

// function validateSignupForm() {
//   var username = document.forms["signup"]["username"];
//   var password = document.forms["signup"]["password"];
//   var message = document.getElementById("signupMessage");

//   if (username.value === "" || password.value === "") {
//     message.classList.add("error");
//     return false;
//   }
//   return true;
// }
