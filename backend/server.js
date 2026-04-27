const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/weather', async (req, res) => {
  const points = req.body.points;

  let risk = 0;

  for (let p of points) {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${p.lat}&lon=${p.lng}&appid=YOUR_KEY`
    );

    const weather = response.data.weather[0].main;

    if (weather === "Rain" || weather === "Thunderstorm") {
      risk++;
    }
  }

  res.json({ risk });
});

app.listen(5000, () => console.log("Server running"));