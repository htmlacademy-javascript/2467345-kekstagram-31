import './renderPost.js';
import './form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import {renderPosts} from './renderPost.js';

getData()
  .then((wizards) => {
    renderPosts(wizards);
  })
  .catch((err)=>{
    showAlert(err.message);
  });

