import L from 'leaflet';
import { activateMapForm, fillAddress, onResetAdForm } from './form.js';
import { createCardElement } from './cards.js';
import { activateFilter } from './filter.js';


const STARTING_LATITUDE = 35.6804;
const STARTING_LONGITUDE = 139.7690;
const STARING_ZOOM = 9;
const MAIN_POINTER_WIDTH = 52;
const POINTER_WIDTH = 40;

const map = L.map('map-canvas');
const markers = [];

const onPinMove = (evt) => {
  const lat = evt.target.getLatLng().lat;
  const long = evt.target.getLatLng().lng;
  fillAddress(lat, long);
};

const renderCards = (advertisements) => {
  advertisements.forEach(({author, location, offer}) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [POINTER_WIDTH, POINTER_WIDTH],
      iconAnchor: [POINTER_WIDTH / 2, POINTER_WIDTH],
    });
    const lat = location.lat;
    const lng = location.lng;
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
    markers.push(marker);
  });
};

const removeMapMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  })
};

const onMapLoad = () => {
  activateMapForm();
  fillAddress(STARTING_LATITUDE, STARTING_LONGITUDE);
  onResetAdForm();
  activateFilter();
};

const setUpMap = (advertisements) => {
  map
    .on('load', onMapLoad)
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

  renderCards(advertisements);
};

const initMainPinMarker = () => {
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
  return mainPinMarker;
};

const mainPinMarker = initMainPinMarker();

mainPinMarker.addTo(map);
mainPinMarker.on('move', onPinMove);

const resetMainPinMarker = () => {
  mainPinMarker.setLatLng(L.latLng(STARTING_LATITUDE, STARTING_LONGITUDE));
};


export {
  setUpMap,
  resetMainPinMarker,
  STARTING_LATITUDE,
  STARTING_LONGITUDE,
  renderCards,
  removeMapMarkers
};
