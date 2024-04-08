
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElements = (elements, count) =>{
  if(count < 1){
    return elements[getRandomInteger(0, elements.length - 1)];
  } else if(count >= elements.length){
    return elements;
  }

  const resultElements = [];
  for(let i = 0; i < count; i++){
    let currentValue = elements[getRandomInteger(0, elements.length - 1)];
    while(resultElements.includes(currentValue)){
      currentValue = elements[getRandomInteger(0, elements.length - 1)];
    }
    resultElements.push(currentValue);
  }

  return resultElements;
};

function percentToFloat(str){
  return parseInt(str.slice(0,-1),10) / 100;
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomArrayElements,
  getRandomInteger,
  isEscapeKey,
  percentToFloat,
  debounce
};
