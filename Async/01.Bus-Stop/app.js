function getInfo() {
    console.log("TODO...");

    const stopId = document.getElementById("stopId").value;
    const stopName = document.getElementById("stopName");
    const buses = document.getElementById("buses");

    buses.innerHTML = "";
    stopName.textContent = "";

    if(stopId.length === 0){
        stopName.textContent = "Error";
        return;
    }

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`)
    .then(handleResponse)
    .then(displayData)
    .catch(error => {
        stopName.textContent = "Error";
    })



    function handleResponse(response){
        if(response.ok === false || response.statusText === "No Content"){
            throw new Error("Error");
        }

        return response.json();
    }

    function displayData(data){
        stopName.textContent = data.name;
        Object.entries(data.buses).forEach(([busId,time]) => {
            buses.innerHTML += `<li>Bus ${busId} arrives in ${time} minutes</li>`;
        })
    }
}