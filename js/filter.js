/* global _:readonly */

import {removeMapMarkers, renderCards} from './map.js';

const RERENDER_DELAY = 500;

const filterForm = document.querySelector('.map__filters');
const filterElements = filterForm.elements;
const housingTypeSelect = filterForm.querySelector('#housing-type');
const housingPriceSelect = filterForm.querySelector('#housing-price');
const housingRoomsSelect = filterForm.querySelector('#housing-rooms');
const housingGuestsSelect = filterForm.querySelector('#housing-guests');


const deactivateFilter = () => {
  filterForm.classList.add('.map__filters--disabled');
  for (let i = 0; i < filterElements.length; i++) {
    filterElements[i].setAttribute('disabled', '');
  }
}

const activateFilter = () => {
  filterForm.classList.remove('.map__filters--disabled');
  for (let i = 0; i < filterElements.length; i++) {
    filterElements[i].removeAttribute('disabled');
  }
}

const checkType = (advertisement) => {
  return housingTypeSelect.value === 'any' || advertisement.offer.type === housingTypeSelect.value;
};

const checkPrice = (advertisement) => {
  const priceOptions = {
    'any': () => true,
    'low': (price) => price < 10000,
    'middle': (price) => price >= 10000 && price < 50000,
    'high': (price) => price >= 50000,
  }
  return priceOptions[housingPriceSelect.value](advertisement.offer.price);
}

const checkRooms = (advertisement) => {
  return housingRoomsSelect.value === 'any' || Number(housingRoomsSelect.value) === advertisement.offer.rooms;
}

const checkGuests = (advertisement) => {
  const guestOptions = {
    'any': () => true,
    '0': (guestsCount) => guestsCount === 100,
    '1': (guestsCount) => guestsCount === 1,
    '2': (guestsCount) => guestsCount === 2,
    '3': (guestsCount) => guestsCount === 3,
  }
  return guestOptions[housingGuestsSelect.value](advertisement.offer.guests);
}

const checkFeatures = (advertisement) => {
  const checkedFeatures = filterForm.querySelectorAll('.map__checkbox:checked');
  let count = 0;

  checkedFeatures.forEach((feature) => {
    if (advertisement.offer.features.includes(feature.value))
      count++;
  })

  return count === checkedFeatures.length;
}

const getFilteredAds = (advertisements) => {
  const filteredAdvertisements = advertisements.filter((advertisement) => {
    return (
      checkType(advertisement) &&
      checkPrice(advertisement) &&
      checkRooms(advertisement) &&
      checkGuests(advertisement) &&
      checkFeatures(advertisement)
    )
  })
  return filteredAdvertisements;
}


const onFilterChange = (advertisements) => {
  return (evt) => {
    evt.preventDefault();
    const filteredAdds = _.debounce(() => getFilteredAds(advertisements), RERENDER_DELAY);
    removeMapMarkers();
    renderCards(filteredAdds);
  }
}

const setFilterChange = (advertisements) => {
  filterForm.addEventListener('change', onFilterChange(advertisements));
};

export { deactivateFilter, activateFilter, filterForm, setFilterChange }
