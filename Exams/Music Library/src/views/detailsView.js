import { deletePost, getLikesByAlbumId, getOwnLikes, getPost, likeAlbum } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (post, userData, removePost, likePost, likes, hasLike) => {
  return html`<section id="details">
    <div id="details-wrapper">
      <p id="details-title">Album Details</p>
      <div id="img-wrapper">
        <img src=${post.imageUrl} alt="example1" />
      </div>
      <div id="info-wrapper">
        <p>
          <strong>Band:</strong><span id="details-singer">${post.singer}</span>
        </p>
        <p>
          <strong>Album name:</strong
          ><span id="details-album">${post.album}</span>
        </p>
        <p>
          <strong>Release date:</strong
          ><span id="details-release">${post.release}</span>
        </p>
        <p>
          <strong>Label:</strong><span id="details-label">${post.label}</span>
        </p>
        <p>
          <strong>Sales:</strong><span id="details-sales">${post.sales}</span>
        </p>
      </div>
      <div id="likes">Likes: <span id="likes-count">${likes}</span></div>
      ${userData
        ? html` <div id="action-buttons">
            ${userData._id === post._ownerId
              ? html` <a href="/edit/${post._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" @click=${removePost} id="delete-btn">Delete</a>`
              : !hasLike  ? html`<a href="javascript:void(0)" @click=${likePost} id="like-btn">Like</a>`: nothing}
          </div>`
        : nothing}
    </div>
  </section>`;
};

export async function detailsView(ctx) {
  let userData = getUserData();
  let [post, likes, hasLike] = await Promise.all([
    getPost(ctx.params.id),
    getLikesByAlbumId(ctx.params.id),
    userData ? getOwnLikes(ctx.params.id, userData._id): 1,
  ]);
  console.log(hasLike,likes);
  ctx.render(detailsTemplate(post, userData, removePost, onLike, likes, hasLike));
  ctx.updateNav();

  async function removePost() {
    let confirmation = confirm("Do you want to delete this post?");

    if (confirmation) {
      await deletePost(ctx.params.id);
      ctx.page.redirect("/");
    }
  }

  async function onLike() {
    await likeAlbum(ctx.params.id);
    ctx.page.redirect("/details/" + ctx.params.id);
  }
}
