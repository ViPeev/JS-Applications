import { getUserData, clearUserData, setUserData } from "./user.js";

const host = "http://localhost:3030";

export async function request(url, method, data) {
  let options = { method, headers: {} };

  if (data) {
    options.headers["Content-type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  let userData = getUserData();

  if (userData) {
    options.headers["X-Authorization"] = userData.accessToken;
  }

  try {
    let res = await fetch(host + url, options);

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
    alert(err.message);
    throw err;
  }
}

export async function get(url) {
  return request(url, "get");
}

export async function post(url, data) {
  return request(url, "post", data);
}

export async function put(url, data) {
  return request(url, "put", data);
}

export async function del(url) {
  return request(url, "delete");
}

export async function logReg(url, email, password) {
  let userData = await post(url, { email, password });
  setUserData(userData);
}

export async function register(email, password) {
  let userData = await post("/users/register", { email, password });
  setUserData(userData);
}

export async function logout() {
  get("/users/logout");
  clearUserData();
}

export async function getPosts() {
  let data = await get("/data/posts?sortBy=_createdOn%20desc");
  return data;
}

export async function getOwnPosts(userId) {
  let data = await get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
  return data;
}

export async function createPost(data) {
  await post("/data/posts", data);
}

export async function getPostById(id) {
  return get(`/data/posts/${id}`);
}

export async function editPostById(id, data) {
  await put(`/data/posts/${id}`, data);
}

export async function deletePostById(id) {
  await del(`/data/posts/${id}`);
}

export async function donate(data) {
  await post("/data/donations", data);
}

export async function getAllDonations(id) {
  return get(
    `/data/donations?where=postId%3D%22${id}%22&distinct=_ownerId&count`
  );
}

export async function getAllDonationsById(postId, userId) {
  return get(
    `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
