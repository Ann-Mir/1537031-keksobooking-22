import { LOCATION_PRECISION, minPrices } from './data.js';
import { sendData } from './api.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_PER_NIGHT = 1000000;

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const addressField = adForm.querySelector('#address');
const typeField = adForm.querySelector('#type');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const checkInField = adForm.querySelector('#timein');
const checkOutField = adForm.querySelector('#timeout');
const roomsNumberSelect = adForm.querySelector('#room_number');
const adFormResetButton = adForm.querySelector('.ad-form__reset');
const capacitySelect = adForm.querySelector('#capacity');

const roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const onRoomsNumberSelect = () => {
  const seatingCapacityOptions = capacitySelect.querySelectorAll('option');
  const roomsNumber =  Number(roomsNumberSelect.value);
  seatingCapacityOptions.forEach((option) => {
    option.disabled = true;
  });

  roomValues[roomsNumber].forEach((seatsAmount) => {
    seatingCapacityOptions.forEach((option) => {
      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
      }
    });
    if (!roomValues[roomsNumber].includes(Number(capacitySelect.value))) {
      const maxCapacity = roomValues[roomsNumber][roomValues[roomsNumber].length - 1];
      capacitySelect.value = maxCapacity;
    }
  });
};

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

const fillAddress = (lat, long) => {
  const latitude = lat.toFixed(LOCATION_PRECISION);
  const longitude = long.toFixed(LOCATION_PRECISION);
  addressField.value = `${latitude} ${longitude}`;
}

const onTypeChange = () => {
  priceInput.placeholder = minPrices[typeField.value];
  priceInput.min = minPrices[typeField.value];
}

const onCheckInChange = () => {
  checkOutField.value = checkInField.value;
}

const onCheckOutChange = () => {
  checkInField.value = checkOutField.value;
}

const onTitleInput = () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
}

const onPriceInput = () => {
  const price =priceInput.value;
  const type = typeField.value;
  const minPrice = minPrices[type];

  if (price < minPrice) {
    priceInput.setCustomValidity(`Стоимость должна быть не менее ${minPrice}`);
  } else if (price > MAX_PRICE_PER_NIGHT) {
    priceInput.setCustomValidity(`Стоимость не должна превышать ${MAX_PRICE_PER_NIGHT}`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
}

const activateMapForm = () => {
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
}

const onResetAdForm = () => {
  onTypeChange();
  onRoomsNumberSelect();
  onCheckInChange();
  onCheckOutChange();
}

typeField.addEventListener('change', onTypeChange);
checkInField.addEventListener('change', onCheckInChange);
checkOutField.addEventListener('change', onCheckOutChange);
titleInput.addEventListener('input', onTitleInput);
priceInput.addEventListener('input', onPriceInput);
roomsNumberSelect.addEventListener('change', onRoomsNumberSelect);

const advertisementFormSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
    );
  });
};

export {
  deactivateMapForm,
  activateMapForm,
  fillAddress,
  advertisementFormSubmit,
  adFormResetButton,
  onResetAdForm,
  adForm
};
