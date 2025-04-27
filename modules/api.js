export const userData = JSON.parse(localStorage.getItem('user'))
const host = 'https://wedev-api.sky.pro/api/v2/chetin-yura'
const auth = 'https://wedev-api.sky.pro/api/user'

export let token = ''

export const setToken = (newToken) => {
    token = newToken
}
export let name = ''
export const setName = (newName) => {
    name = newName
}
// Загружает список комментариев с сервера. Выполняет GET-запрос на эндпоинт /comments, преобразует дату и форматирует комментарии для отображения в приложении.
export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => {
            return res.json()
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date).toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    }),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })

            return appComments
        })
}
// Отправляет новый комментарий на сервер. Выполняет POST-запрос на эндпоинт /comments с текстом комментария и именем пользователя.
//  Обрабатывает статус ответа и выбрасывает ошибки при неудачной отправке.
export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userData ? userData.token : token}`,
        },
        body: JSON.stringify({ text, name }),
    }).then((response) => {
        if (response.status === 500) {
            throw new Error('Ошибка сервера')
        }

        if (response.status === 400) {
            throw new Error('Неверный запрос')
        }

        if (response.status === 201) {
            return response.json()
        }

        throw new Error('Неизвестная ошибка при отправке комментария')
    })
}
// функция отправляет на сервер логин и пароль пользователя, введеные в поля, далее идет обработка ошибок
export const login = (login, password) => {
    return fetch(auth + '/login', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Ошибка сервера')
            }

            if (response.status === 400) {
                throw new Error('Неверный логин или пароль')
            }

            if (response.status === 201) {
                return response.json()
            }

            throw new Error('Неизвестная ошибка')
        })
        .catch((error) => {
            console.error('Ошибка при авторизации:', error.message)
            throw error
        })
}
// функция регистрации с именем логином и паролем
export const registration = (name, login, password) => {
    return fetch(auth, {
        method: 'POST',
        body: JSON.stringify({ name: name, login: login, password: password }),
    })
}
