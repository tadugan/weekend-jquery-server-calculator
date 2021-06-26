// TODO: requirements (unmarked), stretch goals (stretch.), optional (opt.)
//      Project Setup:
//          Create server file structure
//          Create basic HTML doc
//          Link files in HTML head
//      Server Setup:
//          install express
//          setup GET and POST listeners (with response!)
//          setup AJAX test calls in client.js
//      Client/DOM:
//          create input fields
//          create math operation and submit buttons
//              stretch. verify that input fields are not empty
//          POST math equation inputs to server
//          request calculation history from server (via GET)
//          loop through history data
//          display history on the DOM
//      Server-side Logic
//          create function to process math equations based on user input, send OK message
//          evaluate equation, record response
//          add response to equation history array
//          setup GET response to pull actual equation results
//          setup GET response for equation history
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
