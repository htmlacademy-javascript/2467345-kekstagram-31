const postsContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
const postsFragment = document.createDocumentFragment();


function renderPosts(postsData){
  postsData.forEach(({id,url,description,likes,comments})=>{
    const postElement = postTemplate.cloneNode(true);

    const img = postElement.querySelector('.picture__img');
    img.src = url;
    img.alt = description;

    postElement.querySelector('.picture__likes').textContent = likes;
    postElement.querySelector('.picture__comments').textContent = comments.length;
    postElement.id = id;
    postsFragment.append(postElement);
  });

  postsContainer.append(postsFragment);
}

export {renderPosts};
