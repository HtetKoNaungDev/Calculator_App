let input = "";
    let resetNext = false;
    let history = [];
    let ceCount = 0;

    const displayEl = document.getElementById("display");
    const historyEl = document.getElementById("history");

    function updateDisplay() {
      displayEl.innerText = input || "0";
    }

    function updateHistory() {
      historyEl.innerHTML = history.map(item => `<div>${item}</div>`).join('');
      historyEl.scrollTop = historyEl.scrollHeight;
    }

    function press(val) {
      if (resetNext) {
        input = "";
        resetNext = false;
      }
      input += val;
      updateDisplay();
      ceCount = 0;
    }

    function pressOperator(op) {
      if (resetNext) resetNext = false;
      if ("+-*/".includes(input.slice(-1))) {
        input = input.slice(0, -1);
      }
      input += op;
      updateDisplay();
      ceCount = 0;
    }

    function clearAll() {
      input = "";
      history = [];
      updateDisplay();
      updateHistory();
      ceCount = 0;
    }

    function clearEntry() {
      if (ceCount === 0) {
        input = "";
        updateDisplay();
        ceCount = 1;
      } else {
        history = [];
        updateHistory();
        ceCount = 0;
      }
    }

    function backspace() {
      if (resetNext) return;
      input = input.slice(0, -1);
      updateDisplay();
    }

    function toggleSign() {
      if (!input) return;
      try {
        let value = eval(input);
        value = -value;
        input = value.toString();
        updateDisplay();
      } catch {
        input = "Error";
        updateDisplay();
      }
    }

    function calculate() {
      try {
        let result = eval(input);
        history.push(`${input} = ${result}`);
        input = result.toString();
        updateDisplay();
        updateHistory();
        resetNext = true;
        ceCount = 0;
      } catch {
        input = "Error";
        updateDisplay();
        resetNext = true;
      }
    }

    function toggleDarkMode() {
      document.body.classList.toggle("dark-mode");
      const modeBtn = document.querySelector(".mode-toggle");
      if (document.body.classList.contains("dark-mode")) {
        modeBtn.textContent = "☀️";
      } else {
        modeBtn.textContent = "🌙";
      }
    }