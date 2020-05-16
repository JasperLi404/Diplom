'use strict';

import callMeTogglePopup from './modules/callMeTogglePopup.js';
import accordion from './modules/accordion.js';
import calculatorAccordion from './modules/calculatorAccordion.js';
import sendForms from './modules/sendForms.js';

window.addEventListener('DOMContentLoaded', () => {
    callMeTogglePopup();
    accordion('.questions');
    accordion('.constructor');
    calculatorAccordion();
    // sendForms('capture-form');
    sendForms('main-form');
    sendForms('director-form');

    

})