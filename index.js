const childProcess = require('child_process');
const os = require('os');
const fs = require('fs');

const updateInterval = 100;
const logInterval = 60;
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

function getCurrentTime() {
    return Math.floor(Date.now() / 1000);
}

async function activityMonitor(){
    const command = getCommand();
    let previousLogTime = getCurrentTime();

    if (!fs.existsSync(logFilePath)) {
        fs.writeFileSync(logFilePath, '');
    }

    setInterval(async () => {
        try{
            const result = await executeCommand(command);          
            console.clear();
            console.log(result);

            const currentTime = getCurrentTime();
            const log = `${currentTime}: ${result.trim()}\n`;

            if (currentTime - previousLogTime >= logInterval) {
                fs.appendFileSync(logFilePath, log);
                previousLogTime = currentTime;
            }
        } catch {
            console.error('Error:', error.message);
        }
    }, updateInterval);
    
}

activityMonitor();