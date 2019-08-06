const fs = require('fs') 
  
fs.readFile('Input.txt', (err, data) => { // Read File First
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
        // Skip
      }  
      let entryEnd = (i/89)
      if(Number.isInteger(entryEnd) && entryEnd !== 0){ // When finished with entry,  

        if( acctNumber.length !== 9 ){  // Count Account Number
          acctNumber = [];
        } else {                 // Assuming it's a 9 digit number, Validate it.
          let checksum = 0;

          for(let x =  8; x >= 0; x-- ){ // Create checksum
            checksum = (-1 * (x - 9) * acctNumber[x]) + checksum;
          }

          if((checksum % 11) === 0){ // Checksum modulus 11 should equal 0
            let acctNumberString = acctNumber.join("");
            results.push({                // Push object onto results array 
              id: results.length + 1,
              accountNumber: acctNumberString
            });
            fs.appendFile('Results.txt', `Entry ${results.length}: ${acctNumberString} \r`, function (err) {
              if (err) throw err;
            });
          }  
        }
        acctNumber = [];
      } 
    };

    if (results.length === 0){
      fs.writeFile('Results.txt', 'No Account Numbers Were Found.', function (err) {
        if (err) throw err;
        console.log( 'No Account Numbers Were Found.' );
      });
    } else {
      console.log('Account Numbers Saved!');
      console.log(results);
      // The 'results' object contains all account numbers and 
      // can also be used at this point for anything else. 
    }
});