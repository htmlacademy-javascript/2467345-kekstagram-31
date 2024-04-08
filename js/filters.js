
let filterName = '';
let filterUnit = '';

const imgPreview = document.querySelector('.img-upload__preview>img');

//переменные для фильтров
const effectsList = document.querySelector('.effects__list');
const effectSlider = document.querySelector('.img-upload__effect-level');
const effectSliderInput = effectSlider.querySelector('.effect-level__slider');
const effectSliderValue = effectSlider.querySelector('.effect-level__value');

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
}

function resetFilters(){
  effectSliderValue.value = 0;
  effectSliderInput.noUiSlider.set(0);
  imgPreview.style.filter = 'none';
  imgPreview.style.transform = 'scale(100%)';
}

export { effectsHandler, resetFilters, effectSliderInput, effectSliderValue, effectSlider, effectsList, filterName, filterUnit};
