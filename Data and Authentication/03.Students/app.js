console.log('TODO...');

const form = document.getElementById("form");
const tableBody = document.querySelector("tbody");
form.addEventListener("submit",onSubmit);

loadData();

async function loadData(){
    try {
        let request = await fetch('http://localhost:3030/jsonstore/collections/students');
        let response = await request.json();
        fillTable(response);
    } catch(err){
        console.log(err.message);
    }
}

async function onSubmit(ev){
    ev.preventDefault();
    const formData = new FormData(form);


    let firstName = formData.get("firstName");
    let lastName = formData.get("lastName");
    let facultyNumber = formData.get("facultyNumber");
    let grade = formData.get("grade");

    try {
        if(!firstName || !lastName || isNaN(Number(facultyNumber)) || isNaN(Number(grade))){
            throw new Error("Incorrect input data!");
        }

        let data = {firstName,lastName,facultyNumber,grade};
        let request = await fetch('http://localhost:3030/jsonstore/collections/students', {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });

        let response = await request.json();
        console.log(response);
        loadData();

        document.querySelectorAll("input").forEach(input => input.value = "");
    } catch(err){
        console.log(err.message);
    }
}

function fillTable(data){
    tableBody.innerHTML = "";
    Object.values(data).forEach( student => {
        let row = document.createElement("tr");
        Object.entries(student).forEach(([key,value]) => {
            if(key !== "_id"){
                let td = document.createElement("td");
                td.textContent = value;
                row.appendChild(td);
            }
        });
        tableBody.appendChild(row);
    })
}