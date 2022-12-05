import { page, render } from "./lib.js";
import { getUserData } from "./user.js";
import { logout } from "./api.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
import { homeView } from "./views/homeView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { myPostsView } from "./views/myPostsView.js";
import { createView } from "./views/createView.js";

const userNav = document.getElementById("user");
const guestNav = document.getElementById("guest");
const main = document.getElementById("main-content");
const logoutBtn = document.getElementById("logout");

updateNav();

page(decorateContext);
page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page("/details/:id", detailsView);
page("/create", createView);
page("/edit/:id", editView);
page("/myPosts", myPostsView);
page.start();

function updateNav() {
  let data = getUserData();
  if (data) {
    userNav.style.display = "inline-block";
    guestNav.style.display = "none";
  } else {
    userNav.style.display = "none";
    guestNav.style.display = "inline-block";
  }
}

function renderView(view) {
  render(view, main);
}

function decorateContext(ctx, next) {
  ctx.render = renderView;
  ctx.updateNav = updateNav;
  next();
}

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
  page.redirect("/");
});
