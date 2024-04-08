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

function removeValidationErrors(){
  errorDivRepeat.remove();
  errorDivCount.remove();
  errorDivValid.remove();
  errorDivLength.remove();
}

export {
  validateHashTags,
  validateDescription,
  removeValidationErrors
};
