import { login, setToken, setName } from './api.js'
import { fetchAndRenderComments } from '../index.js'
import { renderRegistration } from './renderRegistration.js'

export const renderLogin = () => {
    const container = document.querySelector('.container')

    const loginhtml = `
    <section class="add-form">
        <h1>Форма входа</h1>
        <input type="text" class="add-form-name wh-100 mb-1" placeholder="Введите логин" id="login" required/>
        <input type="password" class="add-form-name wh-100" placeholder="Введите пароль" id="password" required/>
        <p class="login-error" style="display: none;">Неверный логин или пароль</p>
        <fieldset class="add-form-registry">
            <button class="add-form-button-main button-main" type="submit">Войти</button>
            <u class="add-form-button-link registry" >Зарегистрироваться</u>
        </fieldset>
    </section>
    `

    container.innerHTML = loginhtml

    document.querySelector('.registry').addEventListener('click', () => {
        renderRegistration()
    })

    const log = document.getElementById('login')
    const pass = document.getElementById('password')
    const btn = document.querySelector('.button-main')

    btn.addEventListener('click', () => {
        login(log.value, pass.value)
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
