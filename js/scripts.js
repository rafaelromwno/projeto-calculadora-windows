const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#buttons-container button');

class Calculator 
{
    constructor(previousOperationText, currentOperationText)
    {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // add digit to calculator screen

    addDigit(digit)
    {
        // check if current operation already has a dot

        if(digit === '.' && this.currentOperationText.innerText.includes('.'))
        {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    // process all calculator operations

    processOperation(operation)
    {
        // get current and previous value

        let operationValue;
        const previous = +this.previousOperationText.innerText;
        const current = +this.currentOperationText.innerText;

        switch (operation) 
        {
            case '+':
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case '-':
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case '*':
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case '/':
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
        
            default:
                return;
        }
    }

    // change values of the calculator screen

    updateScreen(operationValue = null, operation = null, current = null, previous = null)
    {
        if(operationValue === null)
        {
            this.currentOperationText.innerText += this.currentOperation;
        }
        else
        {
            // check if value is zero, if it is just add current value

            if(previous === 0)
            {
                operationValue = current;
            }

            // add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = '';
        }
        

    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach
(
    (button) => 
    {
        button.addEventListener
        (
            "click", (event) => 
            {
                const value = event.target.innerText;


                if(+value >= 0 || value === '.')
                {
                    calc.addDigit(value);
                }
                else
                {
                    calc.processOperation(value);
                }
                
            }            
        )
    }
)