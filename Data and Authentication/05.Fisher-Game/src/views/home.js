import { html, render, nothing } from "../../node_modules/lit-html/lit-html.js";
import {
  loadCatches,
  updateCatches,
  deleteCatch,
  createCatch,
} from "../api.js";
import { getUserData } from "../users.js";

const homeTemplate = (renderCatches, onSubmit) => html`<section id="home-view">
  <fieldset id="main">
    <legend>Catches</legend>
    <div id="catches"></div>
  </fieldset>
  <aside>
    <button @click=${renderCatches} class="load">Load</button>
    <form id="addForm" @submit=${(e) => onSubmit(e,renderCatches)}>
      <fieldset>
        <legend>Add Catch</legend>
        <label>Angler</label>
        <input type="text" name="angler" class="angler" />
        <label>Weight</label>
        <input type="number" name="weight" class="weight" />
        <label>Species</label>
        <input type="text" name="species" class="species" />
        <label>Location</label>
        <input type="text" name="location" class="location" />
        <label>Bait</label>
        <input type="text" name="bait" class="bait" />
        <label>Capture Time</label>
        <input type="number" name="captureTime" class="captureTime" />
        <button .disabled=${getUserData() == null} class="add">Add</button>
      </fieldset>
    </form>
  </aside>
</section> `;

const catchTemplate = (user, onUpdate, onDelete, current) => {
  let disabledStatus = !user || current._ownerId != user._id;
  return html`<div class="catch">
    <label>Angler</label>
    <input
      type="text"
      class="angler"
      value=${current.angler}
      .disabled=${disabledStatus} />
    <label>Weight</label>
    <input
      type="text"
      class="weight"
      value=${current.weight}
      .disabled=${disabledStatus} />
    <label>Species</label>
    <input
      type="text"
      class="species"
      value=${current.species}
      .disabled=${disabledStatus} />
    <label>Location</label>
    <input
      type="text"
      class="location"
      value=${current.location}
      .disabled=${disabledStatus} />
    <label>Bait</label>
    <input
      type="text"
      class="bait"
      value=${current.bait}
      .disabled=${disabledStatus} />
    <label>Capture Time</label>
    <input
      type="number"
      class="captureTime"
      value=${current.captureTime}
      .disabled=${disabledStatus} />
    <button
      class="update"
      @click=${(e) => onUpdate(e, renderCatches)}
      data-id=${current._id}
      .disabled=${disabledStatus}>
      Update
    </button>
    <button
      class="delete"
      data-id=${current._id}
      @click=${(e) => onDelete(e, renderCatches)}
      .disabled=${disabledStatus}>
      Delete
    </button>
  </div> `;
};

async function renderCatches() {
  let catchContainer = document.getElementById("catches");
  let currentCatches = await loadCatches();
  if (!Array.isArray(currentCatches)) {
    currentCatches = [currentCatches];
  }

  console.log(currentCatches);
  
  render(
    currentCatches.map(
      catchTemplate.bind(null, getUserData(), updateCatches, deleteCatch)
    ),
    catchContainer
  );
}

export function homeView(ctx) {
  ctx.render(homeTemplate(renderCatches,createCatch));
  ctx.updateNav();
}
