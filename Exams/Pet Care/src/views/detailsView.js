import {
  deletePost,
  donate,
  getDonationsForId,
  getOwnDonation,
  getPost,
} from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (
  post,
  userData,
  hasDonated,
  allDonations,
  removePost,
  donate
) => {
  return html` <section id="detailsPage">
    <div class="details">
      <div class="animalPic">
        <img src=${post.image} />
      </div>
      <div>
        <div class="animalInfo">
          <h1>Name: ${post.name}</h1>
          <h3>Breed: ${post.breed}</h3>
          <h4>Age: ${post.age}</h4>
          <h4>Weight: ${post.weight}</h4>
          <h4 class="donation">Donation: ${allDonations}00$</h4>
        </div>
        ${userData
          ? html` <div class="actionBtn">
              ${userData._id == post._ownerId
                ? html`<a href="/edit/${post._id}" class="edit">Edit</a>
                    <a
                      href="javascript:void(0)"
                      @click=${removePost}
                      class="remove"
                      >Delete</a
                    >`
                : nothing}
              ${userData._id != post._ownerId && !hasDonated
                ? html`<a
                    href="javascript:void(0)"
                    @click=${donate}
                    class="donate"
                    >Donate</a
                  >`
                : nothing}
            </div>`
          : nothing}
      </div>
    </div>
  </section>`;
};

export async function detailsView(ctx) {
  let userData = getUserData();
  let post = await getPost(ctx.params.id);
  let hasDonated = userData
    ? await getOwnDonation(ctx.params.id, userData._id)
    : 1;
  let getAllDonations = await getDonationsForId(ctx.params.id);
  ctx.render(
    detailsTemplate(
      post,
      userData,
      hasDonated,
      getAllDonations,
      removePost,
      donateForPet
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

  async function donateForPet() {
    await donate(ctx.params.id);
    ctx.page.redirect(`/details/${ctx.params.id}`);
  }
}
