var minInput = document.getElementById("minNumberInput");
var maxInput = document.getElementById("maxNumberInput");

function handleMinInput() {
  if (minInput.value > maxInput.value) {
    maxInput.value = minInput.value;
  }
}

function handleMaxInput() {
  if (maxInput.value < minInput.value) {
    minInput.value = maxInput.value;
  }
}

minInput.addEventListener("input", handleMinInput);
maxInput.addEventListener("input", handleMaxInput);
