const form = document.querySelector("form");
const container = document.getElementById("root");

form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  let towns = formData.get("towns");
  if (towns) {
    towns = towns.split(", ");
    createTemplate(...towns);
}
}

function createTemplate(...towns) {
  const ul = document.createElement("ul");
  let ulContents = towns.map( town => {
    let li = document.createElement('li');
    li.textContent = town;
    return li;
  });

  ul.append(...ulContents);
  container.appendChild(ul);
}
