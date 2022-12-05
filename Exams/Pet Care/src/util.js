export function getUserData() {
  return JSON.parse(localStorage.getItem("userData"));
}

export function setUserData(data) {
  localStorage.setItem("userData", JSON.stringify(data));
}

export function clearUserData() {
  localStorage.removeItem("userData");
}

export function updateNav(guest, user) {
  let userData = getUserData();
  if (userData) {
    guest[0].style.display = "none";
    guest[1].style.display = "none";
    user[0].style.display = "inline-block";
    user[1].style.display = "inline-block";
  } else {
    guest[0].style.display = "inline-block";
    guest[1].style.display = "inline-block";
    user[0].style.display = "none";
    user[1].style.display = "none";
  }
}
