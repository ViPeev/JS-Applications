function attachEvents() {
  console.log("TODO...");
  const phonebookList = document.getElementById("phonebook");
  const loadButton = document.getElementById("btnLoad");
  const createButton = document.getElementById("btnCreate");
  const [personInput, phoneInput] = document.querySelectorAll("input");

  createButton.addEventListener("click", addContact);
  loadButton.addEventListener("click",loadContacts);

  async function addContact() {
    let person = personInput.value;
    let phone = phoneInput.value;

    try {
      if (!person || !phone) {
        throw new Error("Please, fill in the input fields!");
      }

      let data = { person, phone };

      let request = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let response = await request.json();
      console.log(response);

      personInput.value = "";
      phoneInput.value = "";

      loadContacts();
    } catch (err) {
      alert(err.message);
    }
  }

  async function loadContacts(){
    try {
        let request = await fetch('http://localhost:3030/jsonstore/phonebook');
        let response = await request.json();
        fillPhonebook(response);
      } catch (err) {
        alert(err.message);
      }
  }

  function fillPhonebook(contacts){
    phonebookList.innerHTML = "";
    Object.values(contacts).forEach(contact => {
        const li = document.createElement("li");
        const delButton = document.createElement("button");
        li.textContent = `${contact.person}: ${contact.phone}`;
        li.id = contact._id;
        delButton.textContent = "Delete";

        delButton.addEventListener("click",() => deleteContact(li));

        li.appendChild(delButton);
        phonebookList.appendChild(li);
    })
  }

  async function deleteContact(element){
    try {
        let delRequest = await fetch(`http://localhost:3030/jsonstore/phonebook/${element.id}`,{
            method:"delete"
        });
    
        let response = await delRequest.json();
        console.log(response);
        element.remove();
    }catch(err){
        alert(err.message);
    }
  }
}

attachEvents();
