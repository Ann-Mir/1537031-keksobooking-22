import { isEnterEvent, isEscEvent } from './util.js';

const MODAL_ZINDEX = '10000';
const popup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const tryAgainButton = errorModal.querySelector('.error__button');

popup.classList.add('hidden');
errorModal.classList.add('hidden');
document.body.append(popup);
document.body.append(errorModal);

const onPopupKeydown = (modal) => {
  return (evt) => {
    if (isEscEvent(evt) || isEnterEvent(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', onPopupKeydown(modal));
      modal.removeEventListener('click', onClick(modal));
      closeModal(modal);
    }
    if (modal === errorModal) {
      tryAgainButton.removeEventListener('click', onClick(errorModal));
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

const showSuccessModal = () => {
  popup.classList.remove('hidden');
  popup.style.zIndex = MODAL_ZINDEX;
  document.addEventListener('keydown', onPopupKeydown(popup));
  popup.addEventListener('click', onClick(popup));
};

const showErrorModal = () => {
  errorModal.classList.remove('hidden');
  errorModal.style.zIndex = MODAL_ZINDEX;
  document.addEventListener('keydown', onPopupKeydown(errorModal));
  errorModal.addEventListener('click', onClick(errorModal));
  tryAgainButton.addEventListener('click', onClick(errorModal));
};

export { showSuccessModal, closeModal, showErrorModal };
