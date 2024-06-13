let startTime, updatedTime, difference, tInterval;
let running = false;
let lapNumber = 0;
let lapsList = document.getElementById('lapsList');

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        document.getElementById('startPause').innerText = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        document.getElementById('startPause').innerText = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    document.getElementById('display').innerText = '00:00:00';
    document.getElementById('startPause').innerText = 'Start';
    lapsList.innerHTML = '';
    lapNumber = 0;
}

function lap() {
    if (running) {
        let lapTime = document.getElementById('display').innerText;
        lapNumber++;
        let lapItem = document.createElement('li');
        lapItem.innerText = `Lap ${lapNumber}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    document.getElementById('display').innerText = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

document.getElementById('startPause').addEventListener('click', startPause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);
