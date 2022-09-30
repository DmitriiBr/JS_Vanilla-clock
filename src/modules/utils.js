import Controls from "../interface/Controls.js";
import Elements from "../interface/Elements.js";
import DMTimerFactory from "./timerFactory.js";
import DMModal from "./modal.js";

const formatter = time => time < 10 ? `0${time}` : `${time}`

export function calculateMilliSeconds(timeInput) {
    return formatter(Math.floor(timeInput % 100))
}

export function calculateSeconds(timeInput) {
    return formatter(Math.floor((timeInput / 100) % 60))
}

export function calculateMinutes(timeInput) {
    return formatter(Math.floor((timeInput / 6000) % 60))
}

export function calculateHours(timeInput) {
    return formatter(Math.floor(timeInput / 360000) % 60)
}

export const rollDownAndUp = () => {
    const modesContainer = document.querySelector('.modes--container')
    Controls.bodyControls.rollBtn.classList.toggle('animated-between')

    if (modesContainer.classList.contains('hidden')) {
        modesContainer.classList.remove('hidden')
        setTimeout(() => {
            modesContainer.classList.add('animated-between')
        }, 10)
    } else {
        modesContainer.classList.remove('animated-between')
        setTimeout(() => modesContainer.classList.add('hidden'), 300)
    }
}

export const modalOpenTimerStop = () => {
    const timerFactory = new DMTimerFactory()
    timerFactory.fullStop()

    DMModal.open({ timerFactory })
}

const modeHighlighter = mode => {
    Elements.modeWrapper.forEach(wrapper => wrapper.classList.remove('active'))
    Elements.modeWrapper[mode.dataset.index].classList.add('active')
}

export const overlayMover = mode => {
    mode.addEventListener('click', () => {
        const valueOfMiliseconds = +Elements.clockValue.miliSeconds.textContent
        if (valueOfMiliseconds > 0) {
            modalOpenTimerStop()
        } else {
            Controls.bodyControls.modeOverlay
                .forEach(item => item.classList.add('mode-overlay--show'))
            modeHighlighter(mode)
            mode.classList.remove('mode-overlay--show')
        }
    })
}