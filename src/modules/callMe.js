import togglePopup from './togglePopup.js';
const callMe = () => {
    const callBtn = document.querySelectorAll('.call-btn'),
          popupCall = document.querySelector('.popup-call');
    callBtn.forEach(item => {
        item.addEventListener('click', () =>{
            togglePopup(popupCall);
        });
    });
}
export default callMe;