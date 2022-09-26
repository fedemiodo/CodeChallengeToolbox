// HTTP Module And Requirements
const port = 8000;
const express = require('express');
const app = express();
const fileDownloader = require('./external_api_consumption');
const JSONParser = require('./csv_to_json_parsing');

// Print a log once the server is listening
app.listen(port, () => {
    console.log(`Server listening at port ${port}/`);
});

// Input: ---
// Output: Formatted JSON files
function downloadAndFormat() {
    // Download files from external server
    return fileDownloader.downloadFilesFromExternalAPI()
    .then((listOfCSVs) => {
        return listOfCSVs
        .filter(csv => !!csv)         // removes failed requests
        .filter(line => line.includes('\n'))    // removes csvs without information
        .map(csv => JSONParser.JSONFromCSV(csv))    // formats csv into json
    })
};

// API GET endpoint
app.get('/files/data', (req,res) => {
    res.contentType('application/json')
    downloadAndFormat()
    .then(response => {
        res.send(response)
    })
});