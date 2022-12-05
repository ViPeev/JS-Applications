console.log("My requests...");

const tableBody = document.querySelector("tbody");
const form = document.querySelector("form");
const loadBooksButton = document.querySelector("#loadBooks");
const submitButton = document.querySelector("form button");
const heading = document.querySelector("form h3");
const [titleInput, authorInput] = document.querySelectorAll("input");

let currentId = "";

loadBooksButton.addEventListener("click", loadBooks);
form.addEventListener("submit", addEditBook);

async function loadBooks() {
  try {
    let request = await fetch(
      "http://localhost:3030/jsonstore/collections/books"
    );
    let response = await request.json();
    fillBookTable(response);
  } catch (err) {
    console.log(err.message);
  }
}

function fillBookTable(data) {
  tableBody.innerHTML = "";
  Object.entries(data).forEach(([id, book]) => {
    let tr = document.createElement("tr");
    let titleTd = document.createElement("td");
    let authorTd = document.createElement("td");
    let buttonsTd = document.createElement("td");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    titleTd.textContent = book.title;
    authorTd.textContent = book.author;
    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";

    editButton.addEventListener("click", () => {
      editBook(id, book.title, book.author);
    });

    deleteButton.addEventListener("click", () => {
      deleteBook(id,tr);
    });

    buttonsTd.appendChild(editButton);
    buttonsTd.appendChild(deleteButton);
    tr.appendChild(titleTd);
    tr.appendChild(authorTd);
    tr.appendChild(buttonsTd);
    buttonsTd.appendChild(editButton);
    buttonsTd.appendChild(deleteButton);
    tableBody.appendChild(tr);
  });
}

async function addEditBook(e) {
  e.preventDefault();

  const formData = new FormData(form);
  let title = formData.get("title");
  let author = formData.get("author");

  try {
    if (!title || !author) {
      throw new Error("Incorrect input!");
    }

    let data = { author, title };

    if (submitButton.textContent == "Submit") {
      let request = await fetch(
        "http://localhost:3030/jsonstore/collections/books",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      let response = await request.json();
      console.log(response);
    } else {
      let request = await fetch(
        `http://localhost:3030/jsonstore/collections/books/${currentId}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let response = await request.json();
      heading.textContent = "Form";
      submitButton.textContent = "Submit";
      currentId = "";
      console.log(response);
    }
    loadBooks();
    authorInput.value = "";
    titleInput.value = "";
  } catch (err) {
    console.log(err.message);
  }
}

function editBook(id, title, author) {
  heading.textContent = "Edit FORM";
  submitButton.textContent = "Save";
  authorInput.value = author;
  titleInput.value = title;
  currentId = id;
}

async function deleteBook(id,element){
    try {
        let delRequest = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`,{
            method:"delete"
        });
        let response = await delRequest.json();
        console.log(response);
        element.remove();
    }catch(err){
        console.log(error);
    }
}
