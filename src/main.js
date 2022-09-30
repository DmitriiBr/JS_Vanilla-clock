import { DMCountDownTimer } from "./modules/timer.js";
import Controls from "./interface/Controls.js";
import Elements from "./interface/Elements.js";
import { rollDownAndUp, overlayMover } from "./modules/utils.js";
import { TimerController } from "./modules/timerController.js";

const countingTimer = new DMCountDownTimer()

TimerController.timerModes.addListeners('click', Controls.countDown, 'count-down')
TimerController.timerModes.addListeners('click', Controls.stopWatch, 'stop-watch')
TimerController.timerModes.addListeners('click', Controls.pomodoro, 'pomodoro')

Controls.bodyControls.rollBtn.addEventListener('click', rollDownAndUp)
Controls.bodyControls.modeOverlay.forEach(mode => overlayMover(mode))

Elements.inputField.addEventListener('keyup', function (event) {
    if (event.keyCode == 13) {
        event.preventDefault()
        countingTimer.timeStopper('reset')
        countingTimer.dmTimerInit()
    }
})