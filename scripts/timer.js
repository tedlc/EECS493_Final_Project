const FULL_DASH_ARRAY = 283;

let timeLimit = 0;
let timePassed = 0;
let timeLeft = timeLimit;
let timerInterval = null;
let isPaused = true;
let cleared = true;

document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer_svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer_circle">
      <circle class="base-timer_path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer_path-remaining purple"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer_label">${formatTime(
  timeLeft
)}</span>
</div>
<div class="buttons">
  <button class="timer-button" id="thirty">+30min</button>
  <button class="timer-button" id="five">+5min</button>
  <button class="timer-button" id="start">Start</button>
  <button class="timer-button" id="stop">Stop</button>
  <button class="timer-button" id="reset">Reset</button>
</div>
`;

init();

function init() {
  document.getElementById("thirty").onclick = () => {
    timeLeft += 30 * 60;
    timeLimit = timeLeft;
    updateTimer();
  };
  document.getElementById("five").onclick = () => {
    timeLeft += 5 * 60;
    timeLimit = timeLeft;
    updateTimer();
  };
  document.getElementById("start").onclick = () => {
    if (timeLeft > 0) {
      isPaused = false;
      if (cleared) {
        cleared = false;
        startTimer();
      }
    }
  }
  document.getElementById("stop").onclick = () => {
    isPaused = true;
  }
  document.getElementById("reset").onclick = () => {
    isPaused = true;
    timeLeft = 0;
    timeLimit = timeLeft;
    updateTimer();
    onTimesUp();
  }
}

function updateTimer() {
  document.getElementById("base-timer-label").innerHTML = formatTime(
    timeLeft
  );
  setCircleDasharray();
}

function onTimesUp() {
  clearInterval(timerInterval);
  cleared = true;
  timeLeft = 0;
  updateTimer();
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (!isPaused) {
      if (timeLeft >= 0.1) {
        timeLeft -= 0.1;
      } else {
        onTimesUp();
      }
      updateTimer();
    }
  }, 100);
}

function formatTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = Math.floor(time % 60);

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / timeLimit;
  return rawTimeFraction;
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}