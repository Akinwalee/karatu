
let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerInterval = null;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');

function runTime() {
    milliseconds += 10;

    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    updateDisplay();
}

function updateDisplay() {
    let h = String(hours).padStart(2, '0');
    let m = String(minutes).padStart(2, '0');
    let s = String(seconds).padStart(2, '0');

    display.innerHTML = `${h}:${m}:${s}`;
}


function toggleTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    } else {
        if (timerInterval !== null) { clearInterval(timerInterval); }
        
        timerInterval = setInterval(runTime, 10);
    }
}


function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;

    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    
    display.innerHTML = '00:00:00';

    startStopBtn.innerHTML = 'start/stop';
}

updateDisplay();