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
  return await get("/data/pets?sortBy=_createdOn%20desc&distinct=name");
}

export async function createPost(data) {
  return await post("/data/pets", data);
}

export async function getPost(id) {
  return await get("/data/pets/" + id);
}

export async function editPost(id, data) {
  return await put("/data/pets/" + id, data);
}

export async function deletePost(id) {
  return await del("/data/pets/" + id);
}

export async function donate(id) {
  return await post("/data/donation", { petId: id });
}

export async function getDonationsForId(id) {
  return get(
    `/data/donation?where=petId%3D%22${id}%22&distinct=_ownerId&count`
  );
}

export async function getOwnDonation(petId, userId) {
  return get(
    `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
