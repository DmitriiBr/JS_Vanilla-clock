
const Controls = {
   countDown: {
      startBtn: document.querySelector('.btn--start.countdown-timer__btn'),
      stopBtn: document.querySelector('.btn--stop.countdown-timer__btn'),
      resetBtn: document.querySelector('.btn--reset.countdown-timer__btn')
   },
   stopWatch: {
      startBtn: document.querySelector('.btn--start.stopwatch-timer__btn'),
      stopBtn: document.querySelector('.btn--stop.stopwatch-timer__btn'),
      resetBtn: document.querySelector('.btn--reset.stopwatch-timer__btn'),
      saveBtn: document.querySelector('.btn--save.stopwatch-timer__btn'),
   },
   pomodoro: {
      startBtn: document.querySelector('.btn--start.pomodoro-timer__btn'),
      stopBtn: document.querySelector('.btn--stop.pomodoro-timer__btn'),
      resetBtn: document.querySelector('.btn--reset.pomodoro-timer__btn'),
      btnSwitches: document.querySelectorAll('.btn--switch')
   },
   bodyControls: {
      rollBtn: document.querySelector('.btn-roll'),
      modeOverlay: document.querySelectorAll('.mode-overlay')
   },
   modal: {
      buttons() {
         return {
            acceptBtn: document.querySelector('.modal__button.btn--start'),
            declineBtn: document.querySelector('.modal__button.btn--reset'),
         }
      }
   }
}

export default Controls;
