// create object that helps keep track of values, operands and operators
const calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null
    }
    // make the digit button work sp that when they are clicked, feedback is displayed to the user on the screen
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit
        calculator.waitingForSecondOperand = false
    } else
    // overwrite 'displayValue' if the current value is '0' otherwise append to it 
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit

    console.log(calculator)
}

// inputting decimal point
function inputDecimal(dot) {
    // if the 'displayValue' does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
        //Append the decimal point
        calculator.displayValue += dot
    }
}

//handling operators
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue)

    if (firstOperand === null) {
        calculator.firstOperand = inputValue
    }

    calculator.waitingForSecondOperand = true
    calculator.operator = nextOperator

    console.log(calculator)
}

// update the display value on the screen
function updateDisplay() {
    const display = document.querySelector('.calculator-screen')
    display.value = calculator.displayValue
}

updateDisplay()


// listen for clicks on the calculator and determine what type of key was clicked
const keys = document.querySelector('.calculator-keys')
keys.addEventListener('click', (event) => {
    const { target } = event
    if (!target.matches('button')) {
        return
    }
    if (target.classList.contains('operator')) {
        handleOperator(target.value)
        updateDisplay()
        return
    }
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value)
        updateDisplay()
        return
    }
    if (target.classList.contains('all-clear')) {
        console.log('clear', target.value)
        return
    }

    inputDigit(target.value)
    updateDisplay()
})