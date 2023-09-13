const buttons = document.querySelectorAll(".btn");
const display = document.getElementById("display");
const toolTip = document.querySelector(".tooltip");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    btnPrees();
    const textContent = button.textContent;

    switch (textContent) {
      case "C":
        clean();
        break;

      case "=":
        calc();
        break;

      default:
        insert(textContent);
        break;
    }
  });
});

function insert(textContent) {
  const expression = display.value + textContent;
  const add = isCheckForAdd(expression.trim());

  console.log(add);

  if (add) {
    display.value += textContent;
  }
}

const isCheckForAdd = (expression) => {
  console.log("expression: " + expression);
  console.log("penultimate char: " + expression.charAt(expression.length - 2));
  console.log("last char: " + expression.charAt(expression.length - 1));

  const penultimateChar = expression.charAt(expression.length - 2);
  const lastChar = expression.charAt(expression.length - 1);
  const operators = ["+", "-", "*", "/"];
  const dot = ".";

  if (operators.includes(penultimateChar) && operators.includes(lastChar)) {
    return false;
  }

  return true;
};

const validate = (expression) => {};

function clean() {
  display.value = "";
}

function calc() {
  const expression = display.value;

  if (expression) {
    display.value = eval(expression);
  } else {
    showTooltip();
  }
}

function showTooltip() {
  const message = "campo vazio, impossível calcular.";
  toolTip.innerHTML = message;

  toolTip.classList.add("message");
  toolTip.classList.remove("slide-hide");
  toolTip.classList.add("slide-show");

  setTimeout(() => {
    hideTooltip();
  }, 2000);
}

function hideTooltip() {
  toolTip.classList.remove("slide-show");
  toolTip.classList.add("slide-hide");
}

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
