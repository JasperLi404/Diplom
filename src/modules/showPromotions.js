import togglePopup from './togglePopup.js';
const showPromotions = () => {
    const btnMore = document.querySelector('.add-sentence-btn'), 
          hiddenElements = document.querySelectorAll('.hidden'),
          discountBtn = document.querySelectorAll('.discount-btn'),
          popupDiscount = document.querySelector('.popup-discount'),
          checkBtn = document.querySelector('.check-btn'),
          popupCheck = document.querySelector('.popup-check'),
          visible = document.querySelector('.visible-sm-block');

    checkBtn.addEventListener('click', () => {
        togglePopup(popupCheck);
    });
    discountBtn.forEach(item => {
        item.addEventListener('click', () =>{
            togglePopup(popupDiscount);
        });
    });
    btnMore.addEventListener('click', event => {
        event.target.style.display = 'none';
        visible.classList.toggle('visible-sm-block');
        hiddenElements.forEach(item => item.classList.toggle('hidden'));
    });
}
export default showPromotions;