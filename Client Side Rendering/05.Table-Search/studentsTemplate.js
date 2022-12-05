import { render, html } from "./node_modules/lit-html/lit-html.js";

export const studentsTemplate = (studentsData) => html`${studentsData.map(
  (s) => html` <tr>
    <td>${s.firstName} ${s.lastName}</td>
    <td>${s.email}</td>
    <td>${s.course}</td>
  </tr>`)}`;
