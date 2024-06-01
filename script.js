const div = document.querySelector(".loading-animation")
const input=document.querySelector(".input")
const btn = document.querySelector(".btn")
const temp = document.querySelector("#temp")
const humidity = document.querySelector("#humidity")
const description = document.querySelector("#description")
const weather_icon = document.querySelector(".weather-icon")
const city = document.querySelector("#city")

async function getWeather() {
   div.classList.add("animation")
  const apikey = "b6431536d69178272ea710810942733d";
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apikey}&units=metric`)
    .then((response) => {
      if (!response.ok) {
        input.value=""
            div.classList.remove("animation");
            weather_icon.src="error.png"
            temp.innerHTML = `Location not found`
        city.innerHTML = ""
        description.innerHTML = ""
        humidity.innerHTML=""
        throw new Error(`An error occured ${response.status}`);
      }
      return response.json()
    })
    .then((data) => {
      (temp.innerHTML = Math.round(data.main.temp) + " °C"),
        (city.innerHTML = data.name),
        (humidity.innerHTML = `Humidity : ${data.main.humidity} %`),
        (description.innerHTML = data.weather["0"].description),
        weather_icon.src =`https://openweathermap.org/img/wn/${data.weather["0"].icon}@4x.png`
      div.classList.remove("animation");
      input.value = ""
    
    })
}  
btn.addEventListener("click", getWeather)
input.onkeydown = (event) => {
  if (event.key == "Enter") {
   getWeather()
  }
}

