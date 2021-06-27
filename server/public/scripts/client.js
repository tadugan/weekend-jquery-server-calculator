$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    getHistory();
    // listener for submit/= button click
    $('#submitBtn').on('click', submitEquation);
    // listener to clear inputs when C is clicked
    $('#clearBtn').on('click', clearInputs);
    // listeners to set the input operator when a button is clicked
    $('#plusOperator').on('click', function() {
        changeOperator('+');
        setFirstNum();
    });
    $('#minusOperator').on('click', function() {
        changeOperator('-');
        setFirstNum();
    });
    $('#multiplyOperator').on('click', function() {
        changeOperator('*');
        setFirstNum();
    });
    $('#divideOperator').on('click', function() {
        changeOperator('/');
        setFirstNum();
    });
    // listener to highlight selected operator (change CSS)
    $('.inputArea').on('click', 'button.opBtn', highlightOperator);
    // listener to send DELETE request when deleteHistory button is pressed
    $('#deleteHistory').on('click', deleteHistory);
    // Clear all input fields and displays
    $('#clearBtn').on('click', clearAll);
    // Calculator buttons
    $('.numberBtn').on('click', processButtonClick);
    // disable decimal button
    $('#decimalBtn').on('click', disableDecimal);
}


// Variables to store string versions of numbers entered
let num1 = '';
let num2 = '';


// Variable stores selected operator
let inputOperator = '';


// variable "switch" to see if any equations have been submitted on this page load
let submissions = 0;


// variable "switch" to see if first variable is set
let isFirstNumSet = false;


// variable "switch" to limit decimal use to once per variable
let decimalEnabled = true;

// function to make a GET request for the calculation history
function getHistory() {
    // Ajax to send a GET request to server
    $.ajax({
        method: 'GET',
        url: '/history'
    })
    .then(function (response) {
        console.log(response);
        displayAnswer(response);
        displayHistory(response);
    })
    .catch(function (error) {
        console.log('Error:', error);
    });
}


// function to make a POST request to calculate the inputs
function submitEquation() {
    // Check if inputs are all filled in
    if (areInputsEmpty()) {
        alert('please fill inputs');
        return;
    }
    // Ajax to send a POST request to server
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: {
            equationData: {
                number1: num1,
                number2: num2,
                operator: inputOperator
            }
        }
    })
    .then(function (response) {
        console.log(response);
        clearInputs();
    })
    .catch(function (error) {
        console.log('Error:', error);
    });
    // add 1 to submissions for this page load
    submissions++;
    // Update answers history on the dom
    getHistory();
    // set isFirstNumSet to false so the calculator starts at num1 again
    isFirstNumSet = false;
}


// function to make a GET request for the calculation history
function getHistory() {
    // Ajax to send a GET request to server
    $.ajax({
        method: 'GET',
        url: '/history'
    })
    .then(function (response) {
        console.log(response);
        displayAnswer(response);
        displayHistory(response);
    })
    .catch(function (error) {
        console.log('Error:', error);
    });
}


// function to make a DELETE request to delete the calculation history
function deleteHistory() {
    // Ajax to send a DELETE request to server
    $.ajax({
        method: 'Delete',
        url: '/history'
    })
    .then(function (response) {
        console.log(response);
        submissions = 0;
    })
    .catch(function (error) {
        console.log('Error:', error);
    });
    getHistory();
}


// function to set the inputOperator variable to the vaule of the chosen button
function changeOperator(symbol) {
    inputOperator = symbol;
    console.log('input operator is now', symbol);
    updateCalculatorDisplay();
}


// function to clear the input fields
function clearInputs() {
    num1 = '';
    num2 = '';
    inputOperator = '';
    clearHighlight();
    enableDecimal();
    isFirstNumSet = false;
}

// clears all display areas
function clearAll() {
    clearInputs();
    num1 = '';
    num2 = '';
    inputOperator = '';
    updateCalculatorDisplay();
}


// displays all previous answer stored on the servee and appends them to the <ul>
function displayHistory(equationArray) {
    let historyEl = $('#equationHistory');
    historyEl.empty();
    // loop through each past answer and append it to DOM equation history list
    for (let pastEquation of equationArray) {
        historyEl.prepend(`<li>${pastEquation.number1} ${pastEquation.operator} ${pastEquation.number2} = ${pastEquation.answer}</li>`);
    }
}


// displays the answer to the last submitted equation
function displayAnswer(equationArray) {
    let answerEl = $('#calcDisplay');
    answerEl.empty();
    if (equationArray.length < 1) {
        return;
    }
    else if (submissions < 1) {
        return;
    }
    else {
    answerEl.empty();  
    answerEl.append(`${equationArray[equationArray.length - 1].answer}`);
    }
}


// function to check if inputs are empty
function areInputsEmpty() {
    if ($('#number1').val() == false || $('#number2').val() == false || inputOperator === '') {
        return true;
    }
    else {
        return false;
    }
}


// function to highlight the button of the selected operator
function highlightOperator() {
    // remove highlight from previous operator
    clearHighlight();
    $(this).addClass('selectedOperator');
}


// removes selectedOperator class from all opBtn class <buttons>
function clearHighlight() {
    $('.opBtn').removeClass('selectedOperator');
}


// concatenates calculator inputs into number variables
function processButtonClick() {
    let buttonValue = this.innerText
    // check if decimal is being used AND is enabled
    if (buttonValue === "." && !decimalEnabled) {
        console.log('cannot use decimal again');
        return;
    }
    // check which variable we are working on AND
    // concatenate calculator data to correct variable
    if (isFirstNumSet) {;
        num2 += buttonValue;
    }
    else {
        num1 += buttonValue;
    }
    // display data on the DOM calculator display
    updateCalculatorDisplay();
}


// sets the value of isFirstNumSet "switch"
function setFirstNum() {
    isFirstNumSet = true;
    // enables decimal since we are into a new variable
    enableDecimal();
}


// update current inputs to calculator display
function updateCalculatorDisplay() {
    let displayEl = $('#calcDisplay');
    displayEl.empty();
    displayEl.append(`${num1} ${inputOperator} ${num2}`);
}


// temporarily disables decimal use
function disableDecimal() {
    decimalEnabled = false;
}


// enables decimal use
function enableDecimal() {
    decimalEnabled = true;
}