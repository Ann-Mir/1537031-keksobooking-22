import './data.js';
import './cards.js';
import './form.js';
import './map.js';
import './api.js';
import {
  resetMainPinMarker,
  setUpMap,
  STARTING_LATITUDE,
  STARTING_LONGITUDE
} from './map.js';
import { getData } from './api.js';
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
import {deactivateFilter, filterAdvertisements, filterForm} from './filter.js';

const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';

const setDefaults = () => {
  filterForm.reset();
  adForm.reset();
  resetMainPinMarker();
  onResetAdForm();
  fillAddress(STARTING_LATITUDE, STARTING_LONGITUDE);
}

deactivateMapForm();
deactivateFilter();

getData(GET_URL, (advertisements) => {
  setUpMap(advertisements.slice(MIN_ADDS, ADDS_COUNT));
  filterAdvertisements(advertisements);
}, showAlert('Не удалось загрузить данные об объектах'))

advertisementFormSubmit(() => {
  showSuccessModal();
  setDefaults();
}, showErrorModal);

adFormResetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaults();
});

