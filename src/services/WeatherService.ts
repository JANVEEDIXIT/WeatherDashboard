import axios from "axios";

const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?lat=12.9716&lon=77.5946&appid=fde360bc0420551c262f7a22211c2df0";

const WeatherService = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export default WeatherService;
