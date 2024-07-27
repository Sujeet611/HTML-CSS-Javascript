document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');
    let currentInput = '';
    let expression = [];

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            const isOperator = button.hasAttribute('data-operator');

            if (isOperator) {
                if (currentInput) {
                    expression.push(parseFloat(currentInput));
                    expression.push(value);
                    currentInput = '';
                }
            } else {
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    clearButton.addEventListener('click', () => {
        currentInput = '';
        expression = [];
        display.textContent = '0';
    });

    equalsButton.addEventListener('click', () => {
        if (currentInput) {
            expression.push(parseFloat(currentInput));
        }

        let result = evaluateExpression(expression);
        display.textContent = result;
        currentInput = '';
        expression = [];
    });

    function evaluateExpression(expression) {
        let stack = [];
        let currentOperator = null;

        expression.forEach(item => {
            if (typeof item === 'number') {
                if (currentOperator) {
                    let prev = stack.pop();
                    switch (currentOperator) {
                        case '+':
                            stack.push(prev + item);
                            break;
                        case '-':
                            stack.push(prev - item);
                            break;
                        case '*':
                            stack.push(prev * item);
                            break;
                        case '/':
                            stack.push(prev / item);
                            break;
                    }
                    currentOperator = null;
                } else {
                    stack.push(item);
                }
            } else {
                currentOperator = item;
            }
        });

        return stack[0];
    }
});
