const express = require('express')
const morgan = require('morgan'); //logger
const fs = require('fs')
const CloudmersiveConvertApiClient = require('cloudmersive-convert-api-client');
require('dotenv').config()

const app = express();

app.use(morgan('tiny'))

let defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;
let Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = process.env.API_KEY
 
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Apikey.apiKeyPrefix['Apikey'] = "Token"

// const api = new CloudmersiveConvertApiClient.ConvertDocumentApi() for excel to pdf
const api = new CloudmersiveConvertApiClient.ConvertDataApi();

 var inputFile = Buffer.from(fs.readFileSync('db.xlsx').buffer); // File | Input file to perform the operation on. 
 
// api.convertDocumentXlsxToPdf(inputFile1, callback); for excel to pdf

app.get('/', (req, res) => {
  api.convertDataXlsxToJson(inputFile, function(error, data, response) {
    if (error) {
      console.error(error);
    } else {
      console.log(data)
      fs.writeFile('test.json', JSON.stringify(data, 0, 4), function (err) {
        if (err) console.log(err)
      })
     res.json(data)
  }
  });
});

port = process.env.PORT || 4000
app.listen(port, function () {
  console.log(`Listening on port ${port}...`)
})

