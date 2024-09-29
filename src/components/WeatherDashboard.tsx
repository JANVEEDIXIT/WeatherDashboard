import React from "react";
import { Box, Typography } from "@mui/material";

interface WeatherData {
  timezone: number;
  wind: any;
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
  }>;
}

interface WeatherDashboardProps {
  weatherData: WeatherData | null;
  selectedDataKeys: string[];
}

export default function WeatherDashboard({
  weatherData,
  selectedDataKeys,
}: WeatherDashboardProps) {
  return (
    <div>
      {weatherData ? (
        <div>
          <Box sx={{ py: 4, textAlign: "center" }}>
            <h1 className="pt-8">
              Weather Dashboard for {weatherData.name} city
            </h1>
          </Box>
          {selectedDataKeys.map((key) => {
            if (key === "temp") {
              return <p key={key}>Temperature: {weatherData.main.temp} °C</p>;
            }
            if (key === "humidity") {
              return <p key={key}>Humidity: {weatherData.main.humidity} %</p>;
            }
            if (key === "pressure") {
              return <p key={key}>Pressure: {weatherData.main.pressure}</p>;
            }
            if (key === "speed") {
              return <p key={key}>Speed: {weatherData.wind.speed} </p>;
            }
            if (key === "timezone") {
              return <p key={key}>Timezone: {weatherData.timezone} </p>;
            }
            // Add more conditions for other data keys if needed
            return null;
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
