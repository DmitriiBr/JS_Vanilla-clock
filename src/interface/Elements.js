
const Elements = {
   modesContainer: document.querySelector('.modes--container'),
   clockValue: {
      miliSeconds: document.querySelector('.miliseconds'),
      seconds: document.querySelector('.seconds'),
      minutes: document.querySelector('.minutes'),
      hours: document.querySelector('.hours'),
   },
   savedTime: document.querySelector('.saved-time'),
   inputField: document.querySelector('.time-input'),
   modeWrapper: document.querySelectorAll('.mode-wrapper'),
   progressBar: document.querySelector('.progress-bar')
}

export default Elements;