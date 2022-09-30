import Controls from "../interface/Controls.js";

function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();

    return false;
}

const DMModal = {
    createModal(title, descr) {
        return new Promise(resolve => {
            document.body.insertAdjacentHTML('afterbegin',/*html*/`
            <div class="modal__overlay animated-between" data-overlay="true">
                <div class="modal" data-modal="true">
                    <div class="modal__body">
                        <h1 class="modal__title">${title}</h1>
                        <p class="modal__descr">${descr}</p>
                    </div>
                    <div class="modal__controls">
                        <button class="btn modal__button btn--start">OK</button>
                        <button class="btn modal__button btn--reset">Cancel</button>
                    </div>
                </div>
            </div>
            `);
            if (document.querySelector('.modal')) resolve();
        })
    },
    async open({ title = 'Warning!', descr = 'Do you want to reset current timer?', timerFactory }) {
        await this.createModal(title, descr);
        const overlay = document.querySelector('.modal__overlay')
        this.addButtonListeners(timerFactory)
        this.addOverlayListener(overlay, timerFactory)
        setTimeout(() => overlay.classList.remove('animated-between'), 1)
        this.disableScroll(overlay);
    },
    close(timerFactory, action) {
        const overlay = document.querySelector('.modal__overlay')
        this.enableScroll(overlay)
        overlay.remove();
        if (action === 'reset') timerFactory.fullReset()
        if (action === 'nothing') timerFactory.noop()
    },
    addButtonListeners(timerFactory) {
        const { acceptBtn, declineBtn } = Controls.modal.buttons();
        acceptBtn.addEventListener('click', () => this.close(timerFactory, 'reset'))
        declineBtn.addEventListener('click', () => this.close(timerFactory, 'nothing'))
    },
    addOverlayListener(overlay, timerFactory) {
        overlay.addEventListener('click', e => {
            const target = e.target
            if (target.dataset.overlay) {
                this.close(timerFactory, 'nothing')
            }
        })
    },
    enableScroll(element) {
        element.removeEventListener('wheel', preventScroll);
    },
    disableScroll(element) {
        element.addEventListener('wheel', preventScroll);
    }
}

export default DMModal;
