import { DMCountDownTimer, DMPomodoroTimer, DMStopWatchTimer } from "./timer.js";
import { SAVE, START, STOP, RESET } from "../typization/typer.js";
import { pomodoreModeSwitcher } from "./pomodoroModes.js";

export default class DMTimerFactory {
    constructor() {
        this.countDown = new DMCountDownTimer();
        this.stopWatch = new DMStopWatchTimer();
        this.pomodoro = new DMPomodoroTimer(pomodoreModeSwitcher);
    }

    countDownAction(action) {
        switch (action) {
            case START: this.countDown.dmTimerInit()
                break
            case STOP: this.countDown.timeStopper(STOP)
                break
            case RESET: this.countDown.timeStopper(RESET)
                break
        }
    }

    stopWatchAtion(action) {
        switch (action) {
            case START: this.stopWatch.dmTimerInit()
                break
            case STOP: this.stopWatch.timeStopper(STOP)
                break
            case RESET: this.stopWatch.timeStopper(RESET)
                break
            case SAVE: this.stopWatch.saveTimerValue()
                break
        }
    }

    pomodoroAction(action) {
        switch (action) {
            case START:
                this.pomodoro = new DMPomodoroTimer(pomodoreModeSwitcher)
                this.pomodoro.dmTimerInit()
                break
            case STOP: this.pomodoro.timeStopper(STOP)
                break
            case RESET: this.pomodoro.timeStopper(RESET)
                break
        }
    }

    fullReset() {
        this.countDown.timeStopper(RESET)
    }

    fullStop() {
        this.countDown.timeStopper(STOP)
        this.stopWatch.timeStopper(STOP)
        this.pomodoro.timeStopper(STOP)
    }

    noop() { }
}

