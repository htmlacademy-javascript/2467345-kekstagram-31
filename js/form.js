import '/vendor/pristine/pristine.min';
import '/vendor/nouislider/nouislider.js';
import { isEscapeKey } from './util.js';
import { showError, showSuccess } from './message.js';
import { validateHashTags, validateDescription, removeValidationErrors } from './validation.js';
import {
  effectsHandler,
  resetFilters,
  effectSliderInput,
  effectSliderValue,
  effectSlider,
  effectsList,
  filterName,
  filterUnit
} from './filters.js';
import { addSizeListeners, removeSizeListeners } from './size.js';
import { sendData } from './api.js';

const imgInput = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgPreview = document.querySelector('.img-upload__preview>img');
const closeButton = imgOverlay.querySelector('.img-upload__cancel');

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const pristine = new Pristine(imgUploadForm);
const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const uploadSubmitButton = document.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = SubmitButtonText.IDLE;
};


function closeImgOverlay(){
  imgOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeImgOverlay);
  document.removeEventListener('keydown', closeByKey);

  removeSizeListeners();

  effectsList.removeEventListener('change', effectsHandler);
  resetFilters();

  removeValidationErrors();
  imgUploadForm.reset();
}

function closeByKey(e){
  if(isEscapeKey(e)){
    if(!document.querySelector('.error')){
      e.preventDefault();
      closeImgOverlay();
    }
  }
}

function disableKeyCloseByInputOnfocus(input){
  input.onfocus = ()=>{
    document.removeEventListener('keydown', closeByKey);
  };
  input.onblur = ()=>{
    document.addEventListener('keydown', closeByKey);
  };
}

noUiSlider.create(effectSliderInput,{
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

effectSliderInput.noUiSlider.on('update', () => {
  effectSliderValue.value = effectSliderInput.noUiSlider.get();
  effectSliderValue.value = Math.round(effectSliderValue.value * 10) / 10;
  imgPreview.style.filter = `${filterName}(${ effectSliderValue.value }${filterUnit})`;
});

imgInput.addEventListener('change',(evt)=>{
  imgOverlay.classList.remove('hidden');
  effectSlider.classList.add('hidden');
  document.body.classList.add('modal-open');

  //загрузка изображения в превью и фильтры
  //загрузку изображения в поле загрузки, уже реализовал в одном из предыдущих заданий
  const downloadedImg = URL.createObjectURL(evt.target.files[0]);

  imgPreview.src = downloadedImg;

  const imgsPreviewEffect = document.querySelectorAll('.effects__preview');
  imgsPreviewEffect.forEach((imgPreviewEffect)=>{
    imgPreviewEffect.style.backgroundImage = `url(${ downloadedImg })`;
  });

  //изменение размера изображения и применение эффектов
  addSizeListeners();
  effectsList.addEventListener('change', effectsHandler);

  //добавление listeners на закрытие модульного окна
  closeButton.addEventListener('click', closeImgOverlay);
  document.addEventListener('keydown', closeByKey);

  //при фокусе на интпутах отключаем закритие на Ecs
  disableKeyCloseByInputOnfocus(hashtagsInput);
  disableKeyCloseByInputOnfocus(descriptionInput);
});

pristine.addValidator(hashtagsInput, validateHashTags);
pristine.addValidator(descriptionInput, validateDescription);

imgUploadForm.addEventListener('submit',(evt)=>{
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid){
    // console.log("Форма успошно отправлена!");
    const formData = new FormData(evt.target);
    blockSubmitButton();
    sendData(formData)
      .then(closeImgOverlay)
      .then(showSuccess)
      .catch((err)=>{
        showError(err.message);
      })
      .finally(unblockSubmitButton);
  }
});


