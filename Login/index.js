document.addEventListener("DOMContentLoaded", function () {
  let switchButton = document.getElementById("switchButton");
  let loginPage = document.getElementById("loginPage");
  let filmText = document.querySelector(".film-text");
  let signupText = document.querySelector(".signup-text");
  let switchButtonMobile = document.getElementsByClassName("switch-mode");
  let signupSection = document.getElementById("signupSection");
  let loginSection = document.getElementById("loginSection");


  for (let i = 0; i < switchButtonMobile.length; i++) {
    switchButtonMobile[i].addEventListener("click", function () {
      const signupSection = document.getElementById('signupSection');
      const loginSection = document.getElementById('loginSection');
    
      if (signupSection.style.display === 'none' || signupSection.style.display === '') {
        signupSection.style.display = 'block';
        loginSection.style.display = 'none';
      } else {
        signupSection.style.display = 'none';
        loginSection.style.display = 'block';
      }
    });
  }


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
  let loginForm = document.getElementById("loginForm");
  let loginUsername = document.forms["login"]["username"];
  let loginUsernameLabel = document.getElementById("login-username-text");
  let loginPassword = document.forms["login"]["password"];
  let loginPasswordLabel = document.getElementById("login-password-text");
  let loginMessage = document.getElementById("loginMessage");

  loginForm.addEventListener("submit", function (event) {
    let username = loginUsername.value;
    let password = loginPassword.value;

    event.preventDefault(); // Prevent the form from submitting normally

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/login.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        if (this.responseText.includes("success")) {
          window.location.href = "../Quiz/index.php";
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
  let signupForm = document.getElementById("signupForm");
  let signupUsername = document.forms["signup"]["username"];
  let signupUsernameLabel = document.getElementById("signup-username-text");
  let signupPassword = document.forms["signup"]["password"];
  let signupPasswordLabel = document.getElementById("signup-password-text");
  let signupMessage = document.getElementById("signupMessage");

  signupForm.addEventListener("submit", function (event) {
    let username = signupUsername.value;
    let password = signupPassword.value;

    event.preventDefault(); // Prevent the form from submitting normally

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/signup.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        if (this.responseText.includes("success")) {
          signupMessage.classList.add("success");
          signupMessage.innerText = "Registazione avvenuta con successo...";
          setTimeout(function () {
            window.location.href = "../Quiz/index.php";
          }, 1500);

          console.log("Signup successful");
        } else if (this.responseText.includes("username-error")) {
          console.log("Signup failed: " + this.responseText);
          signupMessage.classList.add("error");
          signupMessage.innerText = "Username già in uso";
        } else {
          console.log("Signup failed: " + this.responseText);
          signupMessage.classList.add("error");
          signupMessage.innerText =
            "Inserire una password di almeno 6 caratteri";
        }
      }
    };
    xhr.send(
      "username=" +
        encodeURIComponent(username) +
        "&password=" +
        encodeURIComponent(password)
    );

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
//   let username = document.forms["login"]["username"];
//   let password = document.forms["login"]["password"];
//   let message = document.getElementById("loginMessage");

//   if (username.value === "" || password.value === "") {
//     message.classList.add("error");
//     return false;
//   }
//   return true;
// }

// function validateSignupForm() {
//   let username = document.forms["signup"]["username"];
//   let password = document.forms["signup"]["password"];
//   let message = document.getElementById("signupMessage");

//   if (username.value === "" || password.value === "") {
//     message.classList.add("error");
//     return false;
//   }
//   return true;
// }
