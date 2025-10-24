import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3000;

// Tillåt din frontend att hämta från servern
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/weather", async (req, res) => {
  const city = req.query.city || "Sävar";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_KEY}&lang=sv&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta vädret" });
  }
});

app.listen(PORT, () => console.log(`Server körs på http://localhost:${PORT}`));
