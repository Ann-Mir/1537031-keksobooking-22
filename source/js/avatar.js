import { onFileUpload, FILE_TYPES } from './util.js';


const AVATAR_DEFAULT = 'img/muffin-grey.svg';

const fileChooser = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');

fileChooser.addEventListener('change', onFileUpload(fileChooser, previewAvatar, FILE_TYPES));


export { previewAvatar, AVATAR_DEFAULT };
