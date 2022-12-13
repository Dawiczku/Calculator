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
    switch(operator) {
        case '+': 
            operationResult = addition(number1, number2);
            break;
        case '-':
            operationResult = substraction(number1, number2);
            break;
        case '*':
            operationResult = multiplication(number1, number2);
            break;
        case '/':
            operationResult = multiplication(number1, number2);
            break;
    }
}

// Variables

let operationResult = null;
let currentOperation = "";
let currentStringValue = "";

// DOM elements and methods

const numberButtons = Array.from(document.getElementsByClassName("number"));
const operationButtons = Array.from(document.getElementsByClassName("operation"));
let currentValueDisplay = document.getElementById("current-calc");

// ----- Main section -----

numberButtons.sort((a, b) => a.value - b.value);

// Adding a click listener for every number button.
for(let number of numberButtons) {
    number.addEventListener("click", () => {
        currentStringValue += number.value;

        // Checking if the number is not too large, if so setting maximum value.
        if(Number(currentStringValue) < 999999999) {
            currentValueDisplay.textContent = currentStringValue;
        } else {
            currentStringValue = currentValueDisplay.textContent = "999999999";
        }
    }); 
}

for(let operation of operationButtons) {
    operation.addEventListener("click", () => {
        currentOperation = operation.value;
    })
}
