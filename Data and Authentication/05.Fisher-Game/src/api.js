import { getUserData, removeUserData } from "./users.js";

const host = "http://localhost:3030";

async function request(uri, options) {
  try {
    let res = await fetch(host + uri, options);

    if (res.ok == false) {
      if (res.status == 403) {
        clearUserData();
      }
      const error = await res.json();
      throw new Error(error.message);
    }

    if (res.status == 204) {
      return res;
    } else {
      return res.json();
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

function createOptions(data, method = "get") {
  let options = {
    method,
    headers: {},
  };

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const userData = getUserData();
  if (userData) {
    options.headers["X-Authorization"] = userData.accessToken;
  }
  return options;
}

export async function get(uri) {
  return request(uri, createOptions());
}

export async function post(uri, data) {
  return request(uri, createOptions(data, "post"));
}

export async function put(uri, data) {
  return request(uri, createOptions(data, "put"));
}

export async function del(uri) {
  return request(uri, createOptions(undefined, "delete"));
}

export async function login({ email, password }) {
  return post("/users/login", { email, password });
}

export async function register({ email, password }) {
  return post("/users/register", { email, password });
}

export async function logout() {
  get("/users/logout");
  removeUserData();
}

export async function loadCatches() {
  return get("/data/catches");
}

export async function updateCatches(e, reRender) {
  let id = e.target.dataset.id;
  let data = {};
  let inputs = Array.from(e.target.parentElement.querySelectorAll("input"));
  inputs.forEach((input) => (data[input.className] = input.value));
  if (inputs.some((input) => input.value == "")) {
    return alert("All Inputs fields are required!");
  }

  await put(`/data/catches/${id}`, data);
  reRender();
}

export async function deleteCatch(e, reRender) {
  let id = e.target.dataset.id;

  await del(`/data/catches/${id}`);
  reRender();
}

export async function createCatch(e, reRender) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const angler = formData.get("angler");
  const weight = formData.get("weight");
  const species = formData.get("species");
  const location = formData.get("location");
  const bait = formData.get("bait");
  const captureTime = formData.get("captureTime");

  if (
    angler == "" ||
    weight == "" ||
    species == "" ||
    location == "" ||
    bait == "" ||
    captureTime == ""
  ) {
    return alert("All Inputs fields are required!");
  }

  await post("/data/catches", {
    angler,
    weight,
    species,
    location,
    bait,
    captureTime,
  });

  reRender();
}
