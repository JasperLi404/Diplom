const accordion = (name) => {    
    const container = document.querySelector(name),
          panelHeading = container.querySelectorAll('.panel-heading'),
          panelCollapse = container.querySelectorAll('.panel-collapse');
          
    const moveToBlock = event => {
        let  eventId;
        const target = event.target;
        let parent = target;
        event.preventDefault();        
        if(target.classList.contains('panel-heading')) eventId = target.id;
        else if(target.closest('.panel-heading')){
           while(!parent.classList.contains('panel-heading')){
               parent = parent.parentNode;
           }
           eventId = parent.id;
        }
        panelCollapse.forEach(elem => {
            let attr = elem.getAttribute('aria-labelledby');
            elem.style.display = 'none';
            if(attr === 'headingOne' && eventId != attr) attr += '-two';
            if(eventId == attr){
                elem.style.display = 'flex';
            }
        });
    }
    panelHeading.forEach(item => {
        item.addEventListener('click', moveToBlock);
    });

}
export default accordion;