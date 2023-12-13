const fs = require('fs');
const { Module } = require('module');
const tsvString = fs.readFileSync('data.tsv', 'utf8');

// const seedJTsv = [
//     {}
// ]

const tsvLines = tsvString.split('\n');
const headerRow = tsvLines.shift();
const headerKeys = headerRow.split('\t'); 

// function name(params) {
    
// }
function parseDataRow(row) {
    // Split the data row into an array of values
    const data = row.split('\t');

    // Create an empty object
    const obj = {};
  
    // Loop through each key and value
    for (let i = 0; i < headerKeys.length; i++) {
      obj[headerKeys[i]] = data[i]; // Assign value to key in object
    }
  
    return obj;
  }
  const dataObjects = tsvLines.map(parseDataRow);
  //console.log(dataObjects)
  const jsString = JSON.stringify(dataObjects, null, 2);
fs.writeFileSync('dataArr.js', jsString, 'utf8');
module.exports = {dataObjects}
  