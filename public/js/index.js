const hours = document.querySelector(".hours");
const minutes = document.querySelector(".mins");
const seconds = document.querySelector(".secs");
const amPm = document.querySelector(".am-pm");
const temp = document.querySelector('.temp')
const city = document.querySelector('.city')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const cloud = document.querySelector('.cloudy')
const pressure = document.querySelector('.pressure')
const input = document.querySelector('#text')
const search = document.querySelector('.bx-search')
const weatherDesc = document.querySelector('.weather-desc')
const body = document.querySelector('body')
const weatherLogo = document.querySelector('.weather-type i')

setInterval(() => {
  let currentTime = new Date();

  if (currentTime.getHours() < 10) {
    hours.textContent = "0" + currentTime.getHours();
  } else {
    hours.textContent = currentTime.getHours();
  }

  if (currentTime.getMinutes() < 10) {
    minutes.textContent = "0" + currentTime.getMinutes();
  } else {
    minutes.textContent = currentTime.getMinutes();
  }

  if (currentTime.getSeconds() < 10) {
    seconds.textContent = "0" + currentTime.getSeconds();
  } else {
    seconds.textContent = currentTime.getSeconds();
  }

  if (currentTime.getHours() > 12) {
    amPm.textContent = "pm";
  } else {
    amPm.textContent = "am";
  }
}, 1000);

search.addEventListener("click", () => {
  let inputCity = input.value;
  checkWeather(inputCity);
  input.value = ''
});

input.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        let inputCity = input.value;
        checkWeather(inputCity);
        input.value = ''
    }
})

const apiKey = "7ce1e0c55ed47ebbf7aba4a7c041f56c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(cityName){
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`)
    let data = await response.json()

    console.log(data)

    city.innerHTML = data.name
    temp.innerHTML = Math.round(data.main.temp) + "°C";
    humidity.innerHTML = data.main.humidity + '%'
    wind.innerHTML = data.wind.speed + ' km/h'
    cloud.innerHTML = data.clouds.all + '%'
    pressure.innerHTML = data.main.pressure + ' hPa'
    weatherDesc.innerHTML = data.weather[0].main

    if(data.weather[0].main == 'Clouds'){
        weatherLogo.classList.add('bx-cloud')
        body.classList.add('clouds')
        body.classList.remove('rain')
        body.classList.remove("clears");
        body.classList.remove("storm");
        body.classList.remove("mist");

    }

    if(data.weather[0].main == 'Rain'){
        weatherLogo.classList.add("bx-cloud-rain");
        body.classList.add('rain')
        body.classList.remove('clouds')
        body.classList.remove("clears");
        body.classList.remove("storm");
        body.classList.remove("mist");
    }

    if (data.weather[0].main == "Clear") {
        weatherLogo.classList.add("bx-sun");
        body.classList.add('clears')
        body.classList.remove("rain");
        body.classList.remove("clouds");
         body.classList.remove("storm");
         body.classList.remove("mist");
    }

    if (data.weather[0].main == "Drizzle") {
        weatherLogo.classList.add("bx-cloud-drizzle");
        body.classList.add("rain");
        body.classList.remove("clouds");
        body.classList.remove("clear");
         body.classList.remove("storm");
         body.classList.remove("mist");
    }

    if (data.weather[0].main == "Mist") {
        weatherLogo.classList.add("bx-cloud");
        body.classList.add('mist')
        body.classList.remove("rain");
        body.classList.remove("clouds");
        body.classList.remove("clear");
        body.classList.remove("storm");
    }

    if (data.weather[0].main == "Thunderstorm") {
        weatherLogo.classList.add("bx-cloud-lightning");
        body.classList.add('storm')
        body.classList.remove('mist')
        body.classList.remove("rain");
        body.classList.remove("clouds");
        body.classList.remove("clear");
    }
}