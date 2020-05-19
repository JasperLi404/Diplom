export{calculate};
const calculate = {};
const calculatorAccordion = () =>{
    const constructBtn = document.querySelectorAll('.construct-btn'),
          container = document.querySelector('.constructor'),
          panelCollapse = container.querySelectorAll('.panel-collapse'),
          calcResult = container.querySelector('#calc-result'),
          callBtn =container.querySelector('.call-btn'),
          onOffSwitch = container.querySelectorAll('.onoffswitch-checkbox');
    const nextTab = event => {
        const target = event.target;
        let i = 0;
        event.preventDefault();
        for(let j in constructBtn){
            if(constructBtn[j].href === target.href){
                i = +j+1;
                break;
            }   
        }
        if(i < 4){
            panelCollapse.forEach(item =>  item.style.display = 'none');
            panelCollapse[i].style.display = 'flex'; 
        }
        countSum();
        
    };
    
    const countSum = () => {
        let total = 0, price, diameterPrice = 0,
            ringAmount = 0, diameterPriceAdd = 0,
            diameterAmountPriceAdd = 0,
            doubleBottomPrice = 0;
        const titleText = container.querySelectorAll('.title-text')[1],
              selectBox = container.querySelectorAll('.select-box');
        const expand = container.querySelectorAll('.form-control'),
              calcDiameter = +expand[0].options[expand[0].selectedIndex].value,
              calcRingAmount = +expand[1].options[expand[1].selectedIndex].value,
              calcDiameterAdd = +expand[2].options[expand[2].selectedIndex].value,
              calcRingAmountAdd = +expand[3].options[expand[3].selectedIndex].value;
        
        calculate["diameter"] = expand[0].options[expand[0].selectedIndex].textContent;
        calculate["ringAmount"] = expand[1].options[expand[1].selectedIndex].textContent;
              
        if(onOffSwitch[0].checked){
            calculate["amount"] = 1;
            price = 10000;
            titleText.style.display = 'none';
            selectBox[2].style.display = 'none';
            selectBox[3].style.display = 'none';
            if(onOffSwitch[1].checked) {
                doubleBottomPrice = 1000;
                calculate["dobbleBottom"] = true;
            } else calculate["dobbleBottom"] = false;
            
        } else{
            price = 15000;
            titleText.style.display = 'block';
            selectBox[2].style.display = 'inline-block';
            selectBox[3].style.display = 'inline-block';
            diameterPriceAdd = price * calcDiameterAdd / 100;
            diameterAmountPriceAdd = price * calcRingAmountAdd / 100;
            calculate["amount"] = 2;
            calculate["diameterAdd"] = expand[2].options[expand[2].selectedIndex].textContent;
            calculate["ringAmountAdd"] = expand[3].options[expand[3].selectedIndex].textContent;
            
            if(onOffSwitch[1].checked) {
                doubleBottomPrice = 2000;
                calculate["dobbleBottom"] = true;
            }else calculate["dobbleBottom"] = false;

        }   
        diameterPrice = price * calcDiameter / 100;
        ringAmount = price * calcRingAmount / 100;        
        total = Math.round( price + diameterPrice + ringAmount + diameterPriceAdd + diameterAmountPriceAdd + doubleBottomPrice);
        calcResult.placeholder = total;
        calculate["total"] = total;
        
        
    }
    constructBtn.forEach(item => item.addEventListener('click', nextTab.bind(this)));
    container.addEventListener('change', event => {
        let target = event.target;
        if(target.matches('.form-control'))  countSum();  
    });

    onOffSwitch.forEach(item => item.addEventListener('click', countSum));
    callBtn.addEventListener('click', () => {
        
    });
    }
export default calculatorAccordion;
