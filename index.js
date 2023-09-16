const buttons = document.querySelectorAll(".btn");
const display = document.getElementById("display");
const toolTip = document.querySelector(".tooltip");

const operators = ["+", "-", "*", "/", "%", "^"];

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

const alterBgcDisplay = (expression) => {
  const expressionArray = expression.split("");
  let countOperators = 0;

  for (let e of expressionArray) 
    if (operators.includes(e)) 
      countOperators++;

  if (countOperators > 1) 
    display.style.backgroundColor = "#8ea063";
  else 
    display.style.backgroundColor = "#bccd95";
};

const insert = (textContent) => {
  const expression = display.value + textContent;
  const add = isCheckForAdd(expression);

  if (add) {
    display.value = expression;
    alterBgcDisplay(expression);
  }
};

const isCheckForAdd = (expression) => {
  const firstChar = expression.charAt(0);
  const penultimateChar = expression.charAt(expression.length - 2);
  const lastChar = expression.charAt(expression.length - 1);
  const dot = ".";
  const operatorsFiltred =
    operators.filter((op) => {
     return op != "+" && op != "-";
    });

  const isDotInvalid =
    firstChar == dot || (penultimateChar == dot && lastChar == dot);

  const isOperatorInvalid =
    operatorsFiltred.includes(firstChar) ||
    (operators.includes(penultimateChar) && operators.includes(lastChar));

  const isDotAndOperatorInvalid =
    (operators.includes(penultimateChar) && lastChar == dot) ||
    (penultimateChar == dot && operators.includes(lastChar));

  if (isDotInvalid) return false;

  if (isOperatorInvalid) return false;

  if (isDotAndOperatorInvalid) return false;

  return true;
};

const isCheckForCalc = (expression) => {
  const isDividerInvalid = expression.includes("/0");

  if (isDividerInvalid) return false;

  return true;
};

const cleanAll = () => {
  display.value = "";
  display.style.backgroundColor = "#bccd95";
};

const cleanOne = () => {
  const expression = display.value;
  const expressionDecremented = expression.slice(0, -1);

  display.value = expressionDecremented;

  alterBgcDisplay(expressionDecremented);
};

const calc = () => {
  const expression = display.value;
  let result;

  if (expression) {
    const isCalculate = isCheckForCalc(expression);

    if (isCalculate) {
      result = eval(expression);
      display.value = result;
      alterBgcDisplay(result.toString());
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
  }, 3000);
};

const hideTooltip = () => {
  toolTip.classList.remove("slide-show");
  toolTip.classList.add("slide-hide");
};

const btnPrees = () => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("btn-prees");
      setTimeout(() => {
        button.classList.remove("btn-prees");
      }, 100);
    });
  });
};
