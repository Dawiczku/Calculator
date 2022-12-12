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
    number2 !== 0 ? number1 / number2 : 'Error';
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
let currentStringValue = "";

// DOM elements and methods

let numberButtons = Array.from(document.getElementsByClassName("number"));

// Main section

numberButtons.sort((a, b) => a.value - b.value);
for(let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", function() {
        currentStringValue += numberButtons[i].value;
    }); 
}
