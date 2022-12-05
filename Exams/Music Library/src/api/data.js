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
  return await get("/data/albums?sortBy=_createdOn%20desc");
}

export async function createPost(data) {
  return await post("/data/albums", data);
}

export async function getPost(id) {
  return await get("/data/albums/" + id);
}

export async function editPost(id, data) {
  return await put("/data/albums/" + id, data);
}

export async function deletePost(id) {
  return await del("/data/albums/" + id);
}

export async function getSearch(query){
  return await get(`/data/shoes/?where=brand%20LIKE%20%22${query}%22`);
}

export async function likeAlbum(albumId) {
  return await post("/data/likes", {
    albumId,
  });
}

export async function getOwnLikes(albumId,userId) {
  return await get(
    `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function getLikesByAlbumId(albumId) {
  return await get(
    `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`
  );
}