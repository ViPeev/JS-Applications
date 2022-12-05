import { editPost, getPost } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (post, onSubmit) => html` <section id="edit">
<div class="form" @submit=${onSubmit}>
  <h2>Edit item</h2>
  <form class="edit-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
      value=${post.brand}
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
      value=${post.model}
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
      value=${post.imageUrl}
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
      value=${post.release}
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
      value=${post.designer}
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
      value=${post.value}
    />

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
      brand: formData.get("brand"),
      model: formData.get("model"),
      imageUrl: formData.get("imageUrl"),
      value: formData.get("value"),
      release: formData.get("release"),
      designer: formData.get("designer"),
    };

    if (Object.values(data).some((x) => !x)) {
      return alert("All Input fields are required!");
    }

    await editPost(ctx.params.id, data);
    ctx.page.redirect("/details/" + ctx.params.id);
  }
}
