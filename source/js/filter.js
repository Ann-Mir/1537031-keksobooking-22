import { removeMapMarkers, renderCards } from './map.js';
import { debounce } from './util.js';


const RERENDER_DELAY = 500;
const DEFAULT_VALUE = 'any';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

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
};

const activateFilter = () => {
  filterForm.classList.remove('.map__filters--disabled');
  for (let i = 0; i < filterElements.length; i++) {
    filterElements[i].removeAttribute('disabled');
  }
};

const checkType = (advertisement, element) => {
  return element.value === DEFAULT_VALUE || advertisement.offer.type === element.value;
};

const checkPrice = (advertisement, element) => {
  switch (element.value) {
    case DEFAULT_VALUE:
      return true;
    case 'low':
      return advertisement.offer.price < LOW_PRICE;
    case 'middle':
      return advertisement.offer.price >= LOW_PRICE && advertisement.offer.price < HIGH_PRICE;
    case 'high':
      return advertisement.offer.price >= HIGH_PRICE;
    default:
      return false;
  }
};

const checkRooms = (advertisement, element) => {
  return element.value === DEFAULT_VALUE || Number(element.value) === advertisement.offer.rooms;
};

const checkGuests = (advertisement, element) => {
  return element.value === DEFAULT_VALUE ? true : parseInt(element.value, 10) <= advertisement.offer.guests;
};

const checkFeatures = (advertisement) => {
  const checkedFeatures = filterForm.querySelectorAll('.map__checkbox:checked');
  let count = 0;

  checkedFeatures.forEach((feature) => {
    if (advertisement.offer.features.includes(feature.value)) {
      count++;
    }
  })

  return count === checkedFeatures.length;
};

const getFilteredAds = (advertisements) => {
  const filteredAdvertisements = advertisements.filter((advertisement) => {
    return (
      checkType(advertisement, housingTypeSelect) &&
      checkPrice(advertisement, housingPriceSelect) &&
      checkRooms(advertisement, housingRoomsSelect) &&
      checkGuests(advertisement, housingGuestsSelect) &&
      checkFeatures(advertisement)
    )
  })
  return filteredAdvertisements;
};

const onFilterChange = (advertisements) => {
  return debounce((evt) => {
    evt.preventDefault();
    const filteredAdds = getFilteredAds(advertisements);
    removeMapMarkers();
    renderCards(filteredAdds);
  }, RERENDER_DELAY);
};

const setFilterChange = (advertisements) => {
  filterForm.addEventListener('change', onFilterChange(advertisements));
};


export {
  deactivateFilter,
  activateFilter,
  filterForm,
  setFilterChange
};
