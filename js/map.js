/* global L:readonly */
import { activateMapForm, deactivateMapForm, fillAddress } from './form.js';

const STARTING_LATITUDE = 35.6804;
const STARTING_LONGITUDE = 139.7690;
deactivateMapForm();

const map = L.map('map-canvas')
  .on('load', activateMapForm)
  .setView({
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6804,
    lng: 139.7690,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
  const address = {
    lat: evt.target.getLatLng().lat,
    long: evt.target.getLatLng().lng
  }
  fillAddress(address);
});

/*mainPinMarker.remove();*/
