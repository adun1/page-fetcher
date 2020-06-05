const request = require('request');
const fs = require('fs');

//need to specify the entire URL (eg http://www.example.org) for the first provided argument, along side with the desired location to save the data
const fetcher = function(reqArgs) {
  if (reqArgs.length !== 2) return false;
  request(reqArgs[0],  (error, response, body) => {
    if (error) {
      console.log('error:', error);
      return;
    }
    //assumption that only 200 is the only status code given in our case if the request is succesfull
    if ((response) && (response.statusCode !== 200)) {
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      return;
    }
  
    //WARNING!! WE ARE NOT CHECKING IF THE FILE FIRST EXISTS, WILL OVERWRITE AN EXISTING FILE!!
    fs.writeFile(reqArgs[1], body, (err) => {
      //case file path invalid
      if (err) {
        console.log("invalid file path given");
        return;
      }
      //get file size info
      const stats = fs.statSync(reqArgs[1]);
      console.log(`Downloaded and saved ${stats.size} bytes to ${reqArgs[1]}`);
    });
  
  });

};

fetcher(process.argv.slice(2));





/*
request('https://www.example.edu/fdsafsafsa.html', (error, response, body) => {
  console.log('error', error);
  console.log('statusCode:', response && response.statusCode); //print respose code if a response was received
  console.log('body;', body);
});
*/