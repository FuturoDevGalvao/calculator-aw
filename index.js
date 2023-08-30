const buttons = document.querySelectorAll(".btn");
const display = document.getElementById("display");
const toolTip = document.querySelector(".tooltip");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
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
  const buttonsnNotAllowed = ["C", "="];

  if (!buttonsnNotAllowed.includes(textContent)) {
    display.value += textContent;
  }
}

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
