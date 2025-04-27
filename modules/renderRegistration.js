import { registration, setToken, setName } from './api.js'
import { fetchAndRenderComments } from '../index.js'
import { renderLogin } from './renderLogin.js'

export const renderRegistration = () => {
    const container = document.querySelector('.container')

    const loginhtml = `
    <section class="add-form">
        <h1>Форма регистрации</h1>
        <input type="text" class="add-form-name wh-100 mb-1" placeholder="Введите имя" id="name" required/>
        <input type="text" class="add-form-name wh-100 mb-1" placeholder="Введите логин" id="login" required/>
        <input type="password" class="add-form-name wh-100" placeholder="Введите пароль" id="password" required/>
        <fieldset class="add-form-registry">
            <button class="add-form-button-main button-main" type="submit">Зарегистрироваться</button>
            <u class="add-form-button-link entry" >Войти</u>
        </fieldset>
    </section>
    `

    container.innerHTML = loginhtml

    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin()
    })

    const nameEl = document.getElementById('name')
    const log = document.getElementById('login')
    const pass = document.getElementById('password')
    const btn = document.querySelector('.button-main')

    btn.addEventListener('click', () => {
        registration(nameEl.value, log.value, pass.value)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setToken(data.user.token)
                setName(data.user.name)
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        name: data.user.name,
                        token: data.user.token,
                    }),
                )
                fetchAndRenderComments()
            })
    })
}
