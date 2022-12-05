import { towns } from "./towns.js";
import { render, html } from "./node_modules/lit-html/lit-html.js";

const input = document.getElementById("searchText");
const button = document.querySelector("button");
const container = document.getElementById("towns");
const result = document.getElementById("result");

button.addEventListener("click", search);

render(createTemplate(towns), container);

function search() {
  // TODO
  let inputValue = input.value;
  if (inputValue != "") {
    render(createTemplate(towns, inputValue), container);
  } else {
    render(createTemplate(towns), container);
  }
}

function createTemplate(data, searchValue) {
  let count = 0;

  let template = html`
    <ul>
      ${data.map((town) => {
        const check = town.includes(searchValue);
        if (check) {
          count++;
        }

        return check
          ? html`<li class="active">${town}</li>`
          : html`<li>${town}</li>`;
      })}
    </ul>
  `;
  result.textContent = `${count} matches found`;

  return template;
}
