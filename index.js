import { renderComments } from './modules/renderComments.js'
import { updateComments } from './modules/comments.js'
import { fetchComments } from './modules/api.js'
import { renderLogin } from './modules/renderLogin.js'

export const userData = JSON.parse(localStorage.getItem('user'))

export const fetchAndRenderComments = (isFirstLoading) => {
    if (userData) {
        if (isFirstLoading) {
            document.querySelector('.container').innerHTML =
                `<p>Пожалуйста, подождите, загружаю комментарии...</p>`
        }
    } else {
        renderLogin()
    }
    fetchComments().then((data) => {
        updateComments(data)
        renderComments()
    })
}

fetchAndRenderComments(true)
