// Requirements
const fs = require('fs');
const readline = require('readline');

// Formatter complying to requirements
function formattedJSONFromCSV(filePath) {
    let jsonObj = {};
    let validLines = [];
    let lineCount = 0;
    // create readStream
    const stream = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: process.stdout,
        terminal: false
    });
    stream.on('line', (line) => {
        lineCount++;
        splits = line.split(',');
        if (splits.length == 4) { // Well-written line
            if (lineCount > 1) {
                jsonObj.file = splits[0];
                let text = splits[1];
                let number = splits[2];
                let hex = splits[3];
                formattedLine = {
                    "text": text,
                    "number": number,
                    "hex": hex,
                }
                validLines.push(formattedLine);
            };
            
        };
    });
    // Final formatting
    stream.on('close', () => {
        jsonObj.lines = validLines;
        console.log(jsonObj);
    });
};

// Exporting
module.exports.formattedJSONFromCSV = formattedJSONFromCSV;