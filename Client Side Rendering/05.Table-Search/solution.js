import { render } from "./node_modules/lit-html/lit-html.js";
import { getAllStudents } from "./api.js";
import { studentsTemplate } from "./studentsTemplate.js";
import { search } from "./search.js";

let tableBody = document.querySelector(".container tbody");
let studentsData = await getAllStudents();
let template = studentsTemplate(Object.values(studentsData));
let searchButton = document.getElementById("searchBtn");

render(template, tableBody);

searchButton.addEventListener("click", search);
