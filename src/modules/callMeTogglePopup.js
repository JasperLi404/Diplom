const callMeTogglePopup = () => {
    const callBtn = document.querySelectorAll('.call-btn'),
          popupCall = document.querySelector('.popup-call');
    const callMe = event => {
        event.preventDefault();
        popupCall.style.display = 'flex';
    }
    callBtn.forEach(item => {
        item.addEventListener('click', callMe.bind(this));
    });
    popupCall.addEventListener('click', event => {
            const target = event.target;
            if(popupCall.style.display == 'flex'){
            if(!target.closest('.capture-form') || target.classList.contains('popup-close')){
                popupCall.style.display = 'none';
            }
        }
    });
}
export default callMeTogglePopup;