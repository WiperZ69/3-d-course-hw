import { comments } from './comments.js'
import { sanitizeHtml } from './replace.js'
import { formattedTime } from './time.js'

export const renderComments = () => {
    const list = document.querySelector('.comments')
    list.innerHTML = comments
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

    const likeButtons = document.querySelectorAll('.like-button')

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation()

            const index = likeButton.dataset.index
            const comment = comments[index]

            comment.likes = comment.isLiked
                ? comment.likes - 1
                : comment.likes + 1

            comment.isLiked = !comment.isLiked

            renderComments()
        })
    }

    const text = document.getElementById('text-input')
    const commentsElements = document.querySelectorAll('.comment')

    for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', () => {
            const currentComment = comments[commentElement.dataset.index]
            text.value = `> ${currentComment.name} : ${currentComment.text}`
        })
    }


    const name = document.getElementById('name-input')
    const addButton = document.querySelector('.add-form-button')

    addButton.addEventListener('click', () => {
    if (name.value === '') {
        const form = document.querySelector('.add-form')
        const formName = document.querySelector('.add-form-name')
        const errorMessage = document.createElement('span')
        errorMessage.classList.add('error')
        errorMessage.textContent = 'Имя не может быть пустым'
        form.insertBefore(errorMessage, formName)
        setTimeout(() => errorMessage.remove(), 3000)
        return
    }
    if (text.value === '') {
        const form = document.querySelector('.add-form')
        const formText = document.querySelector('.add-form-text')
        const errorMessage = document.createElement('span')
        errorMessage.classList.add('error')
        errorMessage.textContent = 'Комментарий не может быть пустым'
        form.insertBefore(errorMessage, formText)
        setTimeout(() => errorMessage.remove(), 3000)
        return
    }

    const newComment = {
        name: sanitizeHtml(name.value),
        date: formattedTime,
        text: sanitizeHtml(text.value),
        likes: 0,
        isLiked: false,
    }

    comments.push(newComment)

    renderComments()

    name.value = ''
    text.value = ''
})
}
