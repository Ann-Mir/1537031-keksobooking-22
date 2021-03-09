import { onFileUpload, FILE_TYPES } from './util.js';

const fileChooser = document.querySelector('.ad-form__upload input[type=file]');
const upload = document.querySelector('.ad-form__photo');
const preview = document.createElement('img');
preview.style.display = 'flex';
preview.style.maxWidth = '100%';
preview.style.height = 'auto';

upload.append(preview);

const clearOutPhoto = () => {
  preview.src = '';
}

fileChooser.addEventListener('change', onFileUpload(fileChooser, preview, FILE_TYPES));


export { clearOutPhoto };
