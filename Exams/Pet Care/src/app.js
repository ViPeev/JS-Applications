import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { catalogView } from "./views/catalogView.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";

const userNav = document.getElementsByClassName("userNav");
const guestNav = document.getElementsByClassName("guestNav");
const mainContainer = document.getElementById("content");
const logoutBtn = document.getElementById("logout");

page(decorateContext);
page("/", homeView);
page("/create", createView);
page("/login", loginView);
page("/register", registerView);
page("/catalog", catalogView);
page("/details/:id", detailsView);
page("/edit/:id", editView);
page.start();

updateNav(guestNav, userNav);

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

export function updateNav() {
  let userData = getUserData();
  if (userData) {
    guestNav[0].style.display = "none";
    guestNav[1].style.display = "none";
    userNav[0].style.display = "inline-block";
    userNav[1].style.display = "inline-block";
  } else {
    guestNav[0].style.display = "inline-block";
    guestNav[1].style.display = "inline-block";
    userNav[0].style.display = "none";
    userNav[1].style.display = "none";
  }
}
