import { isEscEvent } from './util.js';

const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const tryAgainButton = errorModal.querySelector('.error__button');
successModal.classList.add('hidden');
errorModal.classList.add('hidden');
document.body.append(successModal);
document.body.append(errorModal);

const closeModal = (modal) => {
  modal.classList.add('hidden');
  modal.removeEventListener('keydown', onPopupEscKeydown(modal));
  modal.removeEventListener('click', onClick(modal));
}

const onPopupEscKeydown = (modal) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
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
}

const showSuccessModal = () => {
  successModal.classList.remove('hidden');
  successModal.style.zIndex = '10000';
  successModal.addEventListener('keydown', onPopupEscKeydown(successModal));
  successModal.addEventListener('click', onClick(successModal));
}

const showErrorModal = () => {
  errorModal.classList.remove('hidden');
  errorModal.style.zIndex = '10000';
  errorModal.addEventListener('keydown', onPopupEscKeydown(errorModal));
  errorModal.addEventListener('click', onClick(errorModal));
  tryAgainButton.addEventListener('click', onClick(errorModal));
}

export { showSuccessModal, closeModal, showErrorModal };
