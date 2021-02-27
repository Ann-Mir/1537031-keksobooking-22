import {
  getRandomInteger,
  getRandomFloatWithPrecision,
  getRandomValueFromArray,
  getRandomLengthArray
} from './util.js';

const TITLE = 'Объявление об аренде недвижимости';
const DESCRIPTION = 'Самое крутое предложение';
const MIN_PRICE = 1;
const MAX_PRICE = 1000000;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 8;
const MIN_ROOMS_NUMBER = 1;
const MAX_ROOMS_NUMBER = 10;
const MIN_GUESTS_NUMBER = 1;
const MAX_GUESTS_NUMBER = 20;
const MIN_LATITUDE = 35.65000;
const MAX_LATITUDE = 35.70000;
const MIN_LONGITUDE = 139.70000;
const MAX_LONGITUDE = 139.80000;
const LOCATION_PRECISION = 5;
const ADDS_COUNT = 10;
const MIN_ADDS = 0;

const minPrices = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
}

const CHECKINTIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const getAvatarUrl = () => {
  const number = getRandomInteger(MIN_AVATAR_NUMBER , MAX_AVATAR_NUMBER);
  return `img/avatars/user0${number}.png`;
}

const getOffer = () => {
  const advertisement = {
    author: {
      avatar: getAvatarUrl(),
    },
    location: {
      lat: getRandomFloatWithPrecision(MIN_LATITUDE, MAX_LATITUDE, LOCATION_PRECISION),
      lng: getRandomFloatWithPrecision(MIN_LONGITUDE, MAX_LONGITUDE, LOCATION_PRECISION),
    },
    offer: {
      title: TITLE,
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomValueFromArray(TYPES),
      rooms: getRandomInteger(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER),
      guests: getRandomInteger(MIN_GUESTS_NUMBER, MAX_GUESTS_NUMBER),
      checkin: getRandomValueFromArray(CHECKINTIMES),
      checkout: getRandomValueFromArray(CHECKINTIMES),
      features: getRandomLengthArray(FEATURES),
      description: DESCRIPTION,
      photos: getRandomLengthArray(PHOTOS),
    },
  }

  advertisement.offer.address = `${advertisement.location.lat}, ${advertisement.location.lng}`;
  return advertisement;
}

const getOffers = () => {
  const offers = [];
  for (let i = 0; i < ADDS_COUNT; i++) {
    offers.push(getOffer());
  }
  return offers;
}


export { getOffers, LOCATION_PRECISION, minPrices, MIN_ADDS, ADDS_COUNT };
