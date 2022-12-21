//'dea5c3cb7677feeeb2da57cff72330f1'
const YOUR_API_KEY = 'dea5c3cb7677feeeb2da57cff72330f1';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

let nowTime = new Date();
const btn = document.querySelector('.search-btn');
btn.addEventListener('click', writteCity);
const tmax = document.querySelector('.t-max');
const tmin = document.querySelector('.t-min');
const tnow = document.querySelector('.weather-temp');
const feelnow = document.querySelector('.feels-like');
const imgWeather = document.querySelector('.img-weather');
const partlycloud = document.querySelector('.partly-cloud');
const texthumidity = document.querySelector('.text-humidity');
const textpressure = document.querySelector('.text-pressure');
const textvisibility = document.querySelector('.text-visibility');
const currTime = document.querySelector('.current-time');
const textwind = document.querySelector('.text-wind');
const currentCity = document.querySelector('.current-city');

function requestApi(city) {
  const url = `${API_URL}?q=${city}&appid=${YOUR_API_KEY}&units=Metric&lang=ua`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      weatherCard(data);
    })
    .catch((err) => {
      console.log(`You have error ${err}`);
    });
}

function writteCity(e) {
  const input = document.querySelector('.input-text');
  const inputText = input.value;
  inputText.replace(/ /g, '');
  requestApi(inputText);
  input.value = '';
}

function weatherCard(weatherData) {
  const {
    name,
    main: { temp, pressure, temp_max, temp_min, feels_like, humidity },
    weather: [{ description, icon }],
    wind: { speed },
    visibility,
  } = weatherData;
  console.log(weatherData);
  tmax.innerText = `max: ${temp_max}°C`;
  tmin.innerText = `min: ${temp_min}°C`;
  tnow.innerText = `${temp} °C`;
  partlycloud.innerText = description;
  feelnow.innerText = `Відчувається ${feels_like}°C`;
  imgWeather.src = `https://openweathermap.org/img/w/${icon}.png`;
  texthumidity.innerText = `${humidity}%`;
  textpressure.innerText = pressure;
  textvisibility.innerText = visibility;
  currTime.innerText = `${nowTime.getDate()}.${nowTime.getMonth()}`;
  textwind.innerText = speed;
  currentCity.innerText = name;
}
