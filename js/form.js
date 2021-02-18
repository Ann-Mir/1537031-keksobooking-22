import { LOCATION_PRECISION, MIN_PRICES } from './data.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const addressField = adForm.querySelector('#address');
const typeField = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const checkInField = adForm.querySelector('#timein');
const checkOutField = adForm.querySelector('#timeout');

const deactivateMapForm = () => {
  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.classList.add('disabled');
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFilters.querySelectorAll('.map__filter').forEach((filter) => {
    filter.classList.add('disabled');
  })
  mapFilters.querySelectorAll('.map__features').forEach((feature) => {
    feature.classList.add('disabled');
  })
}

const fillAddress = ({lat, long}) => {
  const latitude = lat.toFixed(LOCATION_PRECISION);
  const longitude = long.toFixed(LOCATION_PRECISION);
  addressField.value = `${latitude} ${longitude}`;
}

const activateMapForm = (startingAddress) => {
  return () => {
    adForm.classList.remove('ad-form--disabled');

    adForm.querySelectorAll('fieldset').forEach((fieldset) => {
      fieldset.classList.remove('disabled');
    });

    mapFilters.classList.remove('map__filters--disabled');
    mapFilters.querySelectorAll('.map__filter').forEach((filter) => {
      filter.classList.remove('disabled');
    });
    mapFilters.querySelectorAll('.map__features').forEach((feature) => {
      feature.classList.remove('disabled');
    });
    addressField.setAttribute('readonly', 'readonly');
    fillAddress(startingAddress);
  }
}

const onTypeChange = () => {
  const type = typeField.value;
  const minPrice = MIN_PRICES[type];
  priceInput.placeholder = minPrice;
  priceInput.min = minPrice;
}

const onCheckInChange = () => {
  checkOutField.value = checkInField.value;
}

const onCheckOutChange = () => {
  checkInField.value = checkOutField.value;
}

typeField.addEventListener('change', onTypeChange);

checkInField.addEventListener('change', onCheckInChange);
checkOutField.addEventListener('change', onCheckOutChange);

export { deactivateMapForm, activateMapForm, fillAddress };
