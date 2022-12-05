import { html } from "../../node_modules/lit-html/lit-html.js";
import { login, register } from "../api.js";
import { setUserData } from "../users.js";

const registerTemplate = (onSubmit) => html`<section id="register-view">
<h2>Register</h2>
<form  @submit=${onSubmit} id="register">
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>Repeat: <input type="password" name="rePass"></label>
    <p class="notification"></p>
    <button>Register</button>
</form>
</section>`;

export function registerView(ctx) {
    ctx.render(registerTemplate(onSubmit));
    ctx.updateNav();

    async function onSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repeat = formData.get('rePass');

        if(!email || !password){
            return alert('All Input Fields are required!');
        }

        if(password !== repeat){
            return alert('Password do not match');
        }

        let clientData = await register({email,password});
        setUserData(clientData);
        ctx.page.redirect('/');
    }
}