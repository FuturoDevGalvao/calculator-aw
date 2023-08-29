const buttons = document.querySelectorAll(".btn");
const display = document.getElementById("display");

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
    /* posterior ativação do aviso por tooltip */
  }
}
