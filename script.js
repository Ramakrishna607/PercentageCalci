// Flip functionality
function flipCalculator() {
    document.querySelector('.calculator-app').classList.toggle('flipped');
}

// Normal Calculator Logic
let normalDisplay = document.getElementById('normal-display');
let currentExpression = '';

function normalAppendNumber(num) {
    currentExpression += num;
    normalDisplay.value = currentExpression;
}

function normalAppendOperator(op) {
    // Prevent adding operator if expression is empty or ends with an operator
    if (currentExpression === '' || '+-*/'.includes(currentExpression.slice(-1))) {
        return;
    }
    currentExpression += op;
    normalDisplay.value = currentExpression;
}

function normalClear() {
    currentExpression = '';
    normalDisplay.value = '';
}

function normalBackspace() {
    currentExpression = currentExpression.slice(0, -1);
    normalDisplay.value = currentExpression;
}

function normalCalculate() {
    try {
        // Using eval() for simplicity, but be cautious in production apps
        let result = eval(currentExpression);
        normalDisplay.value = result;
        currentExpression = result.toString();
    } catch (e) {
        normalDisplay.value = 'Error';
        currentExpression = '';
    }
}

// Percentage Calculator Logic
let percentageDisplay = document.getElementById('percentage-display');
let percentageCurrentValue = '';
let percentageStoredValue = null;
let percentageOperation = null;

function percentageAppendNumber(num) {
    if (percentageOperation === null) {
        percentageCurrentValue += num;
    } else {
        if (percentageStoredValue === null) {
            percentageStoredValue = parseFloat(percentageCurrentValue);
            percentageCurrentValue = '';
        }
        percentageCurrentValue += num;
    }
    percentageDisplay.value = percentageCurrentValue;
}

function percentageClear() {
    percentageCurrentValue = '';
    percentageStoredValue = null;
    percentageOperation = null;
    percentageDisplay.value = '';
}

function percentageBackspace() {
    percentageCurrentValue = percentageCurrentValue.slice(0, -1);
    percentageDisplay.value = percentageCurrentValue;
}

function setPercentageOperation(op) {
    if (percentageCurrentValue === '') return;
    percentageOperation = op;
    percentageStoredValue = parseFloat(percentageCurrentValue);
    percentageCurrentValue = '';
    percentageDisplay.value = ''; // Clear display for next input
}

function calculatePercentage() {
    if (percentageStoredValue === null || percentageCurrentValue === '' || percentageOperation === null) {
        percentageDisplay.value = 'Error';
        return;
    }

    const val1 = percentageStoredValue;
    const val2 = parseFloat(percentageCurrentValue);
    let result;

    switch (percentageOperation) {
        case 'xPercentOfY':
            result = (val1 / 100) * val2;
            break;
        case 'xIsWhatPercentOfY':
            if (val2 === 0) {
                percentageDisplay.value = 'Error: Div by 0';
                return;
            }
            result = (val1 / val2) * 100;
            break;
        case 'percentageChange':
            if (val1 === 0) {
                percentageDisplay.value = 'Error: Old value 0';
                return;
            }
            result = ((val2 - val1) / val1) * 100;
            break;
        default:
            percentageDisplay.value = 'Error';
            return;
    }

    percentageDisplay.value = result.toFixed(2);
    percentageCurrentValue = result.toFixed(2);
    percentageStoredValue = null;
    percentageOperation = null;
}