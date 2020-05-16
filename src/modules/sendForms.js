const sendForms = (form, data = {}) => {
    const followingForm = document.querySelectorAll(`.${form}`);
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
        if(target.id == 'name_1' || target.id == 'name_2' || target.id == 'name_3' || target.id == 'name_11' || target.name == 'user_quest'){
            target.value = target.value.replace(/[a-zA-Z0-9]/g, '');
        } else if(target.id == 'phone_1' || target.id == 'phone_2' || target.id == 'phone_3' || target.id == 'phone_11'){
            let val = target.value.replace(/(\D|[a-zA-ZА-Яа-я])/g, '');
            target.value ='+'+ val;
        }
    }
    
    followingForm.forEach(item => {
            item.addEventListener('input', validationForm);
            item.addEventListener('submit', event => {
                event.preventDefault();
                const statusMessage = document.createElement('div');
                const formData = new FormData(item),
                        errorMessage  = 'Что то пошло не так...',
                        successMessage = "Спасибо! Мы скоро с Вами свяжемся";
                const clearInput = () => {
                    const elementsForm = [...item.elements].filter(item => {
                        return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
                    });
                    elementsForm.forEach(item => item.value = '');
                };  
                item.appendChild(statusMessage);
                    
                           
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
export default sendForms;
