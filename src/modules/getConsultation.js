import togglePopup from './togglePopup.js';
import sendForms from './sendForms.js';
const getConsultation = () => {
    const consultBtn = document.querySelector('.consultation-btn'),
          popupConsult = document.querySelector('.popup-consultation'),
          directInput = document.querySelector('.director-form>input');
    const data={};
    directInput.addEventListener('input', event => {
        const target = event.target;
        target.value = target.value.replace(/[a-zA-Z0-9]/g, '');
        data[target.name] = target.value;
    });
    consultBtn.addEventListener('click', ()=> {
        togglePopup(popupConsult);
        sendForms('capture-form', data);
    });
}
export default getConsultation;