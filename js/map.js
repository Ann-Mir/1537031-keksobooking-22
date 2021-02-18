/* global L:readonly */
import { activateMapForm, deactivateMapForm, fillAddress } from './form.js';
import { ads } from './data.js';
import { createCardElement } from './cards.js';

const STARTING_LATITUDE = 35.6804;
const STARTING_LONGITUDE = 139.7690;
const STARING_ZOOM = 12;
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
  const address = {
    lat: evt.target.getLatLng().lat,
    long: evt.target.getLatLng().lng,
  }
  fillAddress(address);
});


ads.forEach(({author, location, offer}) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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
