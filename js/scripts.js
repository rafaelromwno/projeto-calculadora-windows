const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#buttons-container button');

class Calculator
{
    // construtor da calculadora

    constructor(previousOperationText, currentOperationText)
    {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // adiciona o dígito à tela da calculadora

    addDigit(digit)
    {
        // verifica se já existe um ponto na operação atual

        if (digit === '.' && this.currentOperationText.innerText.includes('.'))
        {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    // processa todas as operações da calculadora

    processOperation(operation)
    {
        // verifica se a operação atual está vazia

        if (this.currentOperationText.innerText === '' && operation !== 'C')
        {
            // altera a operação se a anterior existir

            if (this.previousOperationText.innerText !== '')
            {
                this.changeOperation(operation);
            }
            return;
        }

        // obtém os valores atual e anterior

        const previous = +this.previousOperationText.innerText.split(' ')[0];
        const current = +this.currentOperationText.innerText;

        switch (operation)
        {
            case '+':
            case '-':
            case '*':
            case '/':
                this.calculateResult(previous, current, operation);
                break;

            case 'DEL':
                this.processDelOperator();
                break;

            case 'CE':
                this.processClearCurrentOperation();
                break;

            case 'C':
                this.processClearAllOperation();
                break;

            case '=':
                this.processEqualOperator();
                break;

            default:
                return;
        }
    }

    // atualiza os valores na tela da calculadora

    updateScreen(operationValue = null, operation = null, current = null, previous = null)
    {
        if (operationValue === null)
        {
            this.currentOperationText.innerText += this.currentOperation;
        }
        else
        {
            // se o valor for zero, apenas adiciona o valor atual

            if (previous === 0)
            {
                operationValue = current;
            }

            // adiciona o valor atual à operação anterior

            this.previousOperationText.innerText = `${operationValue} ${operation || ''}`;
            this.currentOperationText.innerText = '';
        }
    }

    // altera a operação matemática

    changeOperation(operation)
    {
        const mathOperations = ['+', '-', '/', '*'];

        if (!mathOperations.includes(operation))
        {
            return;
        }

        this.previousOperationText.innerText = `${this.previousOperationText.innerText.slice(0, -1)}${operation}`;
    }

    // deleta o último dígito

    processDelOperator()
    {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // limpa a operação atual -> cancela a entrada (CE)
    
    processClearCurrentOperation()
    {
        this.currentOperationText.innerText = '';
    }

    // limpa todas as operações

    processClearAllOperation()
    {
        this.previousOperationText.innerText = '';
        this.currentOperationText.innerText = '';
    }

    // processa a operação de igual

    processEqualOperator()
    {
        const operation = this.previousOperationText.innerText.split(" ")[1];

        // garante que a operação seja válida

        if (!['+', '-', '*', '/'].includes(operation))
        {
            return;
        }

        // obtém os valores atual e anterior

        const previous = +this.previousOperationText.innerText.split(' ')[0];
        const current = +this.currentOperationText.innerText;

        // realiza o cálculo

        this.calculateResult(previous, current, operation);
    }

    // calcula o resultado com base na operação

    calculateResult(previous, current, operation)
    {
        // verifica se há tentativa de divisão por zero

        if (operation === '/' && current === 0)
        {
            alert('erro: divisão por zero não é permitida.');
            return;
        }

        const operations = {
            '+': previous + current,
            '-': previous - current,
            '*': previous * current,
            '/': previous / current,
        };

        const result = operations[operation];

        this.updateScreen(result, operation, current, previous);
    }
}

// inicializa a calculadora

const calc = new Calculator(previousOperationText, currentOperationText);

// adiciona os eventos de clique aos botões

buttons.forEach(button =>
{
    button.addEventListener("click", event =>
    {
        const value = event.target.innerText;

        // se o valor for um número ou ponto, adiciona à tela
        
        if (+value >= 0 || value === '.')
        {
            calc.addDigit(value);
        }
        else
        {
            // caso contrário, processa a operação

            calc.processOperation(value);
        }
    });
});
