
const API_KEY = "da18d81353396c8805c73784bfc8f3f8"; // <-- replace this with your OpenWeatherMap API key

// DOM refs
const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const locBtn = document.getElementById("locBtn");
const status = document.getElementById("status");
const currentSection = document.getElementById("current");
const curIcon = document.getElementById("curIcon");
const curLocation = document.getElementById("curLocation");
const curTemp = document.getElementById("curTemp");
const curDesc = document.getElementById("curDesc");
const curHumidity = document.getElementById("curHumidity");
const curWind = document.getElementById("curWind");
const forecastSection = document.getElementById("forecastSection");
const forecastDiv = document.getElementById("forecast");

function showStatus(msg, isError = false) {
  status.textContent = msg;
  status.style.color = isError ? "#ffb3b3" : "#cfeefd";
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(()=>({message:res.statusText}));
    throw new Error(err.message || "Network error");
  }
  return res.json();
}

function iconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
function renderCurrent(data) {
  currentSection.classList.remove("hidden");
  curLocation.textContent = `${data.name}, ${data.sys.country}`;
  curTemp.textContent = `${Math.round(data.main.temp)}°C`;
  curDesc.textContent = `${data.weather[0].description}`;
  curHumidity.textContent = `Humidity: ${data.main.humidity}%`;
  curWind.textContent = `Wind: ${data.wind.speed} m/s`;
  curIcon.innerHTML = `<img src="${iconUrl(data.weather[0].icon)}" alt="${data.weather[0].description}" class="w-full h-full">`;
}

function getDailyForecasts(list) {
  const noonItems = list.filter(item => item.dt_txt.includes("12:00:00"));
  if (noonItems.length >= 5) return noonItems.slice(0,5);
  const fallback = [];
  for (let i = 0; i < list.length && fallback.length < 5; i += 8) fallback.push(list[i]);
  return fallback;
}


async function getWeatherByCity(city) {
  showStatus("Loading...");
  currentSection.classList.add("hidden");
  forecastSection.classList.add("hidden");

  try {
    const [cur, forecast] = await Promise.all([
      fetchJson(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`),
      fetchJson(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`)
    ]);
    renderCurrent(cur);
    renderForecast(forecast.list);
    showStatus("");
  } catch (err) {
    showStatus(err.message || "Failed to fetch weather", true);
  }
}

async function getWeatherByCoords(lat, lon) {
  showStatus("Loading...");
  currentSection.classList.add("hidden");
  forecastSection.classList.add("hidden");

  try {
    const [cur, forecast] = await Promise.all([
      fetchJson(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
      fetchJson(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    ]);
    renderCurrent(cur);
    renderForecast(forecast.list);
    showStatus("");
  } catch (err) {
    showStatus(err.message || "Failed to fetch weather", true);
  }
}

//get by enter or submit
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) { showStatus("Please enter a city name.", true); return; }
  getWeatherByCity(city);
});
