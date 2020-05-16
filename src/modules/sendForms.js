const sendForms = (form, data = {}) => {
    let followingForm;
    const statusMessage = document.createElement('div');
    const POSTData = (data) => {
        return fetch('./server.php', {
            method : 'POST',
            headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data)
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
    }
    if(form){
         followingForm = document.querySelectorAll(`.${form}`);
         followingForm.forEach(item => {
            item.addEventListener('input', validationForm);
            item.addEventListener('submit', event => {
                event.preventDefault();
                item.appendChild(statusMessage);
                    
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
                        data[key] = val;
                    });
                    statusMessage.textContent = 'Загрузка...';
                    POSTData(data)
                    .then((response) => {
                        if(response.status !== 200){
                            throw new Error('network status isn`t 200');
                        }
                        statusMessage.textContent = successMessage;
                        setTimeout(() => statusMessage.parentNode.removeChild(statusMessage), 3000);
                        clearInput();
                    })
                    .catch(() => {
                        statusMessage.textContent = errorMessage;
                        setTimeout(() => statusMessage.parentNode.removeChild(statusMessage), 3000);
                        clearInput();
                    });
                });
        });
    }
}
export default sendForms;
