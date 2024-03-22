import { isEscapeKey } from './util.js';
import '/vendor/pristine/pristine.min';

const imgInput = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

imgInput.addEventListener('change',(evt)=>{
  imgOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const downloadedImg = URL.createObjectURL(evt.target.files[0]);
  const imgPreview = document.querySelector('.img-upload__preview>img');
  imgPreview.src = downloadedImg;

  const imgsPreviewEffect = document.querySelectorAll('.effects__preview');
  imgsPreviewEffect.forEach((imgPreviewEffect)=>{
    imgPreviewEffect.style.backgroundImage = `url(${ downloadedImg })`;
  });

  //добавление listeners
  const closeButton = imgOverlay.querySelector('.img-upload__cancel');
  closeButton.addEventListener('click', closeImgOverlay);
  document.addEventListener('keydown', closeByKey);

  //прифокусе на интпутах отключаем закритие на Ecs
  disableKeyCloseByInputOnfocus(hashtagsInput);
  disableKeyCloseByInputOnfocus(descriptionInput);

  function closeImgOverlay(){
    imgOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');

    closeButton.removeEventListener('click', closeImgOverlay);
    document.removeEventListener('keydown', closeByKey);

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
