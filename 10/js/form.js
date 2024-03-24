import { isEscapeKey } from './util.js';
import '/vendor/pristine/pristine.min';
import {percentToFloat} from './util.js';
import '/vendor/nouislider/nouislider.js';

const imgInput = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgPreview = document.querySelector('.img-upload__preview>img');

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

let filterName = '';
let filterUnit = '';
effectSliderInput.noUiSlider.on('update', () => {
  effectSliderValue.value = effectSliderInput.noUiSlider.get();
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

  //изменение размера изображения
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
  smallerButton.addEventListener('click', smallerHandler);
  biggerButton.addEventListener('click', biggerHandler);

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
  effectsList.addEventListener('change', effectsHandler);

  //добавление listeners на закрытие модульного окна
  const closeButton = imgOverlay.querySelector('.img-upload__cancel');
  closeButton.addEventListener('click', closeImgOverlay);
  document.addEventListener('keydown', closeByKey);

  //при фокусе на интпутах отключаем закритие на Ecs
  disableKeyCloseByInputOnfocus(hashtagsInput);
  disableKeyCloseByInputOnfocus(descriptionInput);

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

    imgUploadForm.reset();
  }

  function closeByKey(e){
    if(isEscapeKey(e)){
      evt.preventDefault();
      closeImgOverlay();
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
});

const pristine = new Pristine(imgUploadForm);

const errorBlock = document.querySelectorAll('.img-upload__field-wrapper');
const errorBlockHashTags = errorBlock[0];
const errorBlockDescription = errorBlock[1];
const errorDivRepeat = document.createElement('div');
errorDivRepeat.textContent = 'Хэштеги повторяются';
errorDivRepeat.classList.add('hashtags-error__repeat');
errorDivRepeat.classList.add('.img-upload__field-wrapper--error');
errorBlockHashTags.append(errorDivRepeat);
errorDivRepeat.classList.add('hidden');

const errorDivCount = document.createElement('div');
errorDivCount.textContent = 'Введите до 5 хештегов';
errorDivCount.classList.add('hashtags-error__count');
errorDivCount.classList.add('.img-upload__field-wrapper--error');
errorBlockHashTags.append(errorDivCount);
errorDivCount.classList.add('hidden');

const errorDivValid = document.createElement('div');
errorDivValid.textContent = 'введён невалидный хештег';
errorDivValid.classList.add('hashtags-error__valid');
errorDivValid.classList.add('.img-upload__field-wrapper--error');
errorBlockHashTags.append(errorDivValid);
errorDivValid.classList.add('hidden');

const errorDivLength = document.createElement('div');
errorDivLength.textContent = 'Введите до 140 символов';
errorDivLength.classList.add('hashtags-error__valid');
errorDivLength.classList.add('.img-upload__field-wrapper--error');
errorBlockDescription.append(errorDivLength);
errorDivLength.classList.add('hidden');


function validateHashTags(hashtags){
  //прятать ошибки после каждого изменения поля, чтобы показать только нужные при проверке
  errorDivRepeat.classList.add('hidden');
  errorDivCount.classList.add('hidden');
  errorDivValid.classList.add('hidden');

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
      errorDivRepeat.classList.remove('hidden');
    }
    if(arrayHashTags.length > 5){
      errorDivCount.classList.remove('hidden');
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
    errorDivValid.classList.remove('hidden');
    result = false;
  }
  // console.log('tags: ' + result);
  return result;
}

function validateDescription(description){
  errorDivLength.classList.add('hidden');
  let result = true;
  if(description.length > 140){
    errorDivLength.classList.remove('hidden');
    result = false;
  }
  // console.log('desc: ' + result);
  return result;
}

pristine.addValidator(hashtagsInput, validateHashTags);
pristine.addValidator(descriptionInput, validateDescription);

imgUploadForm.addEventListener('submit',(evt)=>{
  evt.preventDefault();
  if(pristine.validate()){
    // console.log("Форма успошно отправлена!");
    imgUploadForm.submit();
  }
});
