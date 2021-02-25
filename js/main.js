
import './data.js';
import './cards.js';
import './form.js';
import './map.js';
import './api.js';
import { renderCards } from './map.js';
import { getData } from './api.js';
import  { ADDS_COUNT, MIN_ADDS } from './data.js';
import { showAlert } from './util.js';
import {advertisementFormSubmit, onSuccessFormSubmit} from './form.js';
import { showErrorModal } from './success-modal.js';


getData((advertisements) => {
  renderCards(advertisements.slice(MIN_ADDS, ADDS_COUNT));
}, (message) => showAlert(message));


advertisementFormSubmit(onSuccessFormSubmit, showErrorModal);

