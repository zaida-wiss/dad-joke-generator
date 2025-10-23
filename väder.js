const weatherElement = document.getElementById("weatherInfo");
const weatherBtn = document.getElementById("weatherBtn");

weatherToday();

async function weatherToday() {
    const config = {
        headers: {
            Accept: "application/json",
        },
    };
    try {
        const res = await fetch ("https://goweather.xyz/weather/Savar", config);
        if (!res.ok) throw new Error(`Ájabaja! Status: ${res.status}`);
        const data = await res.json();
        console.log(data);
        weatherElement.innerHTML=data.weather;
    }   catch(error) {
        console.log(error);
    }
}

    weatherBtn.addEventListener("click", weatherToday);
