const sendForms = (form, Data = {}) => {
    const followingForm = document.querySelectorAll(`.${form}`);
    const data = Data;
    
    
    const  MergeRecursive = (obj1) => {

        for (let p in data) {
          try {
            if ( data[p].constructor==Object ) obj1[p] = MergeRecursive(obj1[p], data[p])
            else  obj1[p] = data[p]
      
          } catch(e) {
              obj1[p] = data[p];
        }
    }
    return obj1;
    }
    const POSTData = (body) => {
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
       
    followingForm.forEach(item => {
       item.addEventListener('input', validationForm);
       item.addEventListener('submit', event =>  {
            event.preventDefault();
            let body;
            let statusMessage;
            if(!document.querySelector('.status-message')){
                statusMessage = document.createElement('div');
                statusMessage.classList.add('status-message');
                item.appendChild(statusMessage);
            } else statusMessage = document.querySelector('.status-message');
            
            const obj = {};
            const formData = new FormData(item),
                 errorMessage  = 'Что то пошло не так...',
                 successMessage = "Спасибо! Мы скоро с Вами свяжемся";
            const clearInput = () => {
               const elementsForm = [...item.elements].filter(item => {
                   return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
               });
               elementsForm.forEach(item => item.value = '');
           }; 
          
           
           formData.forEach((val,key) => {
               obj[key] = val;
           });
           statusMessage.textContent = 'Загрузка...';
           body = MergeRecursive(obj);
           
           POSTData(body)
           .then((response) => {
               if(response.status !== 200){
                   throw new Error('network status isn`t 200');
               }
               statusMessage.textContent = successMessage;
               setTimeout(() => {
                 if(statusMessage.parentNode) statusMessage.parentNode.removeChild(statusMessage);
               }, 3000);
               clearInput();
               
           })
           .catch(() => {
               statusMessage.textContent = errorMessage;
               setTimeout(() => {                   
                if(statusMessage.parentNode) statusMessage.parentNode.removeChild(statusMessage);
            }, 3000);
               clearInput();
            });
        });

        
    })
    
}
export default sendForms;
