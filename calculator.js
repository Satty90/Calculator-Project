let outcome = "0";
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector(".screen");

const reRender = () => {
  screen.innerText = outcome;
};

const mathOperation = (initOutcome) => {
  if (previousOperator === "➗") {
    runningTotal /= initOutcome;
  } else if (previousOperator === "✖️") {
    runningTotal *= initOutcome;
  } else if (previousOperator === "➖") {
    runningTotal -= initOutcome;
  } else if (previousOperator === "➕") {
    runningTotal += initOutcome;
  }
};

const handleNumber = (number) => {
  if (outcome === "0") {
    outcome = number;
  } else {
    outcome += number;
    // outcome = outcome + number
  }
};

const handleMath = (value) => {
  if (outcome === "0") {
    //do nothing
    return;
  } else {
    const initOutcome = parseInt(outcome);
    if (runningTotal === 0) {
      runningTotal = initOutcome;
    } else {
      mathOperation(initOutcome);
    }
    previousOperator = value;
    outcome = "0";
  }
};

const initOutcome = parseInt(outcome);
if (runningTotal === 0) {
  runningTotal = initOutcome;
} else {
  mathOperation(initOutcome);
}

const handleSymbol = (symbol) => {
  switch (symbol) {
    case "C":
      outcome = "0";
      break;
    case "🔙":
      if (outcome.length === 1) {
        outcome = "0";
      } else {
        outcome = outcome.substring(0, outcome.length - 1);
      }
      break;
    case "➗":
    case "✖️":
    case "➖":
    case "➕":
      handleMath(symbol);
      break;
    case "🟰":
      if (previousOperator === null) {
        return;
      } else {
        mathOperation(parseInt(outcome));
        previousOperator = null;
        outcome = "" + runningTotal;
        runningTotal = 0;

        break;
      }
  }
};

const buttonClick = (value) => {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  reRender();
};

const init = () => {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (e) {
      buttonClick(e.target.innerText);
    });
};

init();
