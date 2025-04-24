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
        // Проверка пустых полей (ваш существующий код)
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

        // Показываем загрузку
        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        // Функция для отправки комментария с повторами
        const tryPostComment = (attempt = 1, maxAttempts = 3, delay = 2000) => {
            postComment(sanitizeHtml(text.value), sanitizeHtml(name.value))
                .then((data) => {
                    // Успешная отправка
                    document.querySelector('.form-loading').style.display =
                        'none'
                    document.querySelector('.add-form').style.display = 'flex'
                    updateComments(data)
                    renderComments()
                    name.value = ''
                    text.value = ''
                })
                .catch((error) => {
                    // Обработка ошибок
                    if (
                        error.message === 'Ошибка сервера' &&
                        attempt < maxAttempts
                    ) {
                        setTimeout(() => {
                            tryPostComment(attempt + 1, maxAttempts, delay)
                        }, delay)
                        return
                    }

                    // Другие ошибки или превышено кол-во попыток
                    document.querySelector('.form-loading').style.display =
                        'none'
                    document.querySelector('.add-form').style.display = 'flex'

                    if (error.message === 'Failed to fetch') {
                        alert('Нет интернета, попробуйте снова')
                    } else if (error.message === 'Ошибка сервера') {
                        alert('Сервер временно недоступен. Попробуйте позже.')
                    } else if (error.message === 'Неверный запрос') {
                        alert(
                            'Имя и комментарий должны быть больше 3х символов',
                        )
                        name.classList.add('-error')
                        text.classList.add('-error')
                        setTimeout(() => {
                            name.classList.remove('-error')
                            text.classList.remove('-error')
                        }, 2000)
                    }
                })
        }

        tryPostComment()
    })
}
