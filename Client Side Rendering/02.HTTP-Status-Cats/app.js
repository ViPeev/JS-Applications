import { cats } from "./catSeeder.js";
import { render, html } from "./node_modules/lit-html/lit-html.js";

const section = document.getElementById("allCats");
start();

function start() {
  const ul = document.createElement("ul");
  render(cats.map(createTemplate.bind(null, toggleVisibility)), ul);
  section.appendChild(ul);
}

function createTemplate(showFunct, data) {
  return html`<li>
    <img
      src="./images/${data.imageLocation}.jpg"
      width="250"
      height="250"
      alt="Card image cap" />
    <div class="info">
      <button class="showBtn" @click=${showFunct}>Show status code</button>
      <div class="status" style="display: none" id=${data.id}>
        <h4>Status Code: ${data.statusCode}</h4>
        <p>${data.statusMessage}</p>
      </div>
    </div>
  </li>`;
}

function toggleVisibility(e) {
  const div = e.currentTarget.nextElementSibling;
  if (div.style.display === "none") {
    div.style.display = "block";
    e.currentTarget.textContent = "Hide status code";
  } else {
    div.style.display = "none";
    e.currentTarget.textContent = "Show status code";
  }
}
