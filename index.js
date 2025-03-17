import {renderComments} from "./modules/renderComments.js";
import { comments } from "./modules/comments.js";
import { sanitizeHtml } from "./modules/replace.js";
import { formattedTime } from "./modules/time.js";


renderComments();
const name = document.getElementById("name-input");
const text = document.getElementById("text-input");
const addButton = document.querySelector(".add-form-button");
  
  addButton.addEventListener("click", () => {
    if (name.value === "" ) {
        const form = document.querySelector('.add-form');
        const formName = document.querySelector('.add-form-name');
        const errorMessage = document.createElement("span");
        errorMessage.classList.add('error');
        errorMessage.textContent = 'Имя не может быть пустым';
        form.insertBefore(errorMessage, formName);
        setTimeout(() => errorMessage.remove(), 3000);
        return;
    }
    if (text.value === "") {
        const form = document.querySelector('.add-form');
        const formText = document.querySelector('.add-form-text');
        const errorMessage = document.createElement("span");
        errorMessage.classList.add('error');
        errorMessage.textContent = 'Комментарий не может быть пустым';
        form.insertBefore(errorMessage, formText);
        setTimeout(() => errorMessage.remove(), 3000);
        return;
    }
    
    const newComment = {
      name: sanitizeHtml(name.value),
      date: formattedTime,
      text: sanitizeHtml(text.value),
      likes: 0,
      isLiked: false,
    }
  
    comments.push(newComment);
  
    renderComments();
  
    name.value = "";
    text.value = "";
  });