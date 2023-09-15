const buttons = document.querySelectorAll(".btn");
const display = document.getElementById("display");
const toolTip = document.querySelector(".tooltip");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    btnPrees();
    performAction(button.textContent);
  });
});

const performAction = (textContent) => {
  switch (textContent) {
    case "<":
      cleanOne();
      break;

    case "C":
      cleanAll();
      break;

    case "=":
      calc();
      break;

    default:
      insert(textContent);
      break;
  }
};

const insert = (textContent) => {
  const expression = display.value + textContent;
  const add = isCheckForAdd(expression.trim());

  if (add) display.value += textContent;
};

const isCheckForAdd = (expression) => {
  const firstChar = expression.charAt(0);
  const penultimateChar = expression.charAt(expression.length - 2);
  const lastChar = expression.charAt(expression.length - 1);
  const operators = ["+", "-", "*", "/", "%", "^"];
  const dot = ".";

  const operatorsFiltred = operators.filter((op) => {
    return op != "+" && op != "-";
  });

  const isOperatorInvalid =
    operatorsFiltred.includes(firstChar) ||
    (operators.includes(penultimateChar) && operators.includes(lastChar));

  const isDotInvalid =
    firstChar == dot || (penultimateChar == dot && lastChar == dot);

  if (isOperatorInvalid) return false;

  if (isDotInvalid) return false;

  return true;
};

const isCheckForCalc = (expression) => {
  const isDividerInvalid = expression.includes("/0");

  if (isDividerInvalid) return false;

  return true;
};

const cleanAll = () => {
  display.value = "";
};

const cleanOne = () => {
  const expression = display.value;
  const expressionDecremented = expression.slice(0, -1);

  display.value = expressionDecremented;
};

const calc = () => {
  const expression = display.value;
  let result;

  if (expression) {
    const isCalculate = isCheckForCalc(expression);

    if (isCalculate) {
      result = eval(expression);
      display.value = result;
    } else {
      display.value = "";
      showTooltip("erro! impossíel dividir por zero.");
    }
  } else showTooltip("campo vazio, impossível calcular.");
};

const showTooltip = (message) => {
  toolTip.innerHTML = message;

  toolTip.classList.add("message");
  toolTip.classList.remove("slide-hide");
  toolTip.classList.add("slide-show");

  setTimeout(() => {
    hideTooltip();
  }, 2000);
};

const hideTooltip = () => {
  toolTip.classList.remove("slide-show");
  toolTip.classList.add("slide-hide");
};

function btnPrees() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("btn-prees");
      setTimeout(() => {
        button.classList.remove("btn-prees");
      }, 100);
    });
  });
}
