function attachEvents() {
    console.log('TODO...');

    const loadPostsButton = document.getElementById("btnLoadPosts");
    const select = document.getElementById("posts");
    const viewPostButton = document.getElementById("btnViewPost");
    const postBody = document.getElementById("post-body");
    const postTitle = document.getElementById("post-title");
    const list = document.getElementById("post-comments");
    const postContents = {};

    loadPostsButton.addEventListener("click", getPosts);

    function getPosts(){
        fetch("http://localhost:3030/jsonstore/blog/posts")
        .then(response => response.json())
        .then(optionDisplay);
    }

    function optionDisplay(data){
        Object.values(data).forEach(current => {
            createOption(current);
            postContents[current.id] = {body:current.body,title:current.title};
        });

        viewPostButton.addEventListener("click",loadPost);
    }

    function createOption(data){
        const option = document.createElement("option");
        option.value = data.id;
        option.textContent = data.title.toUpperCase();
        select.appendChild(option);
    }

    function loadPost(){
        list.innerHTML = "";
        postBody.textContent = postContents[select.value].body;
        postTitle.textContent = postContents[select.value].title;
        fetch(`http://localhost:3030/jsonstore/blog/comments/`)
        .then(response => response.json())
        .then(loadComments);
    }

    function loadComments(comments){
        Object.values(comments).filter(current => {
            return current.postId === select.value;
        }).forEach(comments => {
            const li = document.createElement("li");
            li.textContent = comments.text;
            list.appendChild(li);
        });
    }
}

attachEvents();