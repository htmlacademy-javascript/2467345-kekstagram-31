import {createPosts} from './data.js';
import {renderPosts} from './renderPost.js';
import {renderBigPicture} from './bigPicture.js';
import { isEscapeKey } from './util.js';


const postsData = createPosts();
renderPosts(postsData);

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const posts = document.querySelectorAll('.picture');
const commentsContainer = document.querySelector('.social__comments');

//поведение при закрытии bigPicture
function closeBigPicture(){
  bigPicture.classList.add('hidden');
  commentsContainer.querySelectorAll('li').forEach((comment) => comment.remove());
  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', closeByKey);
  document.body.classList.remove('modal-open');
}

function closeByKey(evt){
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closeBigPicture();
  }
}


//отрисовка bigPicture при нажатии
const onPostOpen = function(){
  const postId = parseInt(this.id,10);
  renderBigPicture(postsData.find(({id}) => id === postId));

  bigPicture.classList.remove('hidden');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');
  //закрытие bigPicture по нажатию на кнопку
  closeButton.addEventListener('click', closeBigPicture);
  //закрытие bigPicture по нажатию esc
  document.addEventListener('keydown', closeByKey);

};

//добавление слушателей на каждый пост
posts.forEach((post) => {
  post.addEventListener('click', onPostOpen);
});
