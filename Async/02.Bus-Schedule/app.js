function solve() {
    let departButton = document.getElementById("depart");
    let arriveButton = document.getElementById("arrive");
    let info = document.querySelector(".info");
    let id = "depot";
    let stopName = "";

    function depart() {
        console.log('Depart TODO...');
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${id}`)
        .then(response => {
            return response.json();
        }).then(response => {
            departButton.setAttribute("disabled","");
            arriveButton.removeAttribute("disabled");
            stopName = response.name;
            id = response.next;
            info.textContent = `Next stop ${stopName}`;
        });
    }

    function arrive() {
        console.log('Arrive TODO...');
        departButton.removeAttribute("disabled");
        arriveButton.setAttribute("disabled","");
        info.textContent = `Arriving at ${stopName}`;
    }


    return {
        depart,
        arrive
    };
}

let result = solve();