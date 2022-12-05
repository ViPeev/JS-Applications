import { render, html } from "./node_modules/lit-html/lit-html.js";

const menu = document.getElementById("menu");
const form = document.querySelector("form");
const host = "http://localhost:3030/jsonstore/advanced/dropdown";

form.addEventListener("submit", addItem);

let items = Object.values(await request());
render(createSelectOptions(items), menu);

async function addItem(e) {
  e.preventDefault();
  const formData = new FormData(form);
  let text = formData.get("option").trim();
  if (text) {
    try {
      menu.innerHTML += `<option>${text}</option`;
      // let newItem = await request("post", { text });
      // items.push(newItem);
      render(createSelectOptions(items), menu)
    } catch (error) {
      alert(error.message);
    }
  }
}

async function request(method = "GET", data) {
  let options = { method, headers: {} };

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    let response = await fetch(host,options);
    let newData = await response.json();
    return newData;

  } catch (error) {
    return alert(error.message);
  }
}

function createSelectOptions(data) {
  return data.map(({ text, _id }) => {
    return html`<option value=${_id}>${text}</option>`;
  });
}
