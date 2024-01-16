const csv = require('csvtojson');
const fs = require('fs');
const { pipeline } = require('stream');

const csvFilePath = './csvdirectory/data.csv';
const txtFilePath = './csvdirectory/data.txt';

pipeline(
  fs.createReadStream(csvFilePath),
  csv(),
  fs.createWriteStream(txtFilePath),
  (error) => {
    if (error) {
      console.error('An error occurred:', error);
    } else {
      console.log('CSV file converted to JSON and written to a new text file successfully.');
    }
  }
);