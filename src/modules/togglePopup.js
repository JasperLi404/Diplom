const togglePopup = (elem) => {
    event.preventDefault();
    elem.style.display = 'flex';
    elem.addEventListener('click', event => {
        const target = event.target;
        if(elem.style.display == 'flex'){
        if(!target.closest('.capture-form') || target.classList.contains('popup-close')){
            elem.style.display = 'none';
        }
    }
});
}
export default togglePopup;