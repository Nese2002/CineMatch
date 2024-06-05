document.addEventListener("DOMContentLoaded", function () {
  var minInput = document.getElementById("minNumberInput");
  var maxInput = document.getElementById("maxNumberInput");


  
  minInput.addEventListener("blur", ()=>{
    if (minInput.value < 1950 || minInput.value === "") {
      minInput.value = 1950;
    }
    else if (minInput.value > 2024 || minInput.value === "") {
      minInput.value = 2024;
    }
    else if (minInput.value !== "" &&  minInput.value > maxInput.value) {
      maxInput.value = minInput.value;
    }
  });


  maxInput.addEventListener("blur", ()=>{
    if (maxInput.value < 1950 || maxInput.value === "") {
      maxInput.value = 1950;
    }
    else if (maxInput.value > 2024 || maxInput.value === "") {
      maxInput.value = 2024;
    }
    else  if (maxInput.value !== "" && maxInput.value < minInput.value) {
      minInput.value = maxInput.value;
    }
  });


  minInput.addEventListener("keydown", (event)=>{
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur();
    }
  });
  maxInput.addEventListener("keydown", (event)=>{
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur();
    }
  });
});