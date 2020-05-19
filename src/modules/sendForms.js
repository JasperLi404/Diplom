import {calculate} from './calculatorAccordion.js'
import {question} from './getConsultation.js';
const sendForms = () => {
    const inputEl = document.querySelectorAll('input');   
    const MergeRecursive = (obj1,data) => {
        for (let p in data) {
          try {
            if ( data[p].constructor==Object ) obj1[p] = MergeRecursive(obj1[p], data[p])
            else  obj1[p] = data[p]
          } catch(e) {
              obj1[p] = data[p];
        }
    }
    return obj1;
    };
    const POSTData = body => {
        return fetch('./server.php', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)
        });
    }; 
    const validationForm = event =>{
        const target = event.target;
        if(target.name == 'user_name'){
            target.value = target.value.replace(/[a-zA-Z0-9]/g, '');
        } else if(target.name == 'user_phone'){
            let val = target.value.replace(/(\D|[a-zA-ZА-Яа-я])/g, '');
            target.value ='+'+ val;
        }
    };
    let data = {};
    const sendForm = (location,data) => {
        let body;
        const form = location;
        const statusMessage = document.createElement('div');
        const obj = {};
        const clearInput = () => {
            const elementsForm = [...form.elements].filter(item => {
                return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
            });
            elementsForm.forEach(item => item.value = '');
         }; 
         
        const formData = new FormData(form),
              errorMessage  = 'Что то пошло не так...',
              successMessage = "Спасибо! Мы скоро с Вами свяжемся"; 
        statusMessage.classList.add('status-message');
        form.appendChild(statusMessage);
        formData.forEach((val,key) => {
           obj[key] = val;
       });
       statusMessage.textContent = 'Загрузка...';
       body = MergeRecursive(obj,data);
       POSTData(body)
       .then((response) => {
           if(response.status !== 200){
               throw new Error('network status isn`t 200');
           }
           statusMessage.textContent = successMessage;
           setTimeout(() =>  statusMessage.parentNode.removeChild(statusMessage), 3000);
           clearInput();
           
       })
       .catch(() => {
           statusMessage.textContent = errorMessage;
           setTimeout(() =>  statusMessage.parentNode.removeChild(statusMessage), 3000);
           clearInput();
        });
    }

    
    inputEl.forEach(item => item.addEventListener('input', validationForm));
    window.addEventListener('click', event => {
        const target = event.target;
        if(target.classList.contains('call-btn')) data = calculate;
        else if(target.classList.contains('consultation-btn')) data = question;
    });    
    window.addEventListener('submit', event => {
        event.preventDefault();
        const target = event.target,
            parent = target.parentNode,
            form = parent.querySelector('form');
            sendForm(form, data);
    });  
   
}
export default sendForms;
