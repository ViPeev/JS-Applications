import { nothing } from "../lib.js";
import {
  deletePostById,
  getAllDonations,
  getAllDonationsById,
  getPostById,
  donate,
} from "../api.js";
import { html } from "../lib.js";
import { getUserData } from "../user.js";

const detailsTemplate = (post, user, del, donations, onDonate, hasDonated) => {
  let condRender = user?._id == post._ownerId;
  return html` <section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
      <div id="details">
        <div class="image-wrapper">
          <img src="${post.imageUrl}" alt="Material Image" class="post-image" />
        </div>
        <div class="info">
          <h2 class="title post-title">${post.title}</h2>
          <p class="post-description">Description: ${post.description}</p>
          <p class="post-address">Address: ${post.address}</p>
          <p class="post-number">Phone number: ${post.phone}</p>
          <p class="donate-Item">Donate Materials: ${donations}</p>
          <div class="btns">
            ${condRender
              ? html` <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                  <a
                    href="javascript:void(0)"
                    @click=${del}
                    class="delete-btn btn">
                    Delete</a
                  >`
              : nothing}
            ${user && !hasDonated && !condRender
              ? html`<a
                  href="javascript:void(0)"
                  @click=${onDonate}
                  class="donate-btn btn"
                  >Donate</a
                >`
              : nothing}
          </div>
        </div>
      </div>
    </div>
  </section>`;
};

export async function detailsView(ctx) {
  let userData = getUserData();
  let donations = await getAllDonations(ctx.params.id);
  let post = await getPostById(ctx.params.id);
  let hasDonated = await getAllDonationsById(ctx.params.id, userData?._id);
  ctx.render(
    detailsTemplate(post, userData, deletePost, donations, OnDonate, hasDonated)
  );
  ctx.updateNav();

  async function deletePost() {
    let confirmation = confirm("Do you want to delete this post?");
    if (confirmation) {
      await deletePostById(ctx.params.id);
      ctx.page.redirect("/");
    }
  }

  async function OnDonate() {
    await donate({postId:ctx.params.id});
    ctx.page.redirect(`/details/${ctx.params.id}`)
    ctx.updateNav();
  }
}
