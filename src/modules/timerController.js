import { RESET, SAVE, START, STOP } from "../typization/typer.js";
import DMTimerFactory from "./timerFactory.js";

const timerFactory = new DMTimerFactory()

export const TimerController = {
    timerModes: {
        actionsList: [
            START,
            STOP,
            RESET,
            SAVE
        ],
        addListeners(action, { startBtn, stopBtn, resetBtn, saveBtn }, modeNameAndAction) {
            const modeControls = [startBtn, stopBtn, resetBtn, saveBtn].filter(el => el !== undefined);
            switch (modeNameAndAction) {
                case 'count-down':
                    modeNameAndAction = timerFactory.countDownAction.bind(timerFactory)
                    break
                case 'stop-watch':
                    modeNameAndAction = timerFactory.stopWatchAtion.bind(timerFactory)
                    break
                case 'pomodoro':
                    modeNameAndAction = timerFactory.pomodoroAction.bind(timerFactory)
                    break
            }
            //adding listeners in loop
            modeControls
                .forEach((button, i) => {
                    button.addEventListener(action,
                        () => modeNameAndAction(this.actionsList[i]))
                })
        },
    },
}

