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

  let currentNumber = +displayValue.textContent;

  numBtnArray.forEach((btn) => {
    btn.addEventListener("click", () => {
      // when new number is being given input after any operator
      if (isOperatorBtnPressed || isEqualBtnPressed) {
        isOperatorBtnPressed = false;
        isEqualBtnPressed = false;
        currentNumber = 0;
      }

      currentNumber = currentNumber * 10 + +btn.textContent;
      displayValue.textContent = "";
      displayValue.textContent = currentNumber;
    });
  });

  const plusMinusBTn = document.querySelector("#plus-minus");

  plusMinusBTn.addEventListener("click", () => {
    currentNumber = -1 * currentNumber;
    displayValue.textContent = "";
    displayValue.textContent = currentNumber;
  });

  const addBtn = document.querySelector("#add");
  const subtractBtn = document.querySelector("#subtract");
  const multiplyBtn = document.querySelector("#multiply");
  const divideBtn = document.querySelector("#divide");

  let operatorBtnArray = [addBtn, subtractBtn, multiplyBtn, divideBtn];

  let num1 = 0;
  let num2 = 0;
  let operatorArray = ["+", "-", "*", "/"];
  let previousOperator = operatorArray[0];

  // calculation pseudocode:
  // n1 = 0, n2 = 0
  // if operator is clicked then:
  //   n2 = currentNumber
  //   n1 = operate(n1, n2, operator)

  // tracking for updating display after the operator button is pressed
  let isOperatorBtnPressed = false;

  for (let index = 0; index < operatorBtnArray.length; index++) {
    operatorBtnArray[index].addEventListener("click", () => {
      if (isEqualBtnPressed || isFirstOperation) {
        previousOperator = "+";
        num1 = 0;
        num2 = currentNumber;
        num1 = operate(num1, num2, previousOperator);
        isEqualBtnPressed = false;
        isFirstOperation = false;
      } else {
        num2 = currentNumber;
        num1 = operate(num1, num2, previousOperator);
      }

      previousOperator = operatorArray[index];
      isOperatorBtnPressed = true;
      displayValue.textContent = num1;
      currentNumber = num1;
    });
  }

  const equalBtn = document.querySelector("#equal");

  let isEqualBtnPressed = false;

  equalBtn.addEventListener("click", () => {
    num2 = currentNumber;
    num1 = operate(num1, num2, previousOperator);
    isEqualBtnPressed = true;
    displayValue.textContent = num1;
    currentNumber = num1;
    isFirstOperation = true;
  });

  const deleteBtn = document.querySelector("#delete");

  deleteBtn.addEventListener("click", () => {
    currentNumber = Math.floor(currentNumber / 10);
    displayValue.textContent = "";
    displayValue.textContent = currentNumber;
  });

  const ceBtn = document.querySelector("#CE");

  ceBtn.addEventListener("click", () => {
    currentNumber = 0;
    displayValue.textContent = "";
    displayValue.textContent = currentNumber;
  });

  const acBtn = document.querySelector("#AC");
  let isFirstOperation = false;

  acBtn.addEventListener("click", () => {
    currentNumber = 0;
    num1 = 0;
    num2 = 0;
    displayValue.textContent = "";
    displayValue.textContent = currentNumber;
    isEqualBtnPressed = false;
    isOperatorBtnPressed = false;
    isFirstOperation = true;
  });
}

getUserInput();
