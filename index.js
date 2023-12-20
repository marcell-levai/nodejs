const childProcess = require('child_process');
const os = require('os');
const fs = require('fs');

const updateInterval = 100;
const logInterval = 1000;
const logFilePath = 'activityMonitor.log';

function getCommand(){
    if(os.platform() === 'win32'){
        return 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"';
    }
    return 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
}

function executeCommand(command){
    return new Promise((resolve, reject) => {
        childProcess.exec(command, (error, stdout) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
}

async function activityMonitor(){
    const command = getCommand();
    
    setTimeout(async () => {
        const logContainer = [];
        if(!fs.existsSync(logFilePath)){
            fs.writeFileSync(logFilePath, '');
        }

        setInterval(async () => {
            try{
                const result = await executeCommand(command);          
                logContainer.push(`${Math.floor(Date.now() / 1000)} ${result}\n`);
                console.clear();
                console.log(result);
            } catch {
                console.error('Error:', error.message);
            }
        }, updateInterval);

        logContainer.forEach(log => {
            fs.appendFileSync(logFilePath, log);
        });
    }, logInterval);
    
}

activityMonitor();