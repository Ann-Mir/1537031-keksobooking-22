import {
  getOfferType,
  getGuestsNumber,
  getRoomsNumber
} from './util.js';


const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const isElementVisible = (element, components) => {
  if (components.length === 0) {
    element.setAttribute('style', 'visibility: hidden;');
    return false;
  }
  element.setAttribute('style', 'visibility: visible;');
  return true;
};

const setAdPhotos = (photosElement, offer) => {
  if (!isElementVisible(photosElement, offer.photos)) {
    return;
  }

  photosElement.innerHTML = offer.photos.map((photo) => {
    return `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
  }).join('');
};

const setAdFeatures = (featuresElement, offer) => {
  if (!isElementVisible(featuresElement, offer.features)) {
    return;
  }

  featuresElement.innerHTML = offer.features.map((feature) => {
    return `<li class="popup__feature popup__feature--${feature}"></li>`;
  }).join('');
};

const createCardElement = ({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = getOfferType(offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${getRoomsNumber(offer.rooms)} для ${getGuestsNumber(offer.guests)}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const features = cardElement.querySelector('.popup__features');
  setAdFeatures(features, offer);

  cardElement.querySelector('.popup__description').textContent = offer.description;

  const photosElement = cardElement.querySelector('.popup__photos');
  setAdPhotos(photosElement, offer);

  cardElement.querySelector('.popup__avatar').setAttribute('src', `${author.avatar}`);

  return cardElement;
};


export { createCardElement };
