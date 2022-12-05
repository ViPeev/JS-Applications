import { editPost, getPost } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (post, onSubmit) => html`  <section id="edit">
<div class="form">
  <h2>Edit Album</h2>
  <form class="edit-form" @submit=${onSubmit}>
    <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value=${post.singer} />
    <input type="text" name="album" id="album-album" placeholder="Album" value=${post.album}/>
    <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value=${post.imageUrl}/>
    <input type="text" name="release" id="album-release" placeholder="Release date" value=${post.release} />
    <input type="text" name="label" id="album-label" placeholder="Label" value=${post.label}/>
    <input type="text" name="sales" id="album-sales" placeholder="Sales" value=${post.sales}/>

    <button type="submit">post</button>
  </form>
</div>
</section>`;

export async function editView(ctx) {
  let post = await getPost(ctx.params.id);
  ctx.render(editTemplate(post, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      album: formData.get("album"),
      singer: formData.get("singer"),
      imageUrl: formData.get("imageUrl"),
      sales: formData.get("sales"),
      release: formData.get("release"),
      label: formData.get("label"),
    };

    if (Object.values(data).some((x) => !x)) {
      return alert("All Input fields are required!");
    }

    await editPost(ctx.params.id, data);
    ctx.page.redirect("/details/" + ctx.params.id);
  }
}
