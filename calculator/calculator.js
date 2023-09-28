    const expressionInput = document.getElementById("expression");
    const buttons = document.querySelectorAll(".button");
  
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const buttonText = button.textContent.trim();
  
        if (buttonText === "=") {
          try {
            const result = eval(expressionInput.value);
            expressionInput.value = result;
          } catch (error) {
            expressionInput.value = "Error";
          }
        } else if (buttonText === "C") {
          expressionInput.value = "";
        } else {
          expressionInput.value += buttonText;
        }
      });
    });
