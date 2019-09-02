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
    if (calculator.waitingForSecondOperand === true) return
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

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator

        console.log(calculator)
        return
    }

    if (firstOperand === null) {
        calculator.firstOperand = inputValue
    } else if (operator) {
        const currentValue = firstOperand || 0
        const result = performCalculation[operator](firstOperand, inputValue)

        calculator.displayValue = String(result)
        calculator.firstOperand = result
    }

    calculator.waitingForSecondOperand = true
    calculator.operator = nextOperator

    console.log(calculator)
}
const performCalculation = {
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

        '=': (firstOperand, secondOperand) => secondOperand
    }
    // resetting the calculator
function resetCalculator() {
    calculator.displayValue = '0'
    calculator.firstOperand = null
    calculator.waitingForSecondOperand = false
    calculator.operator = null
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
        resetCalculator()
        updateDisplay()
        return
    }

    inputDigit(target.value)
    updateDisplay()
})