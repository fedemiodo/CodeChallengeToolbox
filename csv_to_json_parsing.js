// Requirements

// Input: a CSV file
// Output: a formatted JSON file
const JSONFromCSV = (csvFile) => {  //  "file,text,number,hex,test3.csv,asd,3,8ab2,..."
    const csvSplitByLines = csvFile.split('\n') //  ["file,text,number,hex","test3.csv,asd,3,8ab2","..."]
    const [headers, ...csvWithoutHeaders] = csvSplitByLines // headers = "file,text,number,hex" --- csvWithoutHeaders = ["test3.csv,asd,3,8ab2","..."]
    listOfHeaders = headers.split(',')
    return csvWithoutHeaders
    .map( listOfLines => listOfLines.split(','))    // [["test3.csv","asd","3","8ab2"],[...]]
    .filter(listOfLineContents => {
        return listOfLineContents.length === 4
    }) // Only complete lines will be included
    .reduce((JSONToBeBuilt, listOfLineContents) => {       //  Building JSON with the information in every line
        const dataForLine = {
            [listOfHeaders[1]]: listOfLineContents[1],
            [listOfHeaders[2]]: listOfLineContents[2],
            [listOfHeaders[3]]: listOfLineContents[3]
        }
        return {
            [listOfHeaders[0]]: listOfLineContents[0],
            lines: [...JSONToBeBuilt.lines, dataForLine]
        }
    }, {lines: []})
};

// Exporting
module.exports = {JSONFromCSV}