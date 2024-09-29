import React, { useState } from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

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
  const [degree, setDegree] = useState("celcius");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newDegree: string
  ) => {
    if (newDegree !== null) {
      setDegree(newDegree); // Update degree to either "celcius" or "fahrenheit"
    }
  };

  return (
    <div>
      {weatherData ? (
        <div>
          <Box sx={{ py: 4, textAlign: "center" }}>
            <h1 className="pt-8">
              Weather Dashboard for {weatherData.name} city
            </h1>
          </Box>

          {/* Toggle button to select Celsius or Fahrenheit */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <ToggleButtonGroup
              color="primary"
              value={degree}
              exclusive
              onChange={handleChange}
              aria-label="degree selection"
            >
              <ToggleButton value="celcius">Celsius</ToggleButton>
              <ToggleButton value="fahrenheit">Fahrenheit</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Flexbox container for weather data */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center", // Centers the content
              gap: 2, // Space between items
            }}
          >
            {selectedDataKeys.map((key) => {
              let label = "";
              let value = "";

              if (key === "temp") {
                label = "Temperature";
                if (degree === "celcius") {
                  value = `${(weatherData.main.temp - 273.15).toFixed(1)} °C`;
                } else {
                  value = `${((weatherData.main.temp - 273.15) * 1.8 + 32).toFixed(1)} °F`;
                }
              } else if (key === "humidity") {
                label = "Humidity";
                value = `${weatherData.main.humidity} %`;
              } else if (key === "pressure") {
                label = "Pressure";
                value = `${weatherData.main.pressure} hPa`;
              } else if (key === "speed") {
                label = "Wind Speed";
                value = `${weatherData.wind.speed} m/s`;
              } else if (key === "timezone") {
                label = "Timezone";
                value = `${weatherData.timezone}`;
              }

              // Return a box containing label and value for each data point
              return (
                <Box
                  key={key}
                  sx={{
                    width: "calc(40% - 16px)", // Two boxes per row
                    height: "8rem",
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    padding: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {label}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ fontSize: "2rem" }}
                  >
                    {value}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
