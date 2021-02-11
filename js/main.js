import { getOffer } from './data.js';
const ADDS_COUNT = 10;

const offers = [];

for (let i = 0; i < ADDS_COUNT; i++) {
  offers.push(getOffer());
}

console.log(offers);
