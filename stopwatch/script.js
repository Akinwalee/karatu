// 1. Time Variables
let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerInterval = null; // Stores the setInterval reference
let lapCounter = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');
const themeToggle = document.getElementById('themeToggle');

/**
 * The core function that increments the time variables
 */
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

/**
 * Formats the time and updates the display element
 */
function updateDisplay() {
    // Helper to pad numbers with leading zeros
    let h = String(hours).padStart(2, '0');
    let m = String(minutes).padStart(2, '0');
    let s = String(seconds).padStart(2, '0');
    // Milliseconds are padded to 2 digits (10ms intervals)
    let ms = String(Math.floor(milliseconds / 10)).padStart(2, '0');

    // Update the display (H:M:S.MS)
    display.innerHTML = `${h}:${m}:${s}.${ms}`;
}

/**
 * Starts the stopwatch.
 */
function startTimer() {
    // Clear any existing interval to prevent multiple timers
    if (timerInterval !== null) {
        clearInterval(timerInterval);
    }
    // Set the new interval (runs runTime() every 10ms)
    timerInterval = setInterval(runTime, 10);

    // Update button states
    startBtn.disabled = true;
    stopBtn.disabled = false;
    lapBtn.disabled = false;
}

/**
 * Pauses the stopwatch.
 */
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;

    // Update button states
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
}

/**
 * Resets the stopwatch.
 */
function resetTimer() {
    // Stop the timer
    clearInterval(timerInterval);
    timerInterval = null;

    // Reset time variables
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    lapCounter = 1;

    // Update display to 00:00:00.00
    display.innerHTML = '00:00:00.00';

    // Clear the lap list
    lapsList.innerHTML = '';

    // Update button states
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
}

/**
 * Records the current split time.
 */
function recordLap() {
    if (timerInterval === null) return; // Only record laps while running

    const currentTime = display.innerHTML; // Get the currently displayed time

    const lapItem = document.createElement('li');
    lapItem.innerHTML = `
        <span>Lap ${lapCounter}:</span>
        <span>${currentTime}</span>
    `;

    lapsList.prepend(lapItem); // Add the new lap to the top of the list
    lapCounter++;
}

/**
 * Toggles between light and dark themes.
 */
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = 'Light Mode';
    } else {
        themeToggle.innerHTML = 'Dark Mode';
    }
}

// Initialize button states on load
stopBtn.disabled = true;
lapBtn.disabled = true;