import {createPosts} from './data.js';
import {renderPosts} from './renderPost.js';
import {renderBigPicture} from './bigPicture.js';

const postsData = createPosts();
renderPosts(postsData);
const posts = document.querySelectorAll('.picture');

//отрисовка bigPicture при нажатии
const onPostOpen = function(){
  const postId = parseInt(this.id,10);
  renderBigPicture(postsData.find(({id}) => id === postId));
};

//добавление слушателей на каждый пост
posts.forEach((post) => {
  post.addEventListener('click', onPostOpen);
});
