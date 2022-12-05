function solution() {
  //TODO .....
  const main = document.getElementById("main");

  fetch("http://localhost:3030/jsonstore/advanced/articles/list")
    .then((response) => response.json())
    .then(initialDisplay);

  function initialDisplay(data) {
    Object.values(data).forEach((current) => {
      createAccordion(current);
    });

    const allButtons = Array.from(document.getElementsByClassName("button"));
    allButtons.forEach(button => {
        button.addEventListener("click",getExtraData);
    })
  }

  function createAccordion(data) {
    main.innerHTML += `<div class="accordion">
        <div class="head">
        <span>${data.title}</span>
        <button class="button" id="${data._id}">More</button>
        </div>
        <div class="extra">
        <p></p>
        </div>
        </div>`;
  }

  function getExtraData(e){
    const button = e.currentTarget;
    const id = button.id;
    const extra = button.parentElement.nextElementSibling;
    const paragraph = extra.firstElementChild;

    if(button.textContent === "More"){
        fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`)
        .then((response) => response.json())
        .then(response => {
            paragraph.textContent = response.content;
        });
        extra.style.display = "block";
        button.textContent = "Less";
    } else {
        extra.style.display = "none";
        button.textContent = "More";
    }
  }
}

solution();
