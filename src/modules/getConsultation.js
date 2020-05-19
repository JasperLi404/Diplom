import togglePopup from './togglePopup.js';
export {question}
const question={};
const getConsultation = () => {
    const consultBtn = document.querySelector('.consultation-btn'),
          popupConsult = document.querySelector('.popup-consultation'),
          directInput = document.querySelector('.director-form>input');
    
    directInput.addEventListener('input', event => {
        const target = event.target;
        target.value = target.value.replace(/[a-zA-Z0-9]/g, '');
        question[target.name] = target.value;
    });

    consultBtn.addEventListener('click', ()=> {
        togglePopup(popupConsult);
    });
}
export default getConsultation;