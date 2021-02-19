import { LOCATION_PRECISION, minPrices } from './data.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const addressField = adForm.querySelector('#address');
const typeField = adForm.querySelector('#type');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const checkInField = adForm.querySelector('#timein');
const checkOutField = adForm.querySelector('#timeout');
const roomsNumberSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');
const capacityOptions = capacitySelect.querySelectorAll('option');

/*Может быть эти константы объявлять только в функциях, в которых они используются?*/
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_PER_NIGHT = 1000000;
const MIN_GUESTS_NUMBER = 0;
const MAX_ROOMS_NUMBER = 100;

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

const onRoomsNumberSelect = () => {
  const roomsNumber = Number(roomsNumberSelect.value);
  /* Какая-то здесь некрасивая вложенность получается, и куча if-ов,
  но вариант с setCustomValidity в этом
  случае мне совсем не нравится с точки зрения пользователя. Не знаю, как отрефакторить.
  Получившйся вариант поведения меня больше всего устраивает как пользоателя тем,
   что не дает выбрать заведомо невалидные значения */
  if (roomsNumber === MAX_ROOMS_NUMBER) {
    capacitySelect.value = MIN_GUESTS_NUMBER;
    capacityOptions.forEach((option) => {
      if (Number(option.value) > MIN_GUESTS_NUMBER) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    })
    return;
  }
  capacityOptions.forEach((option) => {
    if (Number(option.value) > roomsNumber || Number(option.value) === MIN_GUESTS_NUMBER) {
      option.disabled = true;
    } else {
      option.disabled = false;
    }
  })
  if (Number(capacitySelect.value) > roomsNumber || Number(capacitySelect.value) === MIN_GUESTS_NUMBER) {
    capacitySelect.value = roomsNumber;
  }
}

/*Чтобы форму сразу привести к правильным значениям при загрузке. Или проще в разметке выбранные значения поменять?*/
const initiateForm = () => {
  onRoomsNumberSelect();
  onTypeChange();
  onCheckInChange();
  onCheckOutChange();
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

    initiateForm();
  }
}

typeField.addEventListener('change', onTypeChange);
checkInField.addEventListener('change', onCheckInChange);
checkOutField.addEventListener('change', onCheckOutChange);
titleInput.addEventListener('input', onTitleInput);
priceInput.addEventListener('input', onPriceInput);
roomsNumberSelect.addEventListener('change', onRoomsNumberSelect);


export { deactivateMapForm, activateMapForm, fillAddress };
