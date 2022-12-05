import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { getUserData } from "./users.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { logout } from "./api.js";
import { homeView } from "./views/home.js";

//navbar elements
const guestNav = document.getElementById("guest");
const userNav = document.getElementById("user");
const userName = document.querySelector(".email span");
const main = document.querySelector("main");
const logoutBtn = document.getElementById("logout");

//routing
page(decorateContext);
page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page.start();

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
  page.redirect("/");
//   location.reload();
});

updateNav();
function updateNav() {
  let data = getUserData();
  if (data) {
    guestNav.style.display = "none";
    userNav.style.display = "inline-block";
    userName.textContent = data.username;
  } else {
    guestNav.style.display = "inline-block";
    userNav.style.display = "none";
    userName.textContent = "guest";
  }
}

function decorateContext(ctx, next) {
  ctx.render = renderMain;
  ctx.updateNav = updateNav;
  next();
}

function renderMain(view) {
  render(view, main);
}
