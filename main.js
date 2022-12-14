// Functions

function addition(number1, number2) {
    return number1 + number2;
}

function substraction(number1, number2) {
    return number1 - number2;
}

function multiplication(number1, number2) {
    return number1 * number2;
}

function division(number1, number2) {
    let number;
    number2 !== 0 ? number = number1 / number2 : number = 'Error';
    return number;
}

function operate(number1, operator, number2) {

    let result = null;

    switch(operator) {
        case '+': 
            result = addition(number1, number2);
            return result;
        case '-':
            result = substraction(number1, number2);
            return result;
        case '*':
            result = multiplication(number1, number2);
            return result;
        case '/':
            result = division(number1, number2);
            return result;
    }
}

function updateMainDisplay(value) {
    if(Number.isInteger(Number(value))) {
        currentValueDisplay.textContent = value;
    } else {
        currentValueDisplay.textContent = Number(value).toFixed(2).toString();
    }
}

function updateSmallDisplay(value, operation) {
    if(Number.isInteger(Number(value))) {
        lastValueDisplay.textContent = `${value} ${operation}`;
    } else {
        lastValueDisplay.textContent = `${Number(value).toFixed(2).toString()} ${operation}`;
    }
}

// Variables

let currentOperation = null;
let firstStringValue = "";
let secondStringValue = "";
let firstValue = null;
let secondValue = null;

// DOM elements and methods

const numberButtons = Array.from(document.getElementsByClassName("number"));
const operationButtons = Array.from(document.getElementsByClassName("operation"));
let currentValueDisplay = document.getElementById("current-calc");
let lastValueDisplay = document.getElementById("last-calc");

// ----- Main section -----

numberButtons.sort((a, b) => a.value - b.value);

// Adding a click listener for every number button.
for(let number of numberButtons) {
    number.addEventListener("click", () => {

        // Make sure, zero would not overlap
        if(Number(number.value) === 0 && firstStringValue == ""){
            return;
        // Writing value to second string if first one is not empty and operation is choosed
        } else if(firstStringValue != "" && currentOperation != null) {
            secondStringValue += number.value;
        
        } else {
            firstStringValue += number.value;
        }

        // Checking if the number is not too large, if so setting maximum value.
        if(firstStringValue.length < 10 && secondStringValue == "") {
            updateMainDisplay(firstStringValue);
        } else if(secondStringValue.length < 10 && secondStringValue != "") {
            updateMainDisplay(secondStringValue);
        } else {
            return;
        }
    }); 
}

for(let operation of operationButtons) {
    operation.addEventListener("click", () => {
        // If second value is not present, you can change the operation sign
        if(secondStringValue == "") {   
            currentOperation = operation.value;
            firstValue = Number(firstStringValue);
            updateSmallDisplay(firstValue, currentOperation);
            updateMainDisplay("");
        /* Else if the second value is present and user clicks operation button 
           again, two previous values get calculated*/
        } else {
            firstValue = Number(firstStringValue);
            secondValue = Number(secondStringValue);
            let operationResult = operate(firstValue, currentOperation, secondValue);
            updateMainDisplay("");
            if(operation.value == '=') {
                lastValueDisplay.textContent = `${firstValue} ${currentOperation} ${secondValue} =`;
                updateMainDisplay(operationResult);
                currentOperation = null;
            } else {
                currentOperation = operation.value;
                updateSmallDisplay(operationResult, currentOperation);
            }
            firstStringValue = operationResult;
            secondStringValue = "";
            firstValue = null;
            secondValue = null;
        }
    })
}
