import { isEscapeKey } from './util.js';
const bigPicture = document.querySelector('.big-picture');

const bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const caption = bigPicture.querySelector('.social__caption');
const commentsContainer = bigPicture.querySelector('.social__comments');

const loadComments = bigPicture.querySelector('.social__comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const LOAD_COMMENTS_SIZE = 5;//Сколько загружать комментариев

function renderBigPicture({url,description,likes,comments}){
  let commentsShown = LOAD_COMMENTS_SIZE;
  //заполнение данными поста
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  if (comments.length >= commentsShown) {
    commentShownCount.textContent = commentsShown;
    commentsContainer.append(renderComment(comments,0,commentsShown));
  } else{
    commentShownCount.textContent = comments.length;
    commentsContainer.append(renderComment(comments,0,comments.length));
  }
  commentTotalCount.textContent = comments.length;
  caption.textContent = description;

  //изменение классов
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  //добавление listeners
  closeButton.addEventListener('click', closeBigPicture); //закрытие bigPicture по нажатию на кнопку
  document.addEventListener('keydown', closeByKey); //закрытие bigPicture по нажатию esc
  loadComments.addEventListener('click',onCommentsLoad); //загрузка следующих комментариев

  //функции для listeners
  function closeBigPicture(){
    commentsContainer.querySelectorAll('li').forEach((comment) => comment.remove());

    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');

    closeButton.removeEventListener('click', closeBigPicture);
    document.removeEventListener('keydown', closeByKey);
    loadComments.removeEventListener('click',onCommentsLoad);
  }

  function closeByKey(evt){
    if(isEscapeKey(evt)){
      evt.preventDefault();
      closeBigPicture();
    }
  }

  function onCommentsLoad(){
    const lastCommentsCount = comments.length - commentsShown;
    if (lastCommentsCount < LOAD_COMMENTS_SIZE){
      commentsContainer.append(renderComment(comments, commentsShown, commentsShown + lastCommentsCount));
      commentsShown += lastCommentsCount;
      commentShownCount.textContent = commentsShown;
    } else if(commentsShown < comments.length){
      commentsContainer.append(renderComment(comments, commentsShown, commentsShown + LOAD_COMMENTS_SIZE));
      commentsShown += LOAD_COMMENTS_SIZE;
      commentShownCount.textContent = commentsShown;
    }
  }
}
//отрисовка комментарие: спиcок комментариев, индекс первого, индекс последнего
function renderComment(comments,start,end){
  const commentsFragment = document.createDocumentFragment();
  for(let i = start; i < end; i++){
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');

    const newImg = document.createElement('img');
    newImg.classList.add('social__picture');
    newImg.src = comments[i].avatar;
    newImg.alt = comments[i].name;
    newImg.width = 35;
    newImg.height = 35;

    const newText = document.createElement('p');
    newText.classList.add('.social__text');
    newText.textContent = comments[i].message;

    newComment.append(newImg);
    newComment.append(newText);

    commentsFragment.append(newComment);
  }
  return commentsFragment;
}

export {renderBigPicture};
