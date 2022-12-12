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
            result = addition(number1, number2);
            break;
        case '-':
            result = substraction(number1, number2);
            break;
        case '*':
            result = multiplication(number1, number2);
            break;
        case '/':
            result = multiplication(number1, number2);
            break;
    }
}

// Variables

let result = null;