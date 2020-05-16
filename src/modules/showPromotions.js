import togglePopup from './togglePopup.js';
const showPromotions = () => {
    const btnMore = document.querySelector('.add-sentence-btn'), 
          hiddenElements = document.querySelectorAll('.hidden'),
          discountBtn = document.querySelectorAll('.discount-btn'),
          popupDiscount = document.querySelector('.popup-discount');


    discountBtn.forEach(item => {
        item.addEventListener('click', () =>{
            togglePopup(popupDiscount);
        });
    })
    btnMore.addEventListener('click', event => {
        event.target.style.display = 'none';
        hiddenElements.forEach(item => item.classList.toggle('hidden'));
    })
}
export default showPromotions;