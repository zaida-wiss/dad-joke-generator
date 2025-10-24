const weatherElement = document.getElementById("weatherInfo");
const weatherBtn = document.getElementById("weatherBtn");

// Kör direkt vid sidstart
weatherToday();
weatherBtn.addEventListener("click", weatherToday);

async function weatherToday() {
    try {
    // 📍 Stad, språk och enheter
    const city = "Sävar";
    const lang = "sv";
    const units = "metric"; // Celsius
    // 🌦️ API-url
    const url = `http://localhost:3000/weather?city=${city}`;


    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fel vid hämtning: ${res.status}`);
    const data = await res.json();
    console.log(data);
  
    // 🧩 Hämta relevant info
    const temp = data.main.temp.toFixed(1);
    const wind = data.wind.speed.toFixed(1);
    const desc = data.weather[0].description; // redan på svenska!
    const icon = data.weather[0].icon;

    // 🖼️ Bygg HTML med ikon och svenska texter
    weatherElement.innerHTML = `
      <div class="weather-item"><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}"></div>
      <div class="weather-item"><strong>${desc}</strong></div>
      <div class="weather-item">🌡️ Temperatur: ${temp} °C</div>
      <div class="weather-item">💨 Vind: ${wind} m/s</div>
      <div class="weather-item">📍 Plats: ${data.name}</div>
    `;
  } catch (error) {
    console.error(error);
    weatherElement.innerHTML = "Kunde inte hämta vädret just nu 😢";
  }
}