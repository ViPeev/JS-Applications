import { editPost, getPost } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (post, onSubmit) => html`<section id="editPage">
  <form @submit=${onSubmit} class="editForm">
    <img src="/images/editpage-dog.jpg" />
    <div>
      <h2>Edit PetPal</h2>
      <div class="name">
        <label for="name">Name:</label>
        <input name="name" id="name" type="text" value=${post.name} />
      </div>
      <div class="breed">
        <label for="breed">Breed:</label>
        <input name="breed" id="breed" type="text" value=${post.breed} />
      </div>
      <div class="Age">
        <label for="age">Age:</label>
        <input name="age" id="age" type="text" value=${post.age} />
      </div>
      <div class="weight">
        <label for="weight">Weight:</label>
        <input name="weight" id="weight" type="text" value=${post.weight} />
      </div>
      <div class="image">
        <label for="image">Image:</label>
        <input name="image" id="image" type="text" value=${post.image} />
      </div>
      <button class="btn" type="submit">Edit Pet</button>
    </div>
  </form>
</section>`;

export async function editView(ctx) {
  let post = await getPost(ctx.params.id);
  ctx.render(editTemplate(post, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      breed: formData.get("breed"),
      age: formData.get("age"),
      weight: formData.get("weight"),
      image: formData.get("image"),
    };

    if (Object.values(data).some((x) => !x)) {
      return alert("All Input fields are required!");
    }

    await editPost(ctx.params.id, data);
    ctx.page.redirect("/details/" + ctx.params.id);
  }
}
