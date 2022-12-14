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
    if(number2 === 0) {
        alert("ERROR");
        return 0;
    } else {
        return number1 / number2;
    }
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
    value = convertProperly(value);
    currentValueDisplay.textContent = value;
}

function updateSmallDisplay(value, operation) {
    value = convertProperly(value);
    lastValueDisplay.textContent = `${value} ${operation}`;
}

function isInt(value) {
    return Number.isInteger(Number(value)) ? true : false;
}

function isTooLong(value) {
    return value.toString().length >= 10 ? true : false;
}

// Function formatting the values based on input.
function convertProperly(value) {
    if(value === "") {
        return "-";
    } else if (value === "0") {
        return "0";
    } else if(String(value).charAt(0) === ".") {
        return "0" + value;
    } else if (Number(value) === 0) {
        return isTooLong(value) ? 0 : value;
    } else if (value === " ") {
        return "";
    } else if(String(value).charAt(String(value).length - 1) === ".") {
        return value;
    } 

    if(isInt(value)) {
        if(String(value).includes(".")) {
            return String(value);
        }
        value = Number(value);
        if(isTooLong(value)) {
            value = value.toExponential(4);
        }
    } else {
        if(isTooLong(value)) {
            value = Number(value).toFixed(4);
            if(isTooLong(value)) {
                value = Number(value).toExponential(4);
            }
        }
        if((String(value)).charAt(0) === "0" && parseInt(value) != 0) {
            value = String(value).slice(1, String(value).length);
        }
    }
    return value;
}

function numberFunction(number) {

    // Make sure, zero would not overlap
    if(Number(number.currentTarget.value) === 0 && (firstStringValue === "0" || secondStringValue === "0")){
        return;
    // Writing value to second string if first one is not empty and operation is choosed
    } else if(firstStringValue != "" && currentOperation != null) {
        if(!isTooLong(secondStringValue)) {
            secondStringValue += number.currentTarget.value;
        }
    } else {
        if(!isTooLong(firstStringValue)) {
            firstStringValue += number.currentTarget.value;
        }
    }

    // If is not present, update main screen with first Value
    if(secondStringValue == "") { 
        updateMainDisplay(firstStringValue);     
    // If second parameter is present, update main screen with second Value
    } else if(secondStringValue != "") {
        updateMainDisplay(secondStringValue);
    }
    ableToDelete = true;
}

function operationFunction(operation) { 

    /* If second value is not present, you can change every operation sign
       excluding equal sign. */
    if(secondStringValue === "" && operation.currentTarget.value !== "=") {
        
        firstStringValue === "." ? firstValue = 0 : firstValue = Number(firstStringValue);
        currentOperation = operation.currentTarget.value;
        updateSmallDisplay(firstValue, currentOperation);
        updateMainDisplay("0");
        ableToDelete = false;

    /* Else if the second value is present and user clicks operation button 
       again, two previous values get calculated, the operation sign gets signed
       to the result of previous operation */
    } else if (secondStringValue !== "") {
        
        firstStringValue === "." ? firstValue = 0 : firstValue = Number(firstStringValue);
        secondStringValue === "." ? secondValue = 0 : secondValue = Number(secondStringValue);

        let operationResult = operate(firstValue, currentOperation, secondValue);
        updateMainDisplay(" ");

        /* If the operation value is equal to "=", it doesn't get signed to result,
           so it won't be defaultly used in the next operation */
        if(operation.currentTarget.value === '=') {

            lastValueDisplay.textContent = `${convertProperly(firstValue)} ${currentOperation} ${convertProperly(secondValue)} =`;
            updateMainDisplay(operationResult);
            currentOperation = null;

        } else {
            currentOperation = operation.currentTarget.value;
            updateSmallDisplay(operationResult, currentOperation);
            ableToDelete = false;
        }

        // Resetting the values, setting the result as firstValue
        firstStringValue = operationResult.toString();
        secondStringValue = "";
        firstValue = null;
        secondValue = null;
    }
}

function clearEverything() {
    updateMainDisplay("0");
    updateSmallDisplay("", "");
    currentOperation = null;
    firstStringValue = "";
    secondStringValue = "";
    firstValue = null;
    secondValue = null;
}

function commaFunction() {
    if(currentOperation == null && !firstStringValue.includes(".")) {
        firstStringValue += ".";
        currentValueDisplay.textContent += ".";
    } else if(currentOperation != null && !secondStringValue.includes(".")){
        secondStringValue += ".";
        currentValueDisplay.textContent += ".";
    }
}

function deleteDigit(stringValue) {
    if(stringValue === "") {
        updateMainDisplay("0");
        ableToDelete = false;
    } else {
        updateMainDisplay(stringValue);
    }
}

function deleteFunction() {
    if(ableToDelete) {
        if(secondStringValue !== "") {
            secondStringValue = secondStringValue.slice(0, secondStringValue.length - 1);
            deleteDigit(secondStringValue);
        } else {
            firstStringValue = firstStringValue.slice(0, firstStringValue.length - 1);
            deleteDigit(firstStringValue);
        }
    }
}

// --- Variables ---

let currentOperation = null;
let firstStringValue = "";
let secondStringValue = "";
let firstValue = null;
let secondValue = null;
let ableToDelete = null; // Deciding if user can delete digits from the screen

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
    number.addEventListener("click", numberFunction); 
}

// Add EventListener to every operation button
for(let operation of operationButtons) {
    operation.addEventListener("click", operationFunction);
}

// Clear button event listener to reset everything
clearButton.addEventListener("click", clearEverything);

commaButton.addEventListener("click", commaFunction);

deleteButton.addEventListener("click", deleteFunction);

document.addEventListener("keydown", (event) => {

    let operators = {
        '+': 'addition',
        '-': 'substraction',
        '*': 'multiplication',
        '/': 'division',
        '.': 'comma',
    }

    if(!isNaN(event.key) && event.key !== " ") {
        document.getElementById(`Digit${event.key}`).click();
    } else if(Object.keys(operators).includes(event.key)) {
        document.getElementById(`${operators[event.key]}`).click();
    } else if(event.key === "=" || event.key === "Enter") {
        document.getElementById("equal-sign").click();
    } else if(event.key === "Backspace") {
        document.getElementById("delete-btn").click();
    } else if(event.key === "Escape") {
        document.getElementById("clear-btn").click();
    }

})

// Sprobowac poprawic kod
