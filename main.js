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

// Makes operations based on passed arguments
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
    value = Number(value);
    if(isInt(value)) {
        if(isTooLong(value)) {
            currentValueDisplay.textContent = `${value.toExponential(2)}`;
        } else {
            currentValueDisplay.textContent = `${value}`;
        }
    } else {
        if(isTooLong(value)) {
            currentValueDisplay.textContent = `${value.toExponential(2).toFixed(2)}`;
        } else {
            currentValueDisplay.textContent = `${value.toExponential(2)}`;
        }
    }
}

function updateSmallDisplay(value, operation) {
    value = Number(value);
    if(isInt(value)) {
        if(isTooLong(value)) {
            lastValueDisplay.textContent = `${value.toExponential(2)} ${operation}`;
        } else {
            lastValueDisplay.textContent = `${value} ${operation}`;
        }
    } else {
        if(isTooLong(value)) {
            lastValueDisplay.textContent = `${value.toExponential(2).toFixed(2)} ${operation}`;
        } else {
            lastValueDisplay.textContent = `${value.toExponential(2)} ${operation}`;
        }
    }
}

function isInt(value) {
    return Number.isInteger(value) ? true : false;
}

function isTooLong(value) {
    return value.toString().length >= 10 ? true : false;
}

function convertProperly(value) {
    if(isInt(value)) {
        if(isTooLong(value)) {
            value = value.toExponential(2);
        } 
    } else {
        if(isTooLong(value)) {
            value = value.toFixed(2).toExponential(2);
        } else {
            value = value.toFixed(2);
        }
    }
    return value;
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
const currentValueDisplay = document.getElementById("current-calc");
const lastValueDisplay = document.getElementById("last-calc");
const clearButton = document.getElementById("clear-btn");
const deleteButton = document.getElementById("delete-btn");

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

        // If number is not too large and second parameter is not present, update main screen with first Value
        if(!isTooLong(firstStringValue) && secondStringValue == "") {
            updateMainDisplay(firstStringValue);
        
        // Else if number is not too large and second parameter is present, update main screen with second Value
        } else if(!isTooLong(secondStringValue) && secondStringValue != "") {
            updateMainDisplay(secondStringValue);
        
        // Else the number is too large, return.
        } else {
            return;
        }
    }); 
}

// Add EventListener to every operation button
for(let operation of operationButtons) {
    operation.addEventListener("click", () => {

        /* If second value is not present, you can change every operation sign
           excluding equal sign to avoid null display error. */
        if(secondStringValue == "" && operation.value != "=") {
            currentOperation = operation.value;
            firstValue = Number(firstStringValue);
            updateSmallDisplay(firstValue, currentOperation);
            updateMainDisplay("");

        /* Else if the second value is present and user clicks operation button 
           again, two previous values get calculated, the operation sign gets signed
           to the result of previous operation */
        } else if (secondStringValue != "") {
            firstValue = Number(firstStringValue);
            secondValue = Number(secondStringValue);
            let operationResult = operate(firstValue, currentOperation, secondValue);
            updateMainDisplay("");

            if(operation.value == '=') {

                firstValue = convertProperly(firstValue);
                secondValue = convertProperly(secondValue);
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
