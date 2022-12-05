import { createPost } from "../api/data.js";
import { html } from "../lib.js";

const createTemplate = (onSubmit) => html`  <section id="create">
<div class="form" @submit=${onSubmit}>
  <h2>Add Album</h2>
  <form class="create-form">
    <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
    <input type="text" name="album" id="album-album" placeholder="Album" />
    <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
    <input type="text" name="release" id="album-release" placeholder="Release date" />
    <input type="text" name="label" id="album-label" placeholder="Label" />
    <input type="text" name="sales" id="album-sales" placeholder="Sales" />
    <button type="submit">post</button>
  </form>
</div>
</section>`;
  
export function createView(ctx) {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const singer = formData.get("singer");
    const album = formData.get("album");
    const label = formData.get("label");
    const release = formData.get("release");
    const imageUrl = formData.get("imageUrl");
    const sales = formData.get("sales");

    if (!singer || !album|| !label|| !release || !imageUrl || !sales) {
      return alert("All input fields are required!");
    }

    await createPost({ singer, album, label, release, imageUrl, sales});
    ctx.page.redirect("/");
    ctx.updateNav();
  }
}
