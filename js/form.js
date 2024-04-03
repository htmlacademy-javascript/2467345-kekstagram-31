import { isEscapeKey } from './util.js';
import '/vendor/pristine/pristine.min';
import {percentToFloat} from './util.js';
import '/vendor/nouislider/nouislider.js';
import { showError } from './util.js';
import { sendData } from './api.js';
import { showSuccess } from './util.js';

const imgInput = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgPreview = document.querySelector('.img-upload__preview>img');
const closeButton = imgOverlay.querySelector('.img-upload__cancel');

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

//переменные для изменения размера изображения
const MIN_SCALE = 0.25;
const MAX_SCALE = 1;
const SCALE_STEP = 0.25;

const fieldsetSize = document.querySelector('.img-upload__scale');
const smallerButton = fieldsetSize.querySelector('.scale__control--smaller');
const size = fieldsetSize.querySelector('.scale__control--value');
const biggerButton = fieldsetSize.querySelector('.scale__control--bigger');

const pristine = new Pristine(imgUploadForm);

const errorBlock = document.querySelectorAll('.img-upload__field-wrapper');
const errorBlockHashTags = errorBlock[0];
const errorBlockDescription = errorBlock[1];
const errorDivRepeat = document.createElement('div');
errorDivRepeat.textContent = 'Хэштеги повторяются';
errorDivRepeat.classList.add('pristine-error');
errorDivRepeat.classList.add('img-upload__field-wrapper--error');

const errorDivCount = document.createElement('div');
errorDivCount.textContent = 'Введите до 5 хештегов';
errorDivCount.classList.add('pristine-error');
errorDivCount.classList.add('img-upload__field-wrapper--error');

const errorDivValid = document.createElement('div');
errorDivValid.textContent = 'введён невалидный хештег';
errorDivValid.classList.add('pristine-error');
errorDivValid.classList.add('img-upload__field-wrapper--error');

const errorDivLength = document.createElement('div');
errorDivLength.textContent = 'Введите до 140 символов';
errorDivLength.classList.add('pristine-error');
errorDivLength.classList.add('img-upload__field-wrapper--error');

//переменные для фильтров
const effectsList = document.querySelector('.effects__list');
const effectSlider = document.querySelector('.img-upload__effect-level');
const effectSliderInput = effectSlider.querySelector('.effect-level__slider');
const effectSliderValue = effectSlider.querySelector('.effect-level__value');
noUiSlider.create(effectSliderInput,{
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

let filterName = '';
let filterUnit = '';
effectSliderInput.noUiSlider.on('update', () => {
  effectSliderValue.value = effectSliderInput.noUiSlider.get();
  effectSliderValue.value = Math.round(effectSliderValue.value * 10) / 10;
  imgPreview.style.filter = `${filterName}(${ effectSliderValue.value }${filterUnit})`;
  // console.log(`${filterName}(${ parseFloat(effectSliderValue.value) }${filterUnit})`);
});

imgInput.addEventListener('change',(evt)=>{
  imgOverlay.classList.remove('hidden');
  effectSlider.classList.add('hidden');
  document.body.classList.add('modal-open');

  //загрузка изображения в превью и фильтры
  const downloadedImg = URL.createObjectURL(evt.target.files[0]);

  imgPreview.src = downloadedImg;

  const imgsPreviewEffect = document.querySelectorAll('.effects__preview');
  imgsPreviewEffect.forEach((imgPreviewEffect)=>{
    imgPreviewEffect.style.backgroundImage = `url(${ downloadedImg })`;
  });

  //изменение размера изображения и применение эффектов
  smallerButton.addEventListener('click', smallerHandler);
  biggerButton.addEventListener('click', biggerHandler);
  effectsList.addEventListener('change', effectsHandler);

  //добавление listeners на закрытие модульного окна
  closeButton.addEventListener('click', closeImgOverlay);
  document.addEventListener('keydown', closeByKey);

  //при фокусе на интпутах отключаем закритие на Ecs
  disableKeyCloseByInputOnfocus(hashtagsInput);
  disableKeyCloseByInputOnfocus(descriptionInput);
});

function smallerHandler(){
  let scale = percentToFloat(size.value);
  if (scale > MIN_SCALE) {
    scale = scale - SCALE_STEP;
    size.value = `${scale * 100}%`;
    imgPreview.style.transform = `scale(${ scale })`;
  }
}
function biggerHandler(){
  let scale = percentToFloat(size.value);
  if (scale < MAX_SCALE) {
    scale = scale + SCALE_STEP;
    size.value = `${scale * 100}%`;
    imgPreview.style.transform = `scale(${ scale })`;
  }
}

//Приминение фильтров
function effectsHandler(){
  const effectName = effectsList.querySelector('input:checked').value;
  effectSlider.classList.remove('hidden');

  switch (effectName){
    case 'none':
      effectSliderValue.value = 0;
      imgPreview.style.filter = 'none';
      effectSlider.classList.add('hidden');
      break;
    case 'chrome':
      filterName = 'grayscale';
      filterUnit = '';
      effectSliderInput.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1,
      });
      effectSliderInput.noUiSlider.set(1);
      break;
    case 'sepia':
      filterName = 'sepia';
      filterUnit = '';
      effectSliderInput.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      effectSliderInput.noUiSlider.set(1);
      break;
    case 'marvin':
      filterName = 'invert';
      filterUnit = '%';
      effectSliderInput.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1
      });
      effectSliderInput.noUiSlider.set(100);
      break;
    case 'phobos':
      filterName = 'blur';
      filterUnit = 'px';
      effectSliderInput.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      effectSliderInput.noUiSlider.set(3);
      break;
    case 'heat':
      filterName = 'brightness';
      filterUnit = '';
      effectSliderInput.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      effectSliderInput.noUiSlider.set(3);
      break;
  }
  // imgPreview.style.filter = 'grayscale(1)';
}

function closeImgOverlay(){
  imgOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeImgOverlay);
  document.removeEventListener('keydown', closeByKey);

  smallerButton.removeEventListener('click', smallerHandler);
  biggerButton.removeEventListener('click', biggerHandler);

  effectsList.removeEventListener('change', effectsHandler);
  effectSliderValue.value = 0;
  effectSliderInput.noUiSlider.set(0);
  imgPreview.style.filter = 'none';
  imgPreview.style.transform = 'scale(100%)';

  errorDivRepeat.remove();
  errorDivCount.remove();
  errorDivValid.remove();
  errorDivLength.remove();

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

function validateHashTags(hashtags){
  //прятать ошибки после каждого изменения поля, чтобы показать только нужные при проверке
  errorDivRepeat.remove();
  errorDivCount.remove();
  errorDivValid.remove();

  let result = true;
  const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

  const arrayHashTags = hashtags.toLowerCase().replace(/\s+/g, ' ').split(' '); // убираем лишние пробелы и получаем массив хештегов
  if(arrayHashTags[arrayHashTags.length - 1] === ''){
    arrayHashTags.pop();
  } // удаление последнего пустого элемента, из-за пробела в конце строки


  const hasDuplicates = arrayHashTags.length !== [...new Set(arrayHashTags)].length;
  if(arrayHashTags.length > 5 || hasDuplicates){
    // console.log('Есть дубликаты или больше 5-ти хештегов');
    if(hasDuplicates){
      errorBlockHashTags.append(errorDivRepeat);
    }
    if(arrayHashTags.length > 5){
      errorBlockHashTags.append(errorDivCount);
    }
    result = false;
  }


  const boolHashtagsArray = [];
  arrayHashTags.forEach((hashtag)=>{
    if(!hashtagRegExp.test(hashtag)){
      // console.log('Хэштеги не прошли валидацию!');
      boolHashtagsArray.push(false);
    } else{
      boolHashtagsArray.push(true);
    }
  });

  if(boolHashtagsArray.includes(false)){
    const errorIndex = boolHashtagsArray.indexOf(false);
    errorDivValid.textContent = `хештег под номером ${ errorIndex + 1} невалидный`;
    errorBlockHashTags.append(errorDivValid);
    result = false;
  }
  // console.log('tags: ' + result);
  return result;
}

function validateDescription(description){
  errorDivLength.remove();
  let result = true;
  if(description.length > 140){
    errorBlockDescription.append(errorDivLength);
    result = false;
  }
  // console.log('desc: ' + result);
  return result;
}

pristine.addValidator(hashtagsInput, validateHashTags);
pristine.addValidator(descriptionInput, validateDescription);

const uploadSubmitButton = document.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = SubmitButtonText.IDLE;
};


// const setUserFromSubmit = (onSuccess) => {
imgUploadForm.addEventListener('submit',(evt)=>{
  evt.preventDefault();

  const isValid = pristine.validate();
  if(isValid){
    // console.log("Форма успошно отправлена!");
    const formData = new FormData(evt.target);
    blockSubmitButton();
    // imgUploadForm.submit();
    sendData(formData)
      .then(closeImgOverlay)
      .then(showSuccess)
      .catch((err)=>{
        showError(err.message);
      })
      .finally(unblockSubmitButton);
  }
});
// };

