const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "29e123950740cb8a5794cf7d72de8aa6";

const cityInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon")

searchBtn.addEventListener("click",() => {
    checkWeather(cityInput.value)
})

function checkWeather(city) {
    const url = apiURL + city + `&appid=${apiKey}`;


    fetch(url)
        .then((response) => (response.json()))
        .then((data) => {
            // console.log(data);
            
            if (data.cod == 404) {
                alert("City not found. Please enter correct city name")
            }

            document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
            document.querySelector(".cityName").textContent = data.name;
            document.querySelector(".description").textContent = data.weather[0].description;
            document.querySelector(".humidity").textContent = data.main.humidity;            
            document.querySelector(".wind").textContent = data.wind.speed;

            // const weatherCondition = data.weather[0].main;
            // const imageFileName = `${weatherCondition.toLowerCase()}.png`;
            // weatherIcon.src = imageFileName;

            if (data.weather[0].main === 'Clouds') {
                weatherIcon.src = "weatherImages/clouds.png";
            }
            else if (data.weather[0].main === 'Clear') {
                weatherIcon.src = "weatherImages/clear.png"
            }
            else if (data.weather[0].main === 'Drizzle') {
                weatherIcon.src = "weatherImages/drizzle.png"
            }
            else if (data.weather[0].main === 'Haze'|| 'Fog') {
                weatherIcon.src = "weatherImages/haze.png"
            }
            else if (data.weather[0].main === 'Rain') {
                weatherIcon.src = "weatherImages/rain.png"
            }
            else if (data.weather[0].main === 'Snow') {
                weatherIcon.src = "weatherImages/snow.png"
            }
        })
}

const locationBtn = document.querySelector(".location-btn");

locationBtn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            // console.log(position);
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const locationURL = `${apiURL}&lat=${lat}&lon=${lon}&appid=${apiKey}`

            fetch(locationURL)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    checkWeather(data.name);
                })
        },
        error => {
            if (error.code === error.PERMISSION_DENIED) {
                alert('Geolocation request denied. Please reset location permission to grant access again');
            }
        }
    )
})
