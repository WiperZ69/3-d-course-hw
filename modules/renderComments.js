import { comments } from './comments.js'
import { initLikeListeners } from './initLikeListeners.js'
import { initReplyListeners, initAddCommentListener } from './initListeners.js'
import { renderLogin } from './renderLogin.js'
import { name } from './api.js'

export const renderComments = () => {
    const userData = JSON.parse(localStorage.getItem('user'))
    const container = document.querySelector('.container')
    const commentsHtml = comments
        .map((comment, index) => {
            return ` 
      <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comments">
            ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
            </div>
          </div>
        </li>`
        })
        .join('')

    const addCommentsHtml = `
            <div class="add-form">
                <div class="add-form-top">
                <input
                    type="text"
                    id="name-input"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                    readonly
                    value="${userData ? userData.name : name}"
                    autocomplete="given-name name cc-name"
                    name="name"
                    required
                /> <span class="add-form-button-quit">Выйти</span>
                </div>
                <textarea
                    type="textarea"
                    id="text-input"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                    required
                ></textarea>
                <div class="add-form-row">
                    <button class="add-form-button">Написать</button>
                </div>
            </div>
            <div class="form-loading" style="display: none; margin-top: 20px">
                Коментарий добавляется...
            </div>`

    const linkToLoginText = `<p>Чтобы отправить комментарий, <span class="link-login">войдите</span></p>`

    const baseHtml = `<ul class="comments">${commentsHtml}</ul>
    ${userData ? addCommentsHtml : linkToLoginText}
    `
    container.innerHTML = baseHtml
    if (userData) {
        initLikeListeners(renderComments)
        initReplyListeners()
        initAddCommentListener(renderComments)
        const quitComments = document.querySelector('.add-form-button-quit')

        quitComments.addEventListener('click', () => {
            localStorage.clear()
            renderLogin()
        })
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
    }
}
