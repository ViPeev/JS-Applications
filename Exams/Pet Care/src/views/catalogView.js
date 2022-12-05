import { getAllPosts } from "../api/data.js";
import { html } from "../lib.js";

const catalogTemplate = (posts) => html` <section id="dashboard">
  <h2 class="dashboard-title">Services for every animal</h2>
  <div class="animals-dashboard">
    ${posts.length == 0
      ? html`<div>
          <p class="no-pets">No pets in dashboard</p>
        </div>`
      : posts.map(postTemplate)}
  </div>
</section>`;

const postTemplate = (post) => html` <div class="animals-board">
  <article class="service-img">
    <img class="animal-image-cover" src=${post.image} />
  </article>
  <h2 class="name">${post.name}</h2>
  <h3 class="breed">${post.breed}</h3>
  <div class="action">
    <a class="btn" href="/details/${post._id}">Details</a>
  </div>
</div>`;

export async function catalogView(ctx) {
  let allPosts = await getAllPosts();
  ctx.render(catalogTemplate(allPosts));
  ctx.updateNav();
}
