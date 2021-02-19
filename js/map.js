/* global L:readonly */
import { activateMapForm, deactivateMapForm, fillAddress } from './form.js';
import { advertisements } from './data.js';
import { createCardElement } from './cards.js';

const STARTING_LATITUDE = 35.6804;
const STARTING_LONGITUDE = 139.7690;
const STARING_ZOOM = 12;
const MAIN_POINTER_WIDTH = 52;
const POINTER_WIDTH = 40;

deactivateMapForm();

const map = L.map('map-canvas')
  .on('load', activateMapForm({lat: STARTING_LATITUDE, long: STARTING_LONGITUDE}))
  .setView({
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  }, STARING_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_POINTER_WIDTH, MAIN_POINTER_WIDTH],
  iconAnchor: [MAIN_POINTER_WIDTH / 2, MAIN_POINTER_WIDTH],
});

const mainPinMarker = L.marker(
  {
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const onPinMove = (evt) => {
  const address = {
    lat: evt.target.getLatLng().lat,
    long: evt.target.getLatLng().lng,
  }
  fillAddress(address);
}

mainPinMarker.on('move', onPinMove);

advertisements.forEach(({author, location, offer}) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [POINTER_WIDTH, POINTER_WIDTH],
    iconAnchor: [POINTER_WIDTH / 2, POINTER_WIDTH],
  });
  const lat = location.x;
  const lng = location.y;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      createCardElement({author, offer}),
      {
        keepInView: true,
      },
    );
});
