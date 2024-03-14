const bigPictureImage = document.querySelector('.big-picture__img').querySelector('img');
const likesCount = document.querySelector('.likes-count');
const commentShownCount = document.querySelector('.social__comment-shown-count');
const commentTotalCount = document.querySelector('.social__comment-total-count');
const caption = document.querySelector('.social__caption');
const commentsContainer = document.querySelector('.social__comments');


function renderBigPicture({url,description,likes,comments}){
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  commentShownCount.textContent = 3;
  commentTotalCount.textContent = comments.length;
  commentsContainer.append(renderComment(comments,comments.length));
  caption.textContent = description;
}

function renderComment(comments,count){
  const commentsFragment = document.createDocumentFragment();
  for(let i = 0; i < count; i++){
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
