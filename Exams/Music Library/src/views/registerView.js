import { authenticate } from "../api/data.js";
import { html } from "../lib.js";

const registerTemplate = (onSubmit) => html`
    <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="login-form" @submit=${onSubmit}>
        <input type="text" name="email" id="register-email" placeholder="email" />
        <input type="password" name="password" id="register-password" placeholder="password" />
        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>
`;

export async function registerView(ctx) {
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    let email = formData.get("email");
    let password = formData.get("password");
    let repeatPassword = formData.get("re-password");

    if (!email || !password) {
      return alert("All input fields are required!");
    }

    if (password !== repeatPassword) {
      return alert("Password do not match!");
    }

    await authenticate("/users/register", email, password);
    ctx.page.redirect("/");
    ctx.updateNav();
  }
}
