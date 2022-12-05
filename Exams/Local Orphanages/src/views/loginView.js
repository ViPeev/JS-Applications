import { logReg } from "../api.js";
import { html } from "../lib.js";

const loginTemplate = (onSubmit) => {
  return html`
    <section id="login-page" class="auth">
      <form @submit=${onSubmit} id="login">
        <h1 class="title">Login</h1>

        <article class="input-group">
          <label for="login-email">Email: </label>
          <input type="email" id="login-email" name="email" />
        </article>

        <article class="input-group">
          <label for="password">Password: </label>
          <input type="password" id="password" name="password" />
        </article>

        <input type="submit" class="btn submit-btn" value="Log In" />
      </form>
    </section>
  `;
};

export async function loginView(ctx) {
  ctx.render(loginTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (email == "" || password == "") {
      return alert("All input fields are required!");
    }

    await logReg("/users/login", email, password);
    ctx.page.redirect("/");
  }
}
