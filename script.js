const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".button-container");

let num1 = 0,
  operator = "+",
  num2,
  isPreviousNum = false,
  isPointInNum = false;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(num1, operator, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      if (num2 == 0) return "Division by 0 is impossible";
      return divide(num1, num2);
    case "=":
      return num1;
  }
}

function partialReset() {
  num1 = 0;
  operator = "+";
  num2 = undefined;
  display.textContent = "";
}

function handleCalculator(buttonClicked) {
  if (!isNaN(buttonClicked)) {
    if (isPreviousNum) {
      isPreviousNum = false;
      display.textContent = "";
    }
    display.textContent += buttonClicked;
  } else if (buttonClicked == "AC") {
    partialReset();
  } else if (isNaN(display.textContent)) {
    return;
  } else if (buttonClicked == "DEL" && !isNaN(display.textContent)) {
    display.textContent = display.textContent.substring(
      0,
      display.textContent.length - 1
    );
  } else if (
    (buttonClicked == "+" || buttonClicked == "-") &&
    !display.textContent
  ) {
    display.textContent += buttonClicked;
  } else if (buttonClicked == "." && !isNaN(display.textContent)) {
    if (!isPointInNum) {
      display.textContent += ".";
      isPointInNum = true;
    }
  } else if (!isNaN(display.textContent)) {
    num2 = +display.textContent;
    let result = operate(num1, operator, num2);
    if (result != "Division by 0 is impossible") {
      result = Math.round(result * 100) / 100;
    } else {
      display.textContent = "Division by 0 is impossible";
    }
    num1 = display.textContent = result;
    operator = buttonClicked;
    isPreviousNum = true;
  }
}

buttonContainer.addEventListener("mouseup", (e) => {
  handleCalculator(e.target.textContent);
});

document.addEventListener("keydown", (e) => {
  if (+e.key >= 0 && +e.key <= 9) handleCalculator(e.key);
  switch (e.key) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      e.preventDefault();
      handleCalculator(e.key);
      break;
    case "Backspace":
      handleCalculator("DEL");
      break;
    case "Delete":
      handleCalculator("AC");
      break;
  }
});
