import { authenticate } from "../api/data.js";
import { html } from "../lib.js";

const loginTemplate = (onSubmit) => html`
  <section id="login">
    <div class="form">
      <h2>Login</h2>
      <form class="login-form" @submit=${onSubmit}>
        <input type="text" name="email" id="email" placeholder="email" />
        <input type="password" name="password" id="password" placeholder="password" />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
  </section>
`;

export async function loginView(ctx) {
  ctx.render(loginTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    let email = formData.get("email");
    let password = formData.get("password");

    if (!email || !password) {
      return alert("All input fields are required!");
    }

    await authenticate("/users/login", email, password);
    ctx.page.redirect("/");
    ctx.updateNav();
  }
}
