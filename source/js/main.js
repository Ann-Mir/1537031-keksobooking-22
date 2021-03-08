import './api.js';
import './avatar.js';
import './cards.js';
import './data.js';
import './form.js';
import './map.js';
import './photo.js';
import {
  renderCards,
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
import { deactivateFilter, filterForm, setFilterChange } from './filter.js';
import { clearOutAvatar } from './avatar.js';
import { clearOutPhoto } from './photo.js';


const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';
let advertisementsToRender = [];

const setDefaults = () => {
  filterForm.reset();
  adForm.reset();
  clearOutAvatar();
  clearOutPhoto();
  resetMainPinMarker();
  onResetAdForm();
  renderCards(advertisementsToRender);
  fillAddress(STARTING_LATITUDE, STARTING_LONGITUDE);
}

deactivateMapForm();
deactivateFilter();

getData(GET_URL, (advertisements) => {
  advertisementsToRender = advertisements.slice(MIN_ADDS, ADDS_COUNT);
  setUpMap(advertisementsToRender);
  setFilterChange(advertisementsToRender);
  adFormResetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    setDefaults();
  });
}, showAlert('Не удалось загрузить данные об объектах'))

advertisementFormSubmit(() => {
  showSuccessModal();
  setDefaults();
}, showErrorModal);



