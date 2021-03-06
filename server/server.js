// TODO: requirements (unmarked), stretch goals (stretch.), optional (opt.)
//      Project Setup:
//          * Create server file structure
//          * Create basic HTML doc
//          * Link files in HTML head
//      Server Setup:
//          * install express
//          * setup GET and POST listeners (with response!)
//          * setup AJAX test calls in client.js
//      Client/DOM:
//          * create input fields
//          * create math operation and submit buttons
//          * POST math equation inputs to server
//          * request calculation history from server (via GET)
//          * display history on the DOM
//      Server-side Logic
//          * create function to process math equations based on user input, send OK message
//          * evaluate equation, record response
//          * add response to equation history array
//          * setup GET response to pull actual equation results
//          * setup GET response for equation history
//          
//      Stretch Goals
//          * verify that input fields are not empty
//          Allow user to make a DELETE to delete equation history
//              Update Interface to add delete history button
//              add DELETE request when button is pressed
//          Convert the interface to look and behave like a calculator
//          Allow user to click on an entry in the history list to re-run that calculation
//          Deploy to Heroku
//      
//      What is the process/story for how the page works when it loads?
//          Page loads
//              1. draw calculator (<form>)
//              2. Display History (empty at start)
//          User Calculates
//              1. Listen for click on submit
//              2. Get form values
//              3. Package values together, send Ajax POST packet {}
//              4. Get History Again
//
//      Notes: Data may come as a string, use Number() just incase...
// 
//      Known bugs:
//          TODO: decimal calculations are slightly inaccurate, need to figure out .toFixed??
//          TODO: Calculator Display resizes when number is too big. It works it's just ugly.
//          TODO: If operator is chosen first, you cannot set num1

const express = require('express');

const app = express();
const PORT = 5000;


// Static file server
app.use(express.static('server/public'));
// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Array to store objects with answers
const answerHistory = [];


// calculate answer to equation, add new answer key and value, appends it to answerHistory Array
function calculateEquation(equationObject) {
    let answer = 0;
    switch (equationObject.operator) {
        case '+':
        equationObject.answer = Number(equationObject.number1) + Number(equationObject.number2)
            break;
        
        case '-':
        equationObject.answer = Number(equationObject.number1) - Number(equationObject.number2)
        break;

        case '*':
        equationObject.answer = Number(equationObject.number1) * Number(equationObject.number2)
        break;

        case '/':
        equationObject.answer = Number(equationObject.number1) / Number(equationObject.number2)
        break;

        default:
            console.log('no operator found');
            break;
    }
    answerHistory.push(equationObject);
}


// delete the equation history on the server
function deleteEquationHistory() {
    answerHistory.splice(0, answerHistory.length);
}


// LISTENERS
// ** GET listener for getting calculation history **
app.get('/history', (req, res) => {
    res.send(answerHistory);
    console.log('Sending response from listener GET /history');
});


// ** POST listener to receive calculation inputs, and return answer **
app.post('/calculate', (req, res) => {
    console.log('sending answers back');
    let equation = req.body.equationData;
    // calculate the answer to the equation, add it to answerHistory array
    calculateEquation(equation);
    console.log(answerHistory);
    res.sendStatus(201);
});


// ** DELETE listener to receive request to delete equation history
app.delete('/history', (req, res) => {
    res.sendStatus(201);
    deleteEquationHistory();
});


// start the server
app.listen(PORT, () => {
    console.log('listening on port:', PORT);
});
