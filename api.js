const searchButton = document.querySelector('.searchBarButton');
const cityInput = document.querySelector('.cityInput');
const weatherResultsContainer = document.querySelector('.weatherResultsContainer');

const updateCity = async (cityName) => {
    const cityDetails = await getCurrentInfo(cityName);
    return { cityDetails };
}

const updateCityForcast = async (lat,lon) => {
  const forcastDetails = await getForcastInfo(lat,lon);
  return { forcastDetails };
}

searchButton.addEventListener('click', e => {
    e.preventDefault();
    const city = cityInput.value.trim();
    updateCity(city).then(data => updateUI(data))
        .catch(err => console.log(err))
})

const cityName  = document.querySelector('.cityName');
const cityAbbrv = document.querySelector('.cityAbbrv');
const tempValue = document.querySelector('.tempValue');
const weatherDesciption = document.querySelector('.weatherDesciption');
var date        =  null;
var counter     = 0;
const updateUI = (data) => {
    const result = data.cityDetails;
    date         = new Date (result.dt * 1000);
    if (counter > 3){
        weatherResultsContainer.removeChild(weatherResultsContainer.lastElementChild);
    }
    weatherResultsContainer.insertAdjacentHTML('afterbegin',`<div class="weatherCard">
    <div class="cityInfo">
      <div class="cityName">${cityInput.value.toUpperCase()}</div>
      <div class="cityAbbrv">${result.sys.country}</div>
      <div class="countryFlag">
      <img src="./images/flags/${result.sys.country}.png" alt="" />
      </div>
    </div>
    <div class="date">${date.toDateString()}</div>
    <div class="weatherDetails">
      <div class="temperature">
        <div class="tempValue">${Math.ceil(result.main.temp)}</div>
        <div class="tempNotation">&deg;C</div>
      </div>
      <div class="weatherIcon">
        <img src="./images/weather/${result.weather[0].icon}.svg" alt="" />
      </div>
      <div class="weatherDesciption">${(result.weather[0].description).toUpperCase()}</div>
    </div>
    <div class="weatherForcast">
      <p class="forcastHeading">Weekly Forcast</p>
      <div class="forcastweek">


      </div>
    </div>
  </div>
`)
updateCityForcast(result.coord.lat,result.coord.lon).then(forcastData => updateForcastUI(forcastData)).catch(err => console.log(err))
 
cityInput.value="";
counter+=1;
}


const updateForcastUI = (data)=>{
  const result = data.forcastDetails;
  const forcastweek = document.querySelector('.forcastweek');
  let  forcastDay=``;

  for (var i = 6; i > 0; i--){
    forcastDay = `
    <div class="forcastCard">
    <div class="day">${new Date(result.daily[i].dt*1000).toString().slice(0, 3)}</div>
    <div class="temp">
      <div class="forcastTemperature">
        <div class="forcastTempValue">${Math.ceil(result.daily[i].temp.eve)}</div>
        <div class="forcastTempNotation">&deg;C</div>
      </div>
      <div class="forcastWeatherIcon">
        <img src="./images/weather/${result.daily[i].weather[0].icon}.svg" alt="" />
      </div>
    </div>
  </div>
  `;
  
  forcastweek.insertAdjacentHTML('afterbegin',forcastDay);
  
} 
}