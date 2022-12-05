function attachEvents() {
  console.log("TODO...");
  const button = document.querySelector("#submit");
  const input = document.querySelector("#location");
  const forecast = document.querySelector("#forecast");
  
  let weatherIcons = {
    Sunny: "&#x2600;",
    "Partly sunny": "&#x26C5;",
    Overcast: "&#x2601;",
    Rain: "&#x2614;",
  };
  
  button.addEventListener("click",getInitialData);

  async function getInitialData() {
    try {
      let request = await fetch(
        "http://localhost:3030/jsonstore/forecaster/locations"
      );
      let data = await request.json();
      getThreeDayForecast(data);
    } catch (error) {
      forecast.style.display = "block";
      forecast.textContent = "Error";
    }
  }

  async function getThreeDayForecast(dataInArray) {
    let searchLocation = dataInArray.find(
      (location) => location.name === input.value
    );

    if (!searchLocation) {
      forecast.style.display = "block";
      forecast.textContent = "Error";
      return;
    }

    let code = searchLocation.code;
    let [today, upcoming] = await Promise.all([
      fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`),
      fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`),
    ]);

    if (!today.ok || !upcoming.ok) {
        forecast.textContent = "Error";
        return;
    }
    
    let [todayData, upcomingData] = await Promise.all([
        today.json(),
        upcoming.json(),
    ]);

    display(todayData, upcomingData);
  }

  function display(today, upcoming) {

    let condition = today.forecast.condition;
    let upcomingData = [...upcoming.forecast].map((data) => {
      return `<span class="upcoming">
        <span class="symbol">${weatherIcons[data.condition]}</span>
        <span class="forecast-data">${data.low}&#176;/${data.high}&#176;</span>
        <span class="forecast-data">${data.condition}</span>
        </span>`;
    }).join("");

    forecast.style.display = "block";

    forecast.innerHTML = `<div id="current">
    <div class="label">Current conditions</div>
    <div class="forecasts">
    <span class="condition symbol">${weatherIcons[condition]}</span>
    <span class="condition">
    <span class="forecast-data">${today.name}</span>
    <span class="forecast-data">${today.forecast.low}&#176;/${today.forecast.high}&#176;</span>
    <span class="forecast-data">${today.forecast.condition}</span>
    </span>
    </div>
    </div>
    <div id="upcoming">
    <div class="label">Three-day forecast</div>
    <div class="forecast-info">
    ${upcomingData}
    </div>
    </div>`;
  }
}

attachEvents();
