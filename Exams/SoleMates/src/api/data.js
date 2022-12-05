import { clearUserData, setUserData } from "../util.js";
import { get, post, put, del } from "./api.js";

export async function authenticate(url, email, password) {
  let data = await post(url, { email, password });
  setUserData(data);
}

export async function logout() {
  get("/users/logout");
  clearUserData();
}

export async function getAllPosts() {
  return await get("/data/shoes?sortBy=_createdOn%20desc");
}

export async function createPost(data) {
  return await post("/data/shoes", data);
}

export async function getPost(id) {
  return await get("/data/shoes/" + id);
}

export async function editPost(id, data) {
  return await put("/data/shoes/" + id, data);
}

export async function deletePost(id) {
  return await del("/data/shoes/" + id);
}

export async function getSearch(query){
  return await get(`/data/shoes/?where=brand%20LIKE%20%22${query}%22`);
}