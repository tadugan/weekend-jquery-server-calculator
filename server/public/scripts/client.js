$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    getHistory();
    // listener for submit/= button click
    $('#submitBtn').on('click', submitEquation);
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
    })
    .catch(function (error) {
        console.log('Error:', error);
    });
}


function submitEquation() {
    console.log('in submitEquation');
    // Ajax to send a POST request to server
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: {
            equationData: {
                number1: 0,
                number2: 0,
                operator: ''
            }
        }
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log('Error:', error);
    });
}