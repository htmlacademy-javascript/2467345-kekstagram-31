import { renderBigPicture } from './bigPicture';
import { getRandomArrayElements } from './util';
const postsContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
const postsFragment = document.createDocumentFragment();

const filterSection = document.querySelector('.img-filters');
const filterDefault = filterSection.querySelector('#filter-default');
const filterRandom = filterSection.querySelector('#filter-random');
const filterPopular = filterSection.querySelector('#filter-discussed');

function renderPosts(postsData){
  const currentFilter = filterSection.querySelector('.img-filters__button--active');
  const filterId = currentFilter.id;
  postsData = postsData.slice();

  switch(filterId){
    case 'filter-random':
      postsData = getRandomArrayElements(postsData,10);
      break;
    case 'filter-discussed':
      postsData = postsData.sort(compareByCommentsCount);
      break;
  }

  postsData
    .forEach(({id,url,description,likes,comments})=>{
      const postElement = postTemplate.cloneNode(true);

      const img = postElement.querySelector('.picture__img');
      img.src = url;
      img.alt = description;

      postElement.querySelector('.picture__likes').textContent = likes;
      postElement.querySelector('.picture__comments').textContent = comments.length;
      postElement.id = id;
      postsFragment.append(postElement);
    });

  const oldPosts = postsContainer.querySelectorAll('.picture');
  oldPosts.forEach((post) => {
    post.remove();
  });
  postsContainer.append(postsFragment);

  //отрисовка bigPicture при нажатии
  const onPostOpen = function(){
    const postId = parseInt(this.id,10);
    renderBigPicture(postsData.find(({id}) => id === postId));
  };
  const posts = document.querySelectorAll('.picture');
  //добавление слушателей на каждый пост
  posts.forEach((post) => {
    post.addEventListener('click', onPostOpen);
  });

  filterSection.classList.remove('img-filters--inactive');
}

function compareByCommentsCount(postA,postB){
  return postB.comments.length - postA.comments.length;
}

const setFilterClick = (cb) => {
  filterPopular.addEventListener('click',() => {
    const currentFilter = filterSection.querySelector('.img-filters__button--active');
    currentFilter.classList.remove('img-filters__button--active');
    filterPopular.classList.add('img-filters__button--active');
    cb();
  });
  filterRandom.addEventListener('click',() => {
    const currentFilter = filterSection.querySelector('.img-filters__button--active');
    currentFilter.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');
    cb();
  });
  filterDefault.addEventListener('click',() => {
    const currentFilter = filterSection.querySelector('.img-filters__button--active');
    currentFilter.classList.remove('img-filters__button--active');
    filterDefault.classList.add('img-filters__button--active');
    cb();
  });
};

export {renderPosts,setFilterClick};
