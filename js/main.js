import './render-post.js';
import './form.js';
import { getData } from './api.js';
import { showAlert } from './message.js';
import { debounce } from './util.js';
import { renderPosts } from './render-post.js';
import { setFilterClick } from './render-post.js';

const REREDER_DELAY = 500;

getData()
  .then((posts) => {
    renderPosts(posts);
    setFilterClick(debounce(
      () => renderPosts(posts), REREDER_DELAY,
    ));
  })
  .catch((err)=>{
    showAlert(err.message);
  });

