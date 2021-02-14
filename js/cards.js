import { getOffers, FEATURES } from './data.js';
import {
  getOfferType,
  getGuestsNumber,
  getRoomsNumber
} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const ads = getOffers();
const adFragment = document.createDocumentFragment();

ads.forEach(({author, location, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = '{{ offer.price }} ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getOfferType(offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${getGuestsNumber(offer.rooms)} для ${getGuestsNumber(offer.guests)}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const features = cardElement.querySelector('.popup__features');
  setAdFeatures(features, offer);
  cardElement.querySelector('.popup__description').textContent = offer.description;
  const photosElement = cardElement.querySelector('.popup__photos');
  setAdPhotos(photosElement, offer);
})

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
    let offerImage = document.createElement('img');
    offerImage.innerHTML = `"<img src="${offer.photos[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">"`;
    photosElement.appendChild(offerImage);
  }
}

const setAdFeatures = (featuresElement, offer) => {
  FEATURES.forEach((feature) => {
    if (!offer.features.includes(feature)) {
      featuresElement.querySelector(`.popup__feature popup__feature--${feature}`).setAttribute('style', 'visibility: hidden;');
    }
  })
}

similarWizards.forEach(({name, coatColor, eyesColor}) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = name;
  wizardElement.querySelector('.wizard-coat').style.fill = coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = eyesColor;
  similarListFragment.appendChild(wizardElement);
});

similarListElement.appendChild(similarListFragment);
/*
Выведите заголовок объявления offer.title в заголовок .popup__title.
Выведите адрес offer.address в блок .popup__text--address.
Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
Квартира для flat
Бунгало для bungalow
Дом для house
Дворец для palace
Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
В список .popup__features выведите все доступные удобства в объявлении.
В блок .popup__description выведите описание объекта недвижимости offer.description.
В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
Если данных для заполнения не хватает, соответствующий блок в карточке скрывается.
*/

/*
<article class="popup">
      <img src="img/avatars/user01.png" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
      <h3 class="popup__title">Уютное гнездышко для молодоженов</h3>
      <p class="popup__text popup__text--address">102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3</p>
      <p class="popup__text popup__text--price">5200 <span>₽/ночь</span></p>
      <h4 class="popup__type">Квартира</h4>
      <p class="popup__text popup__text--capacity">2 комнаты для 3 гостей</p>
      <p class="popup__text popup__text--time">Заезд после 14:00, выезд до 10:00</p>
      <ul class="popup__features">
        <li class="popup__feature popup__feature--wifi"></li>
        <li class="popup__feature popup__feature--dishwasher"></li>
        <li class="popup__feature popup__feature--parking"></li>
        <li class="popup__feature popup__feature--washer"></li>
        <li class="popup__feature popup__feature--elevator"></li>
        <li class="popup__feature popup__feature--conditioner"></li>
      </ul>
      <p class="popup__description">Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.</p>
      <div class="popup__photos">
        <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
      </div>
    </article>
  </template>
 */
