import { isEnterEvent, isEscEvent } from './util.js';


const MODAL_ZINDEX = '10000';
const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const tryAgainButton = errorPopup.querySelector('.error__button');

successPopup.classList.add('hidden');
errorPopup.classList.add('hidden');
document.body.append(successPopup);
document.body.append(errorPopup);

const onPopupKeydown = (modal) => {
  return (evt) => {
    if (isEscEvent(evt) || isEnterEvent(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', onPopupKeydown(modal));
      modal.removeEventListener('click', onClick(modal));
      closeModal(modal);
    }
    if (modal === errorPopup) {
      tryAgainButton.removeEventListener('click', onClick(errorPopup));
    }
  }
};

const onClick = (modal) => {
  return (evt) => {
    evt.preventDefault();
    closeModal(modal);
  }
};

const closeModal = (modal) => {
  modal.classList.add('hidden');
};

const showModal = (modal) => {
  modal.classList.remove('hidden');
  modal.style.zIndex = MODAL_ZINDEX;
  document.addEventListener('keydown', onPopupKeydown(modal));
  modal.addEventListener('click', onClick(modal));
}

const showSuccessPopup = () => {
  showModal(successPopup);
};

const showErrorPopup = () => {
  showModal(errorPopup);
  tryAgainButton.addEventListener('click', onClick(errorPopup));
};


export { closeModal, showErrorPopup, showSuccessPopup };
