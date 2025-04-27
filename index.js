import { renderComments } from './modules/renderComments.js'
import { updateComments } from './modules/comments.js'
import { fetchComments } from './modules/api.js'
import { renderLogin } from './modules/renderLogin.js'
// Добавление user`а в localStorage
export const userData = JSON.parse(localStorage.getItem('user'))
// Получение и рендер комментариев, проверка есть ли информация о нашем пользователе в localStorage
export const fetchAndRenderComments = (isFirstLoading) => {
    if (userData) {
        if (isFirstLoading) {
            document.querySelector('.container').innerHTML =
                `<p>Пожалуйста, подождите, загружаю комментарии...</p>`
        }
    } else {
        // рендер странички логина
        renderLogin()
    }
    // получение комментариев и дальнейший занесение их в объект с комментариями, ее обновление и рендер комметариев
    fetchComments().then((data) => {
        updateComments(data)
        renderComments()
    })
}
// Вызов функции с агрументом true, то есть первый ли раз он загружает нашу страницу
fetchAndRenderComments(true)
