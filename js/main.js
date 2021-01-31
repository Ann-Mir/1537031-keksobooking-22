'use strict';

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

getRandomInteger(3, 5);
getRandomFloatWithPrecision(3.5, 4.99, 3);
