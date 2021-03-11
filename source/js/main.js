import 'leaflet/dist/leaflet.css';
import './api.js';
import './avatar.js';
import './cards.js';
import './data.js';
import './form.js';
import './map.js';
import './photo.js';
import './popup.js';

import {
  renderCards,
  resetMainPinMarker,
  setUpMap,
  STARTING_LATITUDE,
  STARTING_LONGITUDE
} from './map.js';
import { getData } from './api.js';
import { ADDS_COUNT, MIN_ADDS } from './data.js';
import { clearOutImage, showAlert } from './util.js';
import {
  adForm,
  adFormResetButton,
  advertisementFormSubmit,
  deactivateMapForm,
  fillAddress,
  onResetAdForm
} from './form.js';
import { showErrorPopup, showSuccessPopup } from './popup.js';
import { deactivateFilter, filterForm, setFilterChange } from './filter.js';

import { PHOTO_DEFAULT, previewPhoto } from './photo.js';
import { AVATAR_DEFAULT, previewAvatar } from './avatar';

const ALERT_MESSAGE = 'Не удалось загрузить данные об объектах';
const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';

let advertisementsToRender = [];

const setDefaults = () => {
  filterForm.reset();
  adForm.reset();
  clearOutImage(previewAvatar, AVATAR_DEFAULT);
  clearOutImage(previewPhoto, PHOTO_DEFAULT);
  resetMainPinMarker();
  onResetAdForm();
  renderCards(advertisementsToRender);
  fillAddress(STARTING_LATITUDE, STARTING_LONGITUDE);
};

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
}, showAlert(ALERT_MESSAGE));

advertisementFormSubmit(() => {
  showSuccessPopup();
  setDefaults();
}, showErrorPopup);
