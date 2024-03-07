import {createPosts} from './data.js';
const postsContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');

const postsData = createPosts();
const postsFragment = document.createDocumentFragment();

postsData.forEach(({url,description,likes,comments})=>{
  const postElement = postTemplate.cloneNode(true);

  const img = postElement.querySelector('.picture__img');
  img.src = url;
  img.alt = description;

  postElement.querySelector('.picture__likes').textContent = likes;
  postElement.querySelector('.picture__comments').textContent = comments.length;

  postsFragment.append(postElement);
});

postsContainer.append(postsFragment);


