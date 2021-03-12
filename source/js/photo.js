import { onFileUpload, FILE_TYPES } from './util.js';


const PHOTO_DEFAULT = '';

const fileChooser = document.querySelector('.ad-form__upload input[type=file]');
const upload = document.querySelector('.ad-form__photo');
const previewPhoto = document.createElement('img');
previewPhoto.style.display = 'flex';
previewPhoto.style.maxWidth = '100%';
previewPhoto.style.height = 'auto';

upload.append(previewPhoto);


fileChooser.addEventListener('change', onFileUpload(fileChooser, previewPhoto, FILE_TYPES));


export { previewPhoto, PHOTO_DEFAULT };
