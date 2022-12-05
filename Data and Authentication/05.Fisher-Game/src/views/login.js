import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api.js";
import { setUserData } from "../users.js";

const loginTemplate = (onSubmit) => html`<section id="login-view">
<h2>Login</h2>
<form id="login" @submit=${onSubmit}>
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    <p class="notification"></p>
    <button>Login</button>
</form>
</section>
`;

export function loginView(ctx) {
    ctx.render(loginTemplate(onSubmit));
    ctx.updateNav();

    async function onSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if(!email || !password){
            return alert('All Input Fields are required!');
        }

        let clientData = await login({email,password});
        setUserData(clientData);
        ctx.page.redirect('/');
    }
}
