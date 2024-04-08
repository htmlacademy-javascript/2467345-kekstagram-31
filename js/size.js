import { percentToFloat } from './util';

//переменные для изменения размера изображения
const MIN_SCALE = 0.25;
const MAX_SCALE = 1;
const SCALE_STEP = 0.25;

const imgPreview = document.querySelector('.img-upload__preview>img');
const fieldsetSize = document.querySelector('.img-upload__scale');
const size = fieldsetSize.querySelector('.scale__control--value');
const smallerButton = fieldsetSize.querySelector('.scale__control--smaller');
const biggerButton = fieldsetSize.querySelector('.scale__control--bigger');


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

function addSizeListeners(){
  smallerButton.addEventListener('click', smallerHandler);
  biggerButton.addEventListener('click', biggerHandler);
}

function removeSizeListeners(){
  smallerButton.addEventListener('click', smallerHandler);
  biggerButton.addEventListener('click', biggerHandler);
}

export {smallerHandler, biggerHandler, addSizeListeners, removeSizeListeners};
