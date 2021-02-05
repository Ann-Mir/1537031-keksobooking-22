'use strict';

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
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];


function getRandomInteger(from, to) {
  if (from < 0 || to < 0) {
    throw new Error('Non-negative arguments are expected');
  }

  const min = Math.min(from, to);
  const max = Math.max(from, to);

  if (Math.ceil(min) > Math.floor(max)) {
    throw new Error('Input arguments error');
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}


function getRandomFloatWithPrecision(from, to, decimalPlaces= 1) {
  if (from < 0 || to < 0) {
    throw new Error('Non-negative arguments are expected');
  }

  const min = Math.min(from, to);
  const max = Math.max(from, to);

  return Number((Math.random() * (max - min) + min).toFixed(decimalPlaces));
}


function getAvatarUrl() {
  const number = getRandomInteger(MIN_AVATAR_NUMBER , MAX_AVATAR_NUMBER);
  return `img/avatars/user0${number}.png`;
}

function getRandomValueFromArray(arr) {
  const index = getRandomInteger(0, arr.length - 1);
  return arr[index];
}

function getRandomLengthArray(arr) {
  const length = getRandomInteger(1, arr.length);
  const shuffledArray = new Array(...arr);
  shuffleArray(shuffledArray);
  const result = shuffledArray.slice(0, length);
  return result;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function getOffer() {
  const ad = {
    author: {
      avatar: getAvatarUrl(),
    },
    location: {
      x: getRandomFloatWithPrecision(MIN_LATITUDE, MAX_LATITUDE, LOCATION_PRECISION),
      y: getRandomFloatWithPrecision(MIN_LONGITUDE, MAX_LONGITUDE, LOCATION_PRECISION),
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

  ad.offer.address = `${ad.location.x}, ${ad.location.y}`;
  return ad;
}

const offers = [];

for (let i = 0; i < ADDS_COUNT; i++) {
  offers.push(getOffer());
}

