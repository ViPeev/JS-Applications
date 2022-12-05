import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllBooks, searchBooks } from "../api/data.js";
import { bookPreview } from "./common.js";

let searchTemplate = (books, onSearch, params = "") => html`<section
  id="search=page"
  class="dashboard">
  <h1>Search</h1>
  <form @submit=${onSearch} style="margin:auto;">
    <input type="text" name="search" value=${params} />
    <input type="submit" value="Search" />
  </form>
  ${books.length == 0
    ? html`<p class="no-books">No result!</p>`
    : html`<ul class="other-books-list">
        ${books.map(bookPreview)}
      </ul>`}
</section>`;

export async function searchPage(ctx) {
  let params = ctx.querystring.split("=")[1];
  let books = [];

  if (params) {
    books = await searchBooks(decodeURIComponent(params));
  } else {
    books = await getAllBooks();
  }

  ctx.render(searchTemplate(books, onSearch, params));

  function onSearch(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let search = formData.get("search");

    if (search) {
      ctx.page.redirect("/search?query=" + encodeURIComponent(search));
    }
  }
}
