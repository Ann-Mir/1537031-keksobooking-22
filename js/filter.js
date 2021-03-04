import { removeMapMarkers, renderCards } from './map.js';

const filterForm = document.querySelector('.map__filters');
const filterElements = filterForm.elements;
const housingTypeSelect = filterForm.querySelector('#housing-type');

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

const filterAdvertisements = (advertisements) => {

  const onFilterByTypeChange = (advertisements) => {

    return (evt) => {
      evt.preventDefault();
      const type = housingTypeSelect.value;
      if (type === 'any') {
        removeMapMarkers();
        renderCards(advertisements);
        return;
      }
      const filteredAdvertisements = advertisements.filter((advertisement) => {
        return advertisement.offer.type === type;
      });
      removeMapMarkers();
      renderCards(filteredAdvertisements);
    }
  }

  housingTypeSelect.addEventListener('change', onFilterByTypeChange(advertisements));
}


export { deactivateFilter, activateFilter, filterForm, filterAdvertisements }
