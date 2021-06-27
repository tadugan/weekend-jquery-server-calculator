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
    });
    $('#minusOperator').on('click', function() {
        changeOperator('-');
    });
    $('#multiplyOperator').on('click', function() {
        changeOperator('*');
    });
    $('#divideOperator').on('click', function() {
        changeOperator('/');
    });
    // listener to highlight selected operator (change CSS)
    $('.inputArea').on('click', 'button.opBtn', highlightOperator);
    // listener to send DELETE request when deleteHistory button is pressed
    $('#deleteHistory').on('click', deleteHistory);
}


// Variable stores selected operator
let inputOperator = '';


// variable "switch" to see if any equations have been submitted on this page load
let submissions = 0;


// function to make a GET request for the calculation history
function getHistory() {
    console.log('in getHistory');
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
    console.log('in submitEquation');
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
                number1: $('#number1').val(),
                number2: $('#number2').val(),
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
}


// function to make a GET request for the calculation history
function getHistory() {
    console.log('in getHistory');
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
    console.log('deleting history');
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
}


// function to clear the input fields
function clearInputs() {
    $('.inputField').val('');
    inputOperator = '';
    clearHighlight();
}


// displays all previous answer stored on the servee and appends them to the <ul>
function displayHistory(equationArray) {
    console.log('in displayHistory');
    let historyEl = $('#equationHistory');
    historyEl.empty();
    // loop through each past answer and append it to DOM equation history list
    for (let pastEquation of equationArray) {
        historyEl.prepend(`<li>${pastEquation.number1} ${pastEquation.operator} ${pastEquation.number2} = ${pastEquation.answer}</li>`);
    }
}


// displays the answer to the last submitted equation
function displayAnswer(equationArray) {
    let answerEl = $('#theAnswer');
    answerEl.empty();
    answerEl.append(`The answer is:`)
    if (equationArray.length < 1) {
        return;
    }
    else if (submissions < 1) {
        return;
    }
    else {
    answerEl.empty();  
    answerEl.append(`The answer is: ${equationArray[equationArray.length - 1].answer}`);
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