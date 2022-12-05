import { getPosts } from "../api.js";
import { html } from "../lib.js";

const homeTemplate = (posts) => {
  return html`
    <section class="all-posts">
      <h1 class="title">All Posts</h1>
      
      <div class="my-posts">
      ${posts.length == 0
        ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>`
        : posts.map(postTemplate)}
    </div>
    </section>
  `;
};

const postTemplate = (post) => html`
    <div class="post">
      <h2 class="post-title">${post.title}</h2>
      <img
        class="post-image"
        src=${post.imageUrl}
        alt="Material Image" />
      <div class="btn-wrapper">
        <a href="/details/${post._id}" class="details-btn btn">Details</a>
      </div>
    </div>
`;

export async function homeView(ctx) {
  let posts = await getPosts();
  ctx.render(homeTemplate(posts));
  ctx.updateNav();
}
