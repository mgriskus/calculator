const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".button-container");

let num1 = undefined,
  operator = "",
  num2 = undefined,
  result = undefined,
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
  }
}

function partialReset() {
  num1 = undefined;
  operator = "";
  num2 = undefined;
  display.textContent = "";
}

buttonContainer.addEventListener("mouseup", (e) => {
  let buttonClicked = e.target.textContent;
  if (buttonClicked == "AC") {
    partialReset();
    result = undefined;
  } else if (
    (buttonClicked == "+" || buttonClicked == "-") &&
    !display.textContent
  ) {
    display.textContent += buttonClicked;
  } else if (buttonClicked == ".") {
    if (!isPointInNum) {
      display.textContent += ".";
      isPointInNum = true;
    }
  } else if (!isNaN(buttonClicked)) {
    if (!isNaN(result) || isNaN(display.textContent + 1)) {
      display.textContent = "";
      num1 = undefined;
    }
    display.textContent += buttonClicked;
  } else if (display.textContent) {
    if (num1 !== undefined) {
      num2 = +display.textContent;
      isPointInNum = false;
      result = operate(num1, operator, num2);
      if (result != "Division by 0 is impossible") {
        result = Math.round(result * 100) / 100;
      } else {
        display.textContent = "Division by 0 is impossible";
      }
      if (buttonClicked == "=") {
        partialReset();
        display.textContent = result;
      } else {
        current = "";
        num1 = result;
      }
    } else {
      result = undefined;
      if (buttonClicked == "=" || isNaN(display.textContent)) {
        return;
      }
      num1 = +display.textContent;
      isPointInNum = false;
      operator = buttonClicked;
      display.textContent = "";
    }
  }
});
