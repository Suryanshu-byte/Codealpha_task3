// JavaScript code for the calculator
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let previousInput = '';
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'clear') {
                clearDisplay();
            } else if (value === '=') {
                calculateResult();
            } else if (button.classList.contains('operator')) {
                setOperator(value);
            } else {
                appendNumber(value);
            }
        });
    });

    // Clear the display and reset all values
    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = null;
        display.value = '';
    }

    // Append numbers to the current input
    function appendNumber(number) {
        if (number === '.' && currentInput.includes('.')) return; // Avoid multiple decimals
        currentInput += number;
        updateDisplay(currentInput);
    }

    // Set the selected operator
    function setOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculateResult();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }

    // Calculate the result based on the operator and inputs
    function calculateResult() {
        if (operator === null || currentInput === '') return;
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = curr !== 0 ? prev / curr : 'Error'; // Avoid division by zero
                break;
            default:
                return;
        }

        updateDisplay(result);
        currentInput = result.toString();
        operator = null;
        previousInput = '';
    }

    // Update the calculator display
    function updateDisplay(value) {
        display.value = value;
    }
});
