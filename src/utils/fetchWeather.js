const axios = require("axios");

async function fetchWeatherData(latitude, longitude, callback) {
  try {
    const url =
      `http://api.weatherstack.com/current?access_key=7663859437adc787f1e5ffb05f83a91b&query=${latitude},${longitude}`;
    const res = await axios(url);
    if (res.data.error) {
      callback("Unable to find weather data due to invalid input...");
    } else {
      callback(
        undefined,
        `It is currently ${res.data.current["temperature"]} degrees out but it's feels like ${res.data.current["feelslike"]} degrees out.There is ${res.data.current["humidity"]}% humidity and ${res.data.current["precip"]}% chance of raining . Localtime is ${res.data.location["localtime"]}`
      );
    }
  } catch (error) {
    console.log("Sorry we are not able to fetch your data ..................");
  }
}

module.exports = fetchWeatherData