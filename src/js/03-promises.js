import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = { position, delay };
    return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(promise);
    } else {
      reject(promise);
    }
  });
}

const form = document.querySelector('.form');
form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  let delay = Number(e.currentTarget.delay.value);
  const countStep = Number(e.currentTarget.step.value);
  const amountValue = Number(e.currentTarget.amount.value);

  for (let position = 1; position <= amountValue; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false });
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { useIcon: false });
        }, delay);
      });
    delay += countStep;
  }
}