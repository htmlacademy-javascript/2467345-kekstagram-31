const POST_DESCRIPTIONS = [
  'Будь счастлив именно сейчас в текущий момент. Потому что твоя жизнь всегда состоит из текущих моментов.',
  'Фотография не является отражением реальности. Она есть реальность этого отражения.',
  'Будь таким человеком, с которым мечтаешь встретиться.',
  'Ведь природа, обращенная к камере — это не та природа, что обращена к глазу; различие, прежде всего, в том, что место пространства, освоенного человеческим сознанием, занимает пространство, освоенное бессознательным.',
  'Будьте героями своих собственных историй!',
  'Когда вы снимаете людей в цвете, вы фотографируете их одежду. Но когда вы переключаетесь на черно-белую фотографию — вы запечатлеваете их душу.',
  'Будьте счастливы в этот момент, потому что этот момент — и есть ваша жизнь.',
  'Реальность становится всё больше похожа на фотографии.',
  'Будьте терпеливы, потому что лучшие вещи в жизни всегда требуют времени.'
];

const NAMES = [
  'ЗААВА',
  'ЗАБИБ',
  'ЗАБИБА',
  'ЗАБИДА',
  'ЗАБИЛЬ',
  'ЗАБИР',
  'ЗАБИРА',
  'ЗАБИРУЛЛА',
  'ЗАБИХ',
  'ЗАБИХА',
  'ЗАБИХУЛЛА',
  'ЗАВАР',
  'ЗАВАРБАНУ',
  'ЗАВЕН',
  'ЗАВИЛЬ',
  'ЗАВИЛЯ',
  'ЗАВИЯ',
  'ЗАВКИЯ'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


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


const generatePostId = createRandomIdFromRangeGenerator(1,25);
const generatePhotoId = createRandomIdFromRangeGenerator(1,25);

const generateCommentId = createIdGenerator();
const generateMessage = () => getRandomArrayElements(MESSAGES, 2).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1,6) }.svg`,
  message: generateMessage(),
  name: capitalizeFirstLetter(getRandomArrayElement(NAMES))

});

const createPost = () => ({
  id: generatePostId(),
  url: `photos/${ generatePhotoId() }.jpg`,
  description: getRandomArrayElement(POST_DESCRIPTIONS),
  likes: getRandomInteger(15,200),
  comments: Array.from({length: getRandomInteger(0,30)}, createComment)
});

const similarPosts = Array.from({length: 25}, createPost);

//console.log(similarPosts[4].comments);

