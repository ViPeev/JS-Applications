function attachEvents() {
    console.log('TODO...');
    const [submitBtn, refreshBtn] = document.querySelectorAll('input[type="button"]');
    const [authorInput, contentInput] = document.querySelectorAll('input[type="text"]');
    const textArea = document.querySelector("textarea");

    submitBtn.addEventListener("click",sendMessage);
    refreshBtn.addEventListener("click",getMessages);


    async function sendMessage(){
        const author = authorInput.value;
        const content = contentInput.value;

        try {
            if(!author || !content){
                throw new Error("Please, fill the input fields!");
            }

            let data = {author,content};
    
            let request = await fetch(`http://localhost:3030/jsonstore/messenger`,{
                method: "post",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            });

            let response = await request.json();
            console.log(response);
        }catch(err){
            alert(err.message);
        }
    }

    async function getMessages(){
        try {
            let request = await fetch(`http://localhost:3030/jsonstore/messenger`);
            let response = await request.json();

            let messages = Object.values(response).map(message => {
                return `${message.author}: ${message.content}`;
            }).join("\n");
            
            textArea.value = messages;
        }catch(err){
            alert(err.message);
        }
    }
}

attachEvents();