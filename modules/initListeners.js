import { postComment } from './api.js'
import { comments, updateComments } from './comments.js'
import { sanitizeHtml } from './replace.js'

export const initReplyListeners = () => {
    const text = document.getElementById('text-input')
    const commentsElements = document.querySelectorAll('.comment')

    for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', () => {
            const currentComment = comments[commentElement.dataset.index]
            text.value = `> ${currentComment.name} : ${currentComment.text}`
        })
    }
}

export const initAddCommentListener = (renderComments) => {
    const text = document.getElementById('text-input')
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

        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        postComment(sanitizeHtml(text.value), sanitizeHtml(name.value))
            .then((data) => {
                document.querySelector('.form-loading').style.display = 'none'
                document.querySelector('.add-form').style.display = 'flex'
                updateComments(data)
                renderComments()
                name.value = ''
                text.value = ''
            })
            .catch((error) => {
                document.querySelector('.form-loading').style.display = 'none'
                document.querySelector('.add-form').style.display = 'flex'

                if (error.message === 'Failed to fetch') {
                    alert('Нет интернета, попробуйте снова')
                }

                if (error.message === 'Ошибка сервера') {
                    alert('Ошибка сервера')
                }

                if (error.message === 'Неверный запрос') {
                    alert('Имя и комментарий должны быть больше 3х символов')

                    name.classList.add('-error')
                    text.classList.add('-error')

                    setTimeout(() => {
                        name.classList.remove('-error')
                        text.classList.remove('-error')
                    }, 2000)
                }
            })
    })
}
