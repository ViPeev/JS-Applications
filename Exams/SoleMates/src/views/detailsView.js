import {
  deletePost,
  getPost,
} from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (
  post,
  userData,
  removePost,
) => {
  return html` <section id="details">
    <div id="details-wrapper">
      <p id="details-title">Shoe Details</p>
      <div id="img-wrapper">
        <img src=${post.imageUrl} alt="example1" />
      </div>
      <div id="info-wrapper">
        <p>Brand: <span id="details-brand">${post.brand}</span></p>
        <p>Model: <span id="details-model">${post.model}</span></p>
        <p>Release date: <span id="details-release">${post.release}</span></p>
        <p>Designer: <span id="details-designer">${post.designer}</span></p>
        <p>Value: <span id="details-value">${post.value}</span></p>
      </div>
      ${userData && userData._id === post._ownerId ? html`<div id="action-buttons">
            <a href="/edit/${post._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" @click=${removePost} id="delete-btn">Delete</a>
          </div>`
        : nothing}
    </div>
  </section>`;
};

export async function detailsView(ctx) {
  let userData = getUserData();
  let post = await getPost(ctx.params.id);
  ctx.render(
    detailsTemplate(
      post,
      userData,
      removePost,
    )
  );
  ctx.updateNav();

  async function removePost() {
    let confirmation = confirm("Do you want to delete this post?");

    if (confirmation) {
      await deletePost(ctx.params.id);
      ctx.page.redirect("/");
    }
  }
}
