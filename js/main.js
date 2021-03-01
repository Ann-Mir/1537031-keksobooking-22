import './data.js';
import './cards.js';
import './form.js';
import './map.js';
import './api.js';
import { resetMainPinMarker, setUpMap, STARTING_LATITUDE, STARTING_LONGITUDE } from './map.js';
import { processData } from './api.js';
import { ADDS_COUNT, MIN_ADDS } from './data.js';
import { showAlert } from './util.js';
import {
  adForm,
  adFormResetButton,
  advertisementFormSubmit,
  deactivateMapForm,
  fillAddress,
  onResetAdForm
} from './form.js';
import { showErrorModal, showSuccessModal } from './success-modal.js';

const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';

const setDefaults = () => {
  adForm.reset();
  resetMainPinMarker();
  onResetAdForm();
  fillAddress(STARTING_LATITUDE, STARTING_LONGITUDE);
}

deactivateMapForm();

processData(GET_URL, (advertisements) => {
  setUpMap(advertisements.slice(MIN_ADDS, ADDS_COUNT));
}, showAlert('Не удалось загрузить данные об объектах'));

advertisementFormSubmit(() => {
  showSuccessModal();
  setDefaults();
}, showErrorModal); /* showErrorModal срабатывает только один раз. Если посторно пытаться отправить форму, окно с ошибкой не появляется. Есть варианты это исправить? */

adFormResetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaults();
});

