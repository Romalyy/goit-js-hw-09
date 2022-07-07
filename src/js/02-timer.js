import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const dateInput = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

buttonStart.addEventListener('click', () => timer.start());

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

let selectedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notify.failure('Please choose a date in the future');
            selectedDates[0] = new Date();
        } else {
            buttonStart.disabled = false;
            selectedTime = selectedDates[0];
      }
    console.log(selectedDates[0]);
  },
};

class Timer {
    constructor() {
        this.timerID = null;
        this.isActive = false;
        buttonStart.disabled = true;
    }
    start() {
        if(this.isActive) {
        return;
        }
        this.isActive = true;
        this.timerID = setInterval(() => {
        const thisTime = Date.now();
        const averageTime = selectedTime - thisTime;
        const componentsTimer = convertMs(averageTime);
        this.updateComponentsTimer(componentsTimer);
        if (averageTime <= 0) {
            this.stopTimer();
        }
        }, 1000);
    }
    updateComponentsTimer({days, hours, minutes, seconds}) {
        daysValue.textContent = addLeadingZero(days);
        hoursValue.textContent = addLeadingZero(hours);
        minutesValue.textContent = addLeadingZero(minutes);
        secondsValue.textContent = addLeadingZero(seconds);

    }
    stopTimer() {
        clearInterval(this.timerID);
  }
}

const timer = new Timer();
flatpickr(dateInput, options);