import { createPost } from "../api/data.js";
import { html } from "../lib.js";

const createTemplate = (onSubmit) => html`<section id="create" @submit=${onSubmit}>
    <div class="form">
      <h2>Add item</h2>
      <form class="create-form">
        <input
          type="text"
          name="brand"
          id="shoe-brand"
          placeholder="Brand"
        />
        <input
          type="text"
          name="model"
          id="shoe-model"
          placeholder="Model"
        />
        <input
          type="text"
          name="imageUrl"
          id="shoe-img"
          placeholder="Image url"
        />
        <input
          type="text"
          name="release"
          id="shoe-release"
          placeholder="Release date"
        />
        <input
          type="text"
          name="designer"
          id="shoe-designer"
          placeholder="Designer"
        />
        <input
          type="text"
          name="value"
          id="shoe-value"
          placeholder="Value"
        />

        <button type="submit">post</button>
      </form>
    </div>
  </section>`;
  
export function createView(ctx) {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const brand = formData.get("brand");
    const model = formData.get("model");
    const designer = formData.get("designer");
    const release = formData.get("release");
    const imageUrl = formData.get("imageUrl");
    const value = formData.get("value");

    if (!brand || !model || !designer || !release || !imageUrl || !value) {
      return alert("All input fields are required!");
    }

    await createPost({ brand, model, designer, release, imageUrl, value});
    ctx.page.redirect("/");
    ctx.updateNav();
  }
}
