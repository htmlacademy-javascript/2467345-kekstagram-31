
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

const errorTemplate = document.querySelector('#data-error').content.querySelector('section');
function showAlert(message) {
  const errorElement = errorTemplate.cloneNode(true);
  const errorTitle = errorElement.querySelector('h2');
  errorTitle.textContent = message;

  document.body.insertAdjacentElement('beforeend',errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
}

const successTemplate = document.querySelector('#success').content.querySelector('section');
const successElement = successTemplate.cloneNode(true);
const closeButton = successElement.querySelector('button');

function showSuccess() {
  closeButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', closeByKey);

  document.body.insertAdjacentElement('beforeend',successElement);

}

function closeSuccessMessage(){
  successElement.remove();
  document.removeEventListener('keydown', closeByKey);
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
  debounce
};
