import { onFileUpload, FILE_TYPES } from './util.js';

const fileChooser = document.querySelector('.ad-form__field input[type=file]');
const preview = document.querySelector('.ad-form-header__preview img');

fileChooser.addEventListener('change', onFileUpload(fileChooser, preview, FILE_TYPES));
