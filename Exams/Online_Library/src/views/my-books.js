import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyBooks } from "../api/data.js";
import { getUserData } from "../utils.js";
import { bookPreview } from "./common.js";

let myBooksTemplate = (books) => html`
  <section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${books.length == 0
      ? html`<p class="no-books">No books in database!</p>`
      : html`<ul class="my-books-list">
          ${books.map(bookPreview)}
        </ul>`}
  </section>
`;

export async function myBooksPage(ctx) {
    let userData = getUserData();
    let books = await getMyBooks(userData.id);
    ctx.render(myBooksTemplate(books));
  }