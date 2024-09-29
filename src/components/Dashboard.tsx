import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import WeatherService from "../services/WeatherService";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useState, useEffect } from "react";
import WeatherDashboard from "./WeatherDashboard";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import SpeedIcon from "@mui/icons-material/Speed";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// Widgets array for navigation
const WIDGETS = [
  { title: "Temperature", icon: <ThermostatIcon />, dataKey: "temp" },
  { title: "Humidity", icon: <AirIcon />, dataKey: "humidity" },
  { title: "Pressure", icon: <SpeedIcon />, dataKey: "pressure" },
  { title: "Wind Speed", icon: <AirIcon />, dataKey: "speed" },
  { title: "Timezone", icon: <AccessTimeIcon />, dataKey: "timezone" },
  // Add other weather data keys as needed
];

const logo = require("../images/logo.png");

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [selectedDataKeys, setSelectedDataKeys] = useState<string[]>([]);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const data = await WeatherService();
        setWeatherData(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    getWeatherData();
  }, []);

  const handleDataClick = (key: string) => {
    if (!selectedDataKeys.includes(key)) {
      setSelectedDataKeys((prevKeys) => [...prevKeys, key]);
    }
  };

  return (
    <AppProvider
      branding={{
        logo: <img src={logo} alt="weather logo" />,
        title: "Weather Dashboard",
      }}
    >
      <DashboardLayout>
        {/* Left Navigation Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
        >
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography variant="h6">Widgets</Typography>
          </Box>
          <List>
            {WIDGETS.map((widget) => (
              <ListItem
                component="button"
                key={widget.title}
                onClick={() => handleDataClick(widget.dataKey)}
              >
                <ListItemIcon>{widget.icon}</ListItemIcon>
                <ListItemText primary={widget.title} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Weather Dashboard
          </Typography>
          {weatherData ? (
            <WeatherDashboard
              weatherData={weatherData}
              selectedDataKeys={selectedDataKeys}
            />
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
