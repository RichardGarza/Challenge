const fs = require('fs');
const FILENAME = 'Input.txt';

fs.readFile(FILENAME, (err, data) => { // Read File First
    if (err){ console.log(err) } 
    var fs = require('fs');

    fs.writeFile('Results.txt', '', function (err) { // Create or Clear File
      if (err) throw err;
    });

    const dataString = data.toString(); // Convert Data to String 

    let results = [];                   // Instantiate Variable to work with
    let acctNumber = [];

    for(let i = 0; i <= dataString.length; i++){ // Loop thru characters

      let currentEntry = parseInt(dataString[i]); // Convert character to integer || NaN
      
      if((currentEntry >= 0) && (currentEntry <= 9)){ // Check for integer
        acctNumber.push(currentEntry);  // If integer, add to currentEntry array
      } else {
        if(dataString[i] !== '|' && dataString[i] !== '_' && dataString[i] !== '\r'&& dataString[i] !== '\n'){
          acctNumber.push('?');
          if(acctNumber[0] !== 'ILL'){
            acctNumber.unshift('ILL');
          }
        }
        
      }  

      let entryEnd = (i/83)
      if(Number.isInteger(entryEnd) && entryEnd !== 0){ // When finished with entry,

        let illegitimate = acctNumber[0] === 'ILL';

        if (acctNumber.length !== 9 || illegitimate) {
           if(illegitimate){

           } else {
             acctNumber.push(" ERR")
           }
        } else {
          let acctNumberString = acctNumber.join(""); 
        }
        

        if(  ){  // Count Account Number
          
          results.push({                // Push object onto results array 
            id: results.length + 1,
            accountNumber: acctNumberString
          });
          // Then append the result to the Results.txt file
          fs.appendFile('Results.txt', `Entry ${results.length}: ${acctNumberString} \r`, function (err) {
            if (err) throw err;
          });
          
        } else {                 // Assuming it's a valid number, 


          results.push({                // Push object onto results array 
            id: results.length + 1,
            accountNumber: acctNumberString
          });
          // Then append the result to the Results.txt file
          fs.appendFile('Results.txt', `Entry ${results.length}: ${acctNumberString} \r`, function (err) {
            if (err) throw err;
          });

        }
        acctNumber = []; // Then reset acctNumber to prepare for next entry.

      } 
    };
    console.log(results);

    if (results.length === 0){
      fs.writeFile('Results.txt', 'No Account Numbers Were Found.', function (err) {
        if (err) throw err;
        console.log( 'No Account Numbers Were Found.' );
      });
    }
});