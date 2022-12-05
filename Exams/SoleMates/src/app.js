import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { updateNav } from "./util.js";
import { catalogView } from "./views/catalogView.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
import { searchView } from "./views/searchView.js";

const mainContainer = document.querySelector("main");
const logoutBtn = document.getElementById("logout");

page(decorateContext);
page("/", homeView);
page("/create", createView);
page("/login", loginView);
page("/register", registerView);
page("/catalog", catalogView);
page("/search", searchView);
page("/details/:id", detailsView);
page("/edit/:id", editView);
page.start();

updateNav();

function decorateContext(ctx, next) {
  ctx.render = renderMain;
  ctx.updateNav = updateNav;
  next();
}

function renderMain(view) {
  render(view, mainContainer);
}

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
  page.redirect("/");
});
