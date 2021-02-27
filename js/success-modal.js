import { isEscEvent } from './util.js';

const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
successModal.classList.add('hidden');
errorModal.classList.add('hidden');
document.body.append(successModal);
document.body.append(errorModal);

const closeModal = (modal) => {
  modal.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown(modal));
  document.removeEventListener('click', onClick(modal));
}

const onPopupEscKeydown = (modal) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal(modal);
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
  document.addEventListener('keydown', onPopupEscKeydown(successModal));
  document.addEventListener('click', onClick(successModal));
}

const showErrorModal = () => {
  errorModal.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown(errorModal));
  document.addEventListener('click', onClick(errorModal));
  const tryAgainButton = errorModal.querySelector('.error__button');
  tryAgainButton.addEventListener('click', onClick(errorModal));
}

export { showSuccessModal, closeModal, showErrorModal };
