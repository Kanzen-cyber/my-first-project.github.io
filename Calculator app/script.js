const buttons = document.querySelectorAll("button");
const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");

let expression = "";
let openBracket = true;

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    const value = btn.textContent;

    if (action === "number" || action === "decimal") {
      expression += value;
    } else if (action === "clear") {
      expression = "";
      resultDisplay.textContent = "";
    } else if (action === "backspace") {
      expression = expression.slice(0, -1);
    } else if (action === "brackets") {
      expression += openBracket ? "(" : ")";
      openBracket = !openBracket;
    } else if (action === "add") {
      expression += "+";
    } else if (action === "subtract") {
      expression += "-";
    } else if (action === "multiply") {
      expression += "*";
    } else if (action === "divide") {
      expression += "/";
    } else if (action === "percent") {
      const match = expression.match(/(\d+)(?!.*\d)/);
      if (match) {
        const percentValue = match[0];
        expression = expression.replace(/(\d+)(?!.*\d)/, percentValue / 100);
      }
    } else if (action === "equals") {
      try {
        const result = eval(expression);
        resultDisplay.textContent = result;
        expression = result.toString();
      } catch {
        resultDisplay.textContent = "Error";
      }
    }

    expressionDisplay.textContent = expression;
  });
});
