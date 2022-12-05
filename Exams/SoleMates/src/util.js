export function getUserData() {
  return JSON.parse(localStorage.getItem("userData"));
}

export function setUserData(data) {
  localStorage.setItem("userData", JSON.stringify(data));
}

export function clearUserData() {
  localStorage.removeItem("userData");
}

const userNav = document.querySelector(".user");
const guestNav = document.querySelector(".guest");

export function updateNav() {
  let userData = getUserData();
  if (userData) {
    guestNav.style.display = "none";
    userNav.style.display = "inline-block";
  } else {
    guestNav.style.display = "inline-block";
    userNav.style.display = "none";
  }
}