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

export {
  getRandomArrayElement,
  getRandomArrayElements,
  getRandomInteger,
  createIdGenerator,
  createRandomIdFromRangeGenerator,
  capitalizeFirstLetter,
  isEscapeKey,
  percentToFloat
};
