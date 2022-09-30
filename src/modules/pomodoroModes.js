import Controls from "../interface/Controls.js";
import Elements from "../interface/Elements.js";
import { modalOpenTimerStop } from "./utils.js";

const pomodoroModes = [
    { sessionTime: 25, breakTime: 5, sessionsCount: 4 },
    { sessionTime: 50, breakTime: 10, sessionsCount: 4 },
    { sessionTime: 60, breakTime: 15, sessionsCount: 4 }
]

const btnSwitches = Controls.pomodoro.btnSwitches;

btnSwitches.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!+Elements.clockValue.miliSeconds.textContent) {
            btnSwitches.forEach(sw => sw.classList.remove('highlighted'))
            btn.classList.add('highlighted');
            pomodoreModeSwitcher = pomodoroModes[btn.dataset.switch];
        } else {
            modalOpenTimerStop();
        }
    })
})

export let pomodoreModeSwitcher = pomodoroModes[0]
