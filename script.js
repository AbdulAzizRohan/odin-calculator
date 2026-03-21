let num1, num2, operator;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function division(num1, num2) {
  return num1 / num2;
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
      return division(num1, num2);

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

  let num = +displayValue.textContent;

  numBtnArray.forEach((btn) => {
    btn.addEventListener("click", () => {
      num = num * 10 + +btn.textContent;
      displayValue.textContent = "";
      displayValue.textContent = num;
    });
  });

  const addBtn = document.querySelector("#add");
  const subtractBtn = document.querySelector("#subtract");
  const multiplyBtn = document.querySelector("#multiply");
  const divisionBtn = document.querySelector("#division");

  let operatorBtnArray = [addBtn, subtractBtn, multiplyBtn, divisionBtn];

  const deleteBtn = document.querySelector("#delete");

  deleteBtn.addEventListener("click", () => {
    num = Math.floor(num / 10);
    displayValue.textContent = "";
    displayValue.textContent = num;
  });
}

getUserInput();
