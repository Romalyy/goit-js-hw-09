const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStart.addEventListener('click', () => Switcher[onBtnStart()]);
btnStop.addEventListener('click', () => Switcher[onBtnStop()]);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onChangeRandomColor(color) {
  document.body.style.backgroundColor = color;
}

class Switcher {
    constructor(onChangeRandomColor) {
        this.isActive = false;
        this.intervalID = null;
        this.onChangeRandomColor = onChangeRandomColor;
        btnStop.disabled = true;
    }
}

function onBtnStart() {
    btnStart.disabled = true;
    btnStop.disabled = false;

    if (this.isActive) {
        return;
    }
    this.isActive = true;
    this.intervalID = setInterval(() => onChangeRandomColor(getRandomHexColor()), 1000)
};

function onBtnStop() {
    btnStart.disabled = false;
    btnStop.disabled = true;

    clearInterval(this.intervalID);
    this.isActive = false;
};

const colorSwitcher = new Switcher();
