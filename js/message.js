import { isEscapeKey } from './util';

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

export {
  showAlert,
  showSuccess,
  showError,
};
