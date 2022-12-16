// --- Functions ---

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
    return number2 !== 0 ? number1 / number2 : 'Error';
}

// Makes operations based on passed arguments
function operate(number1, operator, number2) {

    let result = null;
    number1 = Number(number1);
    number2 = Number(number2);

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
    if(value === "") {
        currentValueDisplay.textContent = "";
        return;
    }
    value = Number(value);
    
    // Formatting the display based on it's value
    if(isInt(value)) {
        if(isTooLong(value)) {
            currentValueDisplay.textContent = `${value.toExponential(2)}`;
        } else {
            currentValueDisplay.textContent = `${value}`;
        }
    } else {
        if(isTooLong(parseInt(value))) {
            currentValueDisplay.textContent = `${Number(value.toFixed(2)).toExponential(2)}`;
        } else {
            currentValueDisplay.textContent = `${value.toFixed(2)}`;
        }
    }
}

function updateSmallDisplay(value, operation) {
    if(value === "") {
        lastValueDisplay.textContent = "-";
        return;
    }
    value = Number(value);

    // Formatting the display based on it's value
    if(isInt(value)) {
        if(isTooLong(value)) {
            lastValueDisplay.textContent = `${value.toExponential(2)} ${operation}`;
        } else {
            lastValueDisplay.textContent = `${value} ${operation}`;
        }
    } else {
        if(isTooLong(parseInt(value))) {
            lastValueDisplay.textContent = `${Number(value.toFixed(2)).toExponential(2)} ${operation}`;
        } else {
            lastValueDisplay.textContent = `${value.toFixed(2)} ${operation}`;
        }
    }
}

function isInt(value) {
    return Number.isInteger(value) ? true : false;
}

function isTooLong(value) {
    return value.toString().length >= 10 ? true : false;
}

// Function used when neither of values are empty and user clicks "=" button.
function convertProperly(value) {
    if(isInt(value)) {
        if(isTooLong(value)) {
            value = value.toExponential(2);
        } 
    } else {
        if(isTooLong(parseInt(value))) {
            value = Number(value.toFixed(2)).toExponential(2);
        } else {
            value = Number(value.toFixed(2));
        }
    }
    return value;
}

// --- Variables ---

let currentOperation = null;
let firstStringValue = "";
let secondStringValue = "";
let firstValue = null;
let secondValue = null;

// --- DOM elements and methods ---

const numberButtons = Array.from(document.getElementsByClassName("number"));
const operationButtons = Array.from(document.getElementsByClassName("operation"));
const currentValueDisplay = document.getElementById("current-calc");
const lastValueDisplay = document.getElementById("last-calc");
const clearButton = document.getElementById("clear-btn");
const deleteButton = document.getElementById("delete-btn");
const commaButton = document.getElementById("comma");

// --- Main section ---

numberButtons.sort((a, b) => a.value - b.value);

// Adding a click listener for every number button.
for(let number of numberButtons) {
    number.addEventListener("click", () => {

        // Make sure, zero would not overlap
        if(Number(number.value) === 0 && firstStringValue == ""){
            return;
        // Writing value to second string if first one is not empty and operation is choosed
        } else if(firstStringValue != "" && currentOperation != null && !isTooLong(secondStringValue)) {
            secondStringValue += number.value;
        
        } else {
            if(!isTooLong(firstStringValue)){ 
                firstStringValue += number.value;
            }
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
        if(secondStringValue == "" && operation.value !== "=") {
            
            firstStringValue == "" ? firstStringValue = "0" : firstStringValue = firstStringValue;
            firstValue = Number(firstStringValue);
            currentOperation = operation.value;
            updateSmallDisplay(firstValue, currentOperation);
            updateMainDisplay("");

        /* Else if the second value is present and user clicks operation button 
           again, two previous values get calculated, the operation sign gets signed
           to the result of previous operation */
        } else if (secondStringValue != "") {

            firstValue = convertProperly(Number(firstStringValue));
            secondValue = convertProperly(Number(secondStringValue));

            let operationResult = operate(firstValue, currentOperation, secondValue);
            updateMainDisplay("");

            /* If the operation value is equal to "=", it doesn't get signed to result,
               so it won't be defaultly used in the next operation */
            if(operation.value === '=') {

                lastValueDisplay.textContent = `${firstValue} ${currentOperation} ${secondValue} =`;

                updateMainDisplay(operationResult);
                currentOperation = null;

            } else {
                currentOperation = operation.value;
                updateSmallDisplay(operationResult, currentOperation);
            }

            // Resetting the values, setting the result as firstValue
            firstStringValue = operationResult;
            secondStringValue = "";
            firstValue = null;
            secondValue = null;
        }
    })
}

// Clear button event listener to reset everything
clearButton.addEventListener("click", () => {
    updateMainDisplay("0");
    updateSmallDisplay("", "");
    currentOperation = null;
    firstStringValue = "";
    secondStringValue = "";
    firstValue = null;
    secondValue = null;
})

// Dodac funkcjonalnosc do kropki
// Dodac funkcjonalnosc do przycisku delete
// Sprobowac poprawic kod
