
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const getRandomArrayElements = (elements, count) =>{
  if(count < 1){
    return elements[getRandomInteger(0, elements.length - 1)];
  } else if(count >= elements.length){
    return elements;
  }

  const result = [];
  for(let i = 0; i < count; i++){
    let currentValue = elements[getRandomInteger(0, elements.length - 1)];
    while(result.includes(currentValue)){
      currentValue = elements[getRandomInteger(0, elements.length - 1)];
    }
    result.push(currentValue);
  }

  return result;
};
function createIdGenerator(){
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function capitalizeFirstLetter(string) {
  return string.charAt(0) + string.slice(1).toLowerCase();
}

function percentToFloat(str){
  return parseInt(str.slice(0,-1),10) / 100;
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('section');
function showAlert(message) {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  const dataErrorTitle = dataErrorElement.querySelector('h2');
  dataErrorTitle.textContent = message;
  document.body.insertAdjacentElement('beforeend',dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, 5000);
}

const errorTemplate = document.querySelector('#error').content.querySelector('section');
const errorElement = errorTemplate.cloneNode(true);
const errorDiv = errorElement.querySelector('div');
const closeErorrButton = errorElement.querySelector('button');

function showError() {
  closeErorrButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', closeErrorByKey);
  document.addEventListener('click', clickOutsideErrorModal);

  document.body.insertAdjacentElement('beforeend',errorElement);
}
function clickOutsideErrorModal(e){

  const withinBoundaries = e.composedPath().includes(errorDiv);

  if (! withinBoundaries) {
    errorElement.remove(); // скрываем элемент т к клик был за его пределами
  }
}

function closeErrorMessage(){
  errorElement.remove();
  document.removeEventListener('keydown', closeErrorByKey);
  document.removeEventListener('click', clickOutsideModal);
}

function closeErrorByKey(evt){
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closeErrorMessage();
  }
}

const successTemplate = document.querySelector('#success').content.querySelector('section');
const successElement = successTemplate.cloneNode(true);
const successDiv = successElement.querySelector('div');
const closeButton = successElement.querySelector('button');

function showSuccess() {

  closeButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', closeByKey);
  document.addEventListener('click', clickOutsideModal);

  document.body.insertAdjacentElement('beforeend',successElement);

}
function clickOutsideModal(e){

  const withinBoundaries = e.composedPath().includes(successDiv);

  if (! withinBoundaries) {
    successElement.remove(); // скрываем элемент т к клик был за его пределами
  }
}

function closeSuccessMessage(){
  successElement.remove();
  document.removeEventListener('keydown', closeByKey);
  document.removeEventListener('click', clickOutsideModal);
  // closeButton.removeEventListener('click', closeSuccessMessage());
}

function closeByKey(evt){
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closeSuccessMessage();
  }
}

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomArrayElement,
  getRandomArrayElements,
  getRandomInteger,
  createIdGenerator,
  createRandomIdFromRangeGenerator,
  capitalizeFirstLetter,
  isEscapeKey,
  percentToFloat,
  showAlert,
  showSuccess,
  showError,
  debounce
};
