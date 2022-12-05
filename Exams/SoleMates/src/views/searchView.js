import { getSearch } from "../api/data.js";
import { html,nothing } from "../lib.js";
import { getUserData } from "../util.js";

const searchTemplate = (onSubmit, posts) => html`<section id="search">
  <h2>Search by Brand</h2>
  <form class="search-wrapper cf" @submit=${onSubmit}>
    <input
      id="#search-input"
      type="text"
      name="search"
      placeholder="Search here..."
      required />
    <button type="submit">Search</button>
  </form>
  <h3>Results:</h3>
  ${!posts
    ? nothing
    : posts.length === 0
    ? html`<div id="search-container">
        <h2>There are no results found.</h2>
      </div>`
    : html`<div id="search-container">
        <ul class="card-wrapper">
          ${posts.map(postTemplate)}
        </ul>
      </div>`}
</section>`;

const postTemplate = (post) => {
    let user = getUserData();
    console.log(user);
    return html`<li class="card">
        <img src="${post.imageUrl}" alt="travis" />
        <p><strong>Brand: </strong><span class="brand">${post.brand}</span></p>
        <p><strong>Model: </strong><span class="model">${post.model}</span></p>
        <p><strong>Value:</strong><span class="value">${post.value}</span>$</p>
        ${user ? html`<a class="details-btn" href="/details/${post._id}">Details</a>`: nothing }
    </li>`
};

export async function searchView(ctx) {
    ctx.render(searchTemplate(onSubmit));
    ctx.updateNav();
    
    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let search = formData.get("search");

    if (search.trim().length > 0) {
      let posts = await getSearch(search);
      ctx.render(searchTemplate(onSubmit, posts));
      ctx.updateNav();
    }
  }
}
