let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let alarmSound = new Audio('alarm.mp3'); // Replace with your alarm sound file path

// Timer elements
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Button elements
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

// Alarm elements
const alarmCheckbox = document.getElementById('alarm-checkbox');
const alarmTimeInput = document.getElementById('alarm-time');
const alarmButton = document.getElementById('alarm-button');

// Event listeners for buttons
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
alarmCheckbox.addEventListener('change', toggleAlarmTimeInput);
alarmButton.addEventListener('click', setAlarm);

// Start button click event handler
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 1000);
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
  }
}

// Pause button click event handler
function pauseTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timerInterval);
    startButton.disabled = false;
    pauseButton.disabled = true;
  }
}

// Reset button click event handler
function resetTimer() {
  if (!isRunning) {
    elapsedTime = 0;
    updateTimerDisplay();
    startButton.disabled = false;
    resetButton.disabled = true;
  }
}

// Update the timer display
function updateTimer() {
  const now = Date.now();
  elapsedTime = now - startTime;
  updateTimerDisplay();

  // Check if alarm time has passed
  if (alarmCheckbox.checked && alarmTimeInput.value && elapsedTime >= getAlarmTimeInMillis()) {
    triggerAlarm();
  }
}

// Update the timer display with the elapsed time
function updateTimerDisplay() {
  const hours = Math.floor(elapsedTime / 3600000);
  const minutes = Math.floor((elapsedTime % 3600000) / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);

  hoursElement.textContent = padTime(hours);
  minutesElement.textContent = padTime(minutes);
  secondsElement.textContent = padTime(seconds);
}

// Pad single digit time values with leading zero
function padTime(time) {
  return String(time).padStart(2, '0');
}

// Toggle visibility of alarm time input based on checkbox state
function toggleAlarmTimeInput() {
  const alarmTimeInputContainer = document.getElementById('alarm-time-container');
  alarmTimeInputContainer.style.display = alarmCheckbox.checked ? 'block' : 'none';
}

// Get alarm time in milliseconds from input value
function getAlarmTimeInMillis() {
  const alarmTimeString = alarmTimeInput.value;
  const [hours, minutes] = alarmTimeString.split(':').map(Number);
  const alarmTime = new Date();
  alarmTime.setHours(hours, minutes, 0, 0);
  return alarmTime.getTime();
}

// Set alarm and trigger it when the time comes
function setAlarm() {
  const alarmTimeInMillis = getAlarmTimeInMillis();
  const currentTimeInMillis = Date.now();
  const timeUntilAlarmInMillis = alarmTimeInMillis - currentTimeInMillis;

  if (timeUntilAlarmInMillis <= 0) {
    alert('Please set a valid alarm time and try again.');
    return;
    }
    
    setTimeout(triggerAlarm, timeUntilAlarmInMillis);
    }
    
    // Trigger the alarm
    function triggerAlarm() {
    if (alarmCheckbox.checked && alarmTimeInput.value) {
    alarmSound.play();
    alert('Time is up!'); // Replace with your desired alarm action
    }
    }