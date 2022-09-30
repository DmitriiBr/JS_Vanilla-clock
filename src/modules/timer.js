import Controls from "../interface/Controls.js";
import Elements from "../interface/Elements.js";
import { RESET, STOP } from "../typization/typer.js";

import {
  calculateMilliSeconds,
  calculateSeconds,
  calculateMinutes,
  calculateHours,
} from "./utils.js";

let timer;
let timeInput = 0;
let cacheInput = 0;
let progressBarCache = 0;

export class DMCountDownTimer {
  constructor() {
    this.startBtn = Controls.countDown.startBtn
    this.stopBtn = Controls.countDown.stopBtn
    this.inputField = Elements.inputField
  }

  timerStart() {
    this.startBtn.classList.add('unclickable')
    this.stopBtn.classList.remove('unclickable')
    this.saveBtn ? this.saveBtn.classList.remove('unclickable') : null
  }

  timerPause() {
    this.startBtn.classList.remove('unclickable')
    this.stopBtn.classList.add('unclickable')
    this.saveBtn ? this.saveBtn.classList.add('unclickable') : null
  }

  timerReset() {
    Object.values(Elements.clockValue).forEach(value => {
      value.textContent = '00'
    })

    return this.timerPause()
  }

  inputError(errorState) {
    let err = document.querySelector('.input-error')
    if (err) err.remove();

    document.body.insertAdjacentHTML('afterbegin', `<div class="input-error show">${errorState}</div>`)

    return new Promise((resolve) => {
      setTimeout(() => {
        document.querySelector('.input-error').classList.remove('show')
        resolve();
      }, 1000)
    })
  }

  dmTimerInit() {
    const inputValue = +this.inputField.value

    if (inputValue || cacheInput) {
      if (!inputValue) {
        timeInput = cacheInput ? cacheInput : inputValue * 60
      } else {
        timeInput = inputValue * 6000
        progressBarCache = timeInput
      }

      cacheInput = 0
      progressBarCache = !progressBarCache ? timeInput : progressBarCache
      this.clockColorizer('green')
      this.timerStart()
      this.countDownStart()

      Elements.inputField.value = ''
      timer = setInterval(this.countDownStart.bind(this), 10)

    } else if (!this.inputFieldValue && !cacheInput) {
      return this.inputError('You have to fill the field!')
    }
  }

  insertValues() {
    Elements.clockValue.miliSeconds.innerHTML = calculateMilliSeconds(timeInput)
    Elements.clockValue.seconds.innerHTML = calculateSeconds(timeInput)
    Elements.clockValue.minutes.innerHTML = calculateMinutes(timeInput)
    Elements.clockValue.hours.innerHTML = calculateHours(timeInput)
  }

  countDownStart() {
    this.insertValues()

    if (timeInput === 0) {
      return this.timeStopper(RESET)
    }

    timeInput--;
    this.progressBar()
  }

  clockColorizer(color) {
    const clockValues = Object.values(Elements.clockValue)
    const colorAllValues = hash => clockValues.forEach(value => value.style.color = hash);
    switch (color) {
      case 'red':
        colorAllValues('#ff6b90');
        break
      case 'green':
        colorAllValues('#8884FF');
        break
      case 'black':
        colorAllValues('#070707');
        break
    }
  }

  timeStopper(type) {
    switch (type) {
      case STOP:
        clearInterval(timer)
        cacheInput = timeInput
        this.timerPause()
        break
      case RESET:
        Elements.progressBar.style.width = 0 + '%'
        clearInterval(timer)
        this.clockColorizer('black')
        timeInput = 0
        cacheInput = 0
        progressBarCache = 0

        if (this.sessionsCount) this.sessionsCount[0] = this.sessionsCount[1];
        if (this.setSwitches) this.setSwitches('enable');

        this.timerReset()
        this.modeSwitcher = false
        break
      case 'reNew':
        clearInterval(timer)
        timeInput = 0
        cacheInput = 0
        progressBarCache = 0
        if (this.sessionsCount) {
          this.sessionsCount[0] === 0 ? this.sessionsCount[0] = this.sessionsCount[1] : null
        }
        Elements.progressBar.style.width = 0 + '%'
        break
    }
  }

  progressBar() {
    const percent = Math.floor(progressBarCache / 100)
    Elements.progressBar.style.width = timeInput / percent + '%'
  }
}

export class DMStopWatchTimer extends DMCountDownTimer {
  constructor() {
    super()
    this.startBtn = Controls.stopWatch.startBtn;
    this.saveBtn = Controls.stopWatch.saveBtn;
    this.resetBtn = Controls.stopWatch.resetBtn;
    this.stopBtn = Controls.stopWatch.stopBtn;

    this.listOfValues = 0
  }

  dmTimerInit() {
    if (cacheInput) timeInput = cacheInput

    cacheInput = 0
    this.clockColorizer('green')
    this.countDownStart()
    this.timerStart()

    timer = setInterval(this.countDownStart.bind(this), 10)
    console.log('FROM STOPWATCH: ', timeInput, cacheInput)
  }

  countDownStart() {
    this.insertValues()

    timeInput++
  }

  saveTimerValue() {
    if (timeInput > 0) {
      Elements.savedTime.insertAdjacentHTML('beforeend', `
            <div class="saved-time__value">
                ${calculateHours(timeInput)}:
                ${calculateMinutes(timeInput)}:
                ${calculateSeconds(timeInput)}:
                ${calculateMilliSeconds(timeInput)}
            </div>
      `)

      this.listOfValues++
      if (this.listOfValues > 5) document.querySelector('.saved-time__value').remove()
    }
  }
}

export class DMPomodoroTimer extends DMCountDownTimer {
  constructor({ sessionTime = 0.1, breakTime = 0.1, sessionsCount = 2 }) {
    super()
    this.startBtn = Controls.pomodoro.startBtn
    this.stopBtn = Controls.pomodoro.stopBtn
    this.sessionTime = sessionTime * 6000
    this.breakTime = breakTime * 6000
    this.sessionsCount = [sessionsCount, sessionsCount]

    this.modeSwitcher = false
  }

  dmTimerInit() {
    if (cacheInput) timeInput = cacheInput
    if (this.modeSwitcher == false && !cacheInput) {
      this.setSwitches('disable')
      timeInput = this.sessionTime
      this.clockColorizer('green')
      progressBarCache = this.sessionTime
    }

    if (this.modeSwitcher == true && !cacheInput) {
      timeInput = this.breakTime
      this.clockColorizer('red')
      progressBarCache = this.breakTime
    }

    cacheInput = 0
    // progressBarCache = !progressBarCache ? this.sessionTime : progressBarCache
    this.countDownStart()
    this.timerStart()

    if (this.modeSwitcher == true) timer = setInterval(this.pomodoroBreak.bind(this), 10)
    if (this.modeSwitcher == false) timer = setInterval(this.countDownStart.bind(this), 10)
  }

  pomodoroBreak() {
    this.insertValues()
    if (this.sessionsCount[0] === 0) return this.timeStopper(RESET)
    timeInput--;

    this.progressBar()
    if (timeInput === 0 && this.modeSwitcher == true) {
      this.timeStopper('reNew')
      this.insertValues()
      timeInput = this.sessionTime
      this.modeSwitcher = false
      this.dmTimerInit()
    }
  }

  countDownStart() {
    this.insertValues()
    timeInput--;
    this.progressBar()
    if (timeInput === 0 && this.modeSwitcher == false) {
      this.timeStopper('reNew')
      this.insertValues()
      this.sessionsCount[0]--
      timeInput = this.breakTime
      this.modeSwitcher = true
      this.dmTimerInit()
    }
  }

  setSwitches(action) {
    switch (action) {
      case 'disable':
        Controls.pomodoro.btnSwitches.forEach(btn => {
          btn.setAttribute('disabled', '')
          btn.classList.add('unclickable')
        })
        break
      case 'enable':
        Controls.pomodoro.btnSwitches.forEach(btn => {
          btn.removeAttribute('disabled')
          btn.classList.remove('unclickable')
        })
        break
    }
  }
}