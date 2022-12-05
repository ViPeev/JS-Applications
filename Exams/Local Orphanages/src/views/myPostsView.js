import { getOwnPosts, getPosts } from "../api.js";
import { html } from "../lib.js";
import { getUserData } from "../user.js";

const myPostsTemplate = (posts) => {
  return html`
    <section id="my-posts-page">
      <h1 class="title">My Posts</h1>

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
    <img class="post-image" src=${post.imageUrl} alt="Material Image" />
    <div class="btn-wrapper">
      <a href="/details/${post._id}" class="details-btn btn">Details</a>
    </div>
  </div>
`;

export async function myPostsView(ctx) {
  let userData = getUserData();
  let posts = await getOwnPosts(userData._id);
  ctx.render(myPostsTemplate(posts));
  ctx.updateNav();
}
