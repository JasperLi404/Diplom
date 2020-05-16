'use strict';

import callMe from './modules/callMe.js';
import accordion from './modules/accordion.js';
import calculatorAccordion from './modules/calculatorAccordion.js';
import sendForms from './modules/sendForms.js';
import showPromotions from './modules/showPromotions.js';
import getConsultation from './modules/getConsultation.js';

window.addEventListener('DOMContentLoaded', () => {
    callMe();
    accordion('.questions');
    accordion('.constructor');
    calculatorAccordion();
    sendForms('capture-form');
    sendForms('main-form');
    showPromotions();
    getConsultation();

    

})