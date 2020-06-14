const express = require('express')
const morgan = require('morgan'); //logger
const bodyParser = require('body-parser')
const fs = require('fs')
const CloudmersiveConvertApiClient = require('cloudmersive-convert-api-client');

require('dotenv').config()

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('tiny'))

let defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;

let Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = process.env.API_KEY
 
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Apikey.apiKeyPrefix['Apikey'] = "Token"
 
// const api = new CloudmersiveConvertApiClient.ConvertDocumentApi()
const api = new CloudmersiveConvertApiClient.ConvertDataApi();

 
const inputFile1 = 'db.xlsx'; // {File} First input file to perform the operation on.
var inputFile = Buffer.from(fs.readFileSync('db.xlsx').buffer); // File | Input file to perform the operation on. 
 
// api.convertDocumentXlsxToPdf(inputFile1, callback);

app.get('/', (req, res) => {
  api.convertDataXlsxToJson(inputFile, function(error, data, response) {
    if (error) {
      console.error(error);
    } else {
      //for(let i of data) {
        console.log(data)
      //}
     res.json(data)
    }
  });
});

port = process.env.PORT || 4000
app.listen(port, function () {
  console.log(`Listening on port ${port}...`)
})

