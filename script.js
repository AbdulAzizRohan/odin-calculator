let num1, num2, operator;

function add(num1, num2) {
  return +(num1 + num2).toFixed(8);
}

function subtract(num1, num2) {
  return +(num1 - num2).toFixed(8);
}

function multiply(num1, num2) {
  return +(num1 * num2).toFixed(8);
}

function divide(num1, num2) {
  return +(num1 / num2).toFixed(8);
}

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return add(num1, num2);

    case "-":
      return subtract(num1, num2);

    case "*":
      return multiply(num1, num2);

    case "/":
      return num2 === 0 ? "Math ERROR" : divide(num1, num2);

    default:
      break;
  }
}

function getUserInput() {
  const zeroBtn = document.querySelector("#zero");
  const oneBtn = document.querySelector("#one");
  const twoBtn = document.querySelector("#two");
  const threeBtn = document.querySelector("#three");
  const fourBtn = document.querySelector("#four");
  const fiveBtn = document.querySelector("#five");
  const sixBtn = document.querySelector("#six");
  const sevenBtn = document.querySelector("#seven");
  const eightBtn = document.querySelector("#eight");
  const nineBtn = document.querySelector("#nine");

  let numBtnArray = [
    zeroBtn,
    oneBtn,
    twoBtn,
    threeBtn,
    fourBtn,
    fiveBtn,
    sixBtn,
    sevenBtn,
    eightBtn,
    nineBtn,
  ];

  const displayValue = document.querySelector("#display");

  numBtnArray.forEach((btn) => {
    btn.addEventListener("click", () => {
      // when new number is being given input after any operator
      if (isOperatorBtnPressed) {
        displayValue.textContent = "";
      }

      if (isEqualBtnPressed) {
        displayValue.textContent = "";
        num1 = 0;
        num2 = null;
      }

      if (displayValue.textContent === "0") {
        displayValue.textContent = `${btn.textContent}`;
      } else {
        displayValue.textContent = `${displayValue.textContent}${btn.textContent}`;
      }

      num2 = +displayValue.textContent;

      isOperatorBtnPressed = false;
      isEqualBtnPressed = false;
    });
  });

  const plusMinusBTn = document.querySelector("#plus-minus");

  plusMinusBTn.addEventListener("click", () => {
    if (displayValue.textContent.includes("-")) {
      displayValue.textContent = displayValue.textContent.slice(1);
    } else {
      displayValue.textContent = `-${displayValue.textContent}`;
    }

    num2 = +displayValue.textContent;
  });

  const addBtn = document.querySelector("#add");
  const subtractBtn = document.querySelector("#subtract");
  const multiplyBtn = document.querySelector("#multiply");
  const divideBtn = document.querySelector("#divide");

  let operatorBtnArray = [addBtn, subtractBtn, multiplyBtn, divideBtn];

  let num1 = 0;
  let num2 = null;
  let operatorArray = ["+", "-", "*", "/"];
  let previousOperator = operatorArray[0];

  // tracking for updating display after the operator button is pressed
  let isOperatorBtnPressed = false;

  for (let index = 0; index < operatorBtnArray.length; index++) {
    operatorBtnArray[index].addEventListener("click", () => {
      if (isEqualBtnPressed) {
        num1 = +displayValue.textContent;
        num2 = null;
        isEqualBtnPressed = false;
      }

      if (num2 !== null) {
        num1 = operate(num1, num2, previousOperator);
        num2 = null;

        displayValue.textContent = +toFixedScientific(num1.toString());
        previousOperator = operatorArray[index];
      } else if (num2 === null) {
        previousOperator = operatorArray[index];
      }

      isOperatorBtnPressed = true;
      isFirstOperation = false;
    });
  }

  const equalBtn = document.querySelector("#equal");

  let isEqualBtnPressed = false;

  equalBtn.addEventListener("click", () => {
    // handling the situation when an operator is pressed immediately after a number
    if (isOperatorBtnPressed) {
      num2 = num1;
      isOperatorBtnPressed = false;
    }

    if (!isFirstOperation) {
      // storing num2 to use when "=" is pressed again
      let temp = num2;
      num1 = operate(num1, num2, previousOperator);
      num2 = temp;

      isEqualBtnPressed = true;
      displayValue.textContent = +toFixedScientific(num1.toString());
    }
  });

  const deleteBtn = document.querySelector("#delete");

  deleteBtn.addEventListener("click", () => {
    displayValue.textContent = displayValue.textContent.slice(0, -1);
  });

  const ceBtn = document.querySelector("#CE");

  ceBtn.addEventListener("click", () => {
    displayValue.textContent = "";
    displayValue.textContent = "0";
  });

  const acBtn = document.querySelector("#AC");
  let isFirstOperation = true;

  acBtn.addEventListener("click", () => {
    num1 = 0;
    num2 = null;
    previousOperator = operatorArray[0];
    displayValue.textContent = "";
    displayValue.textContent = "0";

    isEqualBtnPressed = false;
    isOperatorBtnPressed = false;
    isFirstOperation = true;
  });

  const decimalBtn = document.querySelector("#decimal");

  decimalBtn.addEventListener("click", () => {
    if (isOperatorBtnPressed) {
      displayValue.textContent = "0.";
      isOperatorBtnPressed = false;
    } else if (isEqualBtnPressed) {
      displayValue.textContent = "0.";
      num1 = 0;
      num2 = null;
      isEqualBtnPressed = false;
    } else if (!displayValue.textContent.includes(".")) {
      displayValue.textContent = `${displayValue.textContent}.`;
    }
  });

  function toFixedScientific(numString) {
    if (
      numString.includes("e") &&
      numString.includes(".") &&
      numString.indexOf("e") - numString.indexOf(".") - 1 > 8
    ) {
      numString =
        numString.slice(0, numString.indexOf(".") + 8) +
        numString.slice(numString.indexOf("e"));
    }

    return numString;
  }

  document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
      // when new number is being given input after any operator
      if (isOperatorBtnPressed) {
        displayValue.textContent = "";
      }

      if (isEqualBtnPressed) {
        displayValue.textContent = "";
        num1 = 0;
        num2 = null;
      }

      if (displayValue.textContent === "0") {
        displayValue.textContent = `${e.key}`;
      } else {
        displayValue.textContent = `${displayValue.textContent}${e.key}`;
      }

      num2 = +displayValue.textContent;

      isOperatorBtnPressed = false;
      isEqualBtnPressed = false;
    } else if (
      e.key === "+" ||
      e.key === "-" ||
      e.key === "*" ||
      e.key === "/"
    ) {
      if (isEqualBtnPressed) {
        num1 = +displayValue.textContent;
        num2 = null;
        isEqualBtnPressed = false;
      }

      if (num2 !== null) {
        num1 = operate(num1, num2, previousOperator);
        num2 = null;

        displayValue.textContent = +toFixedScientific(num1.toString());
        previousOperator = e.key;
      } else if (num2 === null) {
        previousOperator = e.key;
      }

      isOperatorBtnPressed = true;
      isFirstOperation = false;
    } else if (e.key === ".") {
      if (isOperatorBtnPressed) {
        displayValue.textContent = "0.";
        isOperatorBtnPressed = false;
      } else if (isEqualBtnPressed) {
        displayValue.textContent = "0.";
        num1 = 0;
        num2 = null;
        isEqualBtnPressed = false;
      } else if (!displayValue.textContent.includes(".")) {
        displayValue.textContent = `${displayValue.textContent}.`;
      }
    } else if (e.key === "=" || e.key === "Enter") {
      // handling the situation when an operator is pressed immediately after a number
      if (isOperatorBtnPressed) {
        num2 = num1;
        isOperatorBtnPressed = false;
      }

      if (!isFirstOperation) {
        // storing num2 to use when "=" is pressed again
        let temp = num2;
        num1 = operate(num1, num2, previousOperator);
        num2 = temp;

        isEqualBtnPressed = true;
        displayValue.textContent = +toFixedScientific(num1.toString());
      }
    } else if (e.key === "Backspace") {
      displayValue.textContent = displayValue.textContent.slice(0, -1);
    }
  });
}

getUserInput();
