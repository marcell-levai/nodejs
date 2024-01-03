const task3 = () => {
    const fs = require('fs');
    const csv = require('csvtojson');
    const readline = require('readline');
    
    const csvFilePath = './csvdirectory/data.csv';
    const txtFilePath = './csvdirectory/data.txt';
    
    const readStream = fs.createReadStream(csvFilePath);
    const writeStream = fs.createWriteStream(txtFilePath);
    
    const rl = readline.createInterface({
      input: readStream,
      output: writeStream,
      terminal: false
    });
    
    const columns = ['book', 'author', 'amount', 'price'];
    let isFirstLine = true;
    
    rl.on('line', (line) => {
      try {
        if (isFirstLine) {
          isFirstLine = false;
          return;
        }
        const modifiedLine = line.replace(/\t/g, ',');
    
        csv({ noheader: true, headers: columns })
          .fromString(modifiedLine)
          .then((jsonObj) => {
            const jsonData = JSON.stringify(jsonObj[0]);
            writeStream.write(jsonData);
            writeStream.write('\n');
          });
      } catch (error) {
        console.error('Error writing to file: ', error);
      }
    });
    
    rl.on('error', (error) => {
      console.error('Error reading file: ', error);
    });
    
    rl.on('close', () => {
      console.log('File conversion completed successfully.');
    });
}

module.exports = task3;
