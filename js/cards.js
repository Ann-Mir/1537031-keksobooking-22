import { getOffers, FEATURES } from './data.js';
import {
  getOfferType,
  getGuestsNumber,
  getRoomsNumber
} from './util.js';

const setAdPhotos = (photosElement, offer) => {
  if (offer.photos.length === 0) {
    photosElement.setAttribute('style', 'visibility: hidden;');
    return;
  }
  const image = photosElement.querySelector('.popup__photo');
  image.setAttribute('src', offer.photos[0]);
  if (offer.photos.length === 1) {
    return;
  }
  for (let i = 1; i < offer.photos.length; i++) {
    const offerImage = photosElement.querySelector('.popup__photo').cloneNode(true);
    offerImage.setAttribute('src', offer.photos[i]);
    photosElement.appendChild(offerImage);
  }
}

const setAdFeatures = (featuresElement, offer) => {
  FEATURES.forEach((feature) => {
    if (!offer.features.includes(feature)) {
      featuresElement.querySelector(`.popup__feature--${feature}`).setAttribute('style', 'display: none;');
    }
  })
}

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const ads = getOffers();
const adFragment = document.createDocumentFragment();

ads.forEach(({author, offer}) => {
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

  adFragment.appendChild(cardElement);
})

const map = document.querySelector('#map-canvas');
map.appendChild(adFragment.querySelector('.popup'));
