$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    getHistory();
    // listener for submit/= button click
    $('#submitBtn').on('click', submitEquation);
    $('#plusOperator').on('click', function() {
        changeOperator('+')
    });
    $('#minusOperator').on('click', function() {
        changeOperator('-')
    });
    $('#multiplyOperator').on('click', function() {
        changeOperator('*')
    });
    $('#divideOperator').on('click', function() {
        changeOperator('/')
    });
}


// Variable stores selected operator
let inputOperator = '';


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
    })
    .catch(function (error) {
        console.log('Error:', error);
    });
}


// function to make a POST request to calculate the inputs
function submitEquation() {
    console.log('in submitEquation');
    // TODO: Check if inputs are all filled in
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
}