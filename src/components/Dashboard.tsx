import * as React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import type { Navigation, Router } from "@toolpad/core";
import AirIcon from "@mui/icons-material/Air";
import WeatherService from "../services/WeatherService";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import CloudIcon from "@mui/icons-material/Cloud";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
  }>;
}

const logo = require("../images/logo.png");

const CALLS_NAVIGATION: Navigation = [
  {
    segment: "Add",
    title: "Add Widget",
    icon: <AddIcon />,
  },
];

const Widgets = [
  { title: "Temperature", icon: <AddIcon />, dataKey: "temp" },
  { title: "Humidity", icon: <AddIcon />, dataKey: "humidity" },
  { title: "Pressure", icon: <AddIcon />, dataKey: "pressure" },
  { title: "Speed", icon: <AddIcon />, dataKey: "speed" },
  { title: "Timezone", icon: <AddIcon />, dataKey: "timezone" },
  // Add other weather data keys as needed
];

export default function Dashboard() {
  const [weatherData, setWeatherData] = React.useState<WeatherData | null>(
    null
  );
  const [selectedDataKeys, setSelectedDataKeys] = useState<string[]>([]);

  React.useEffect(() => {
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

  const [popoverAnchorEl, setPopoverAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const isPopoverOpen = Boolean(popoverAnchorEl);
  const popoverId = isPopoverOpen ? "simple-popover" : undefined;

  // const handleAddButtonClick = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.stopPropagation();
  //   setPopoverAnchorEl(event.currentTarget);
  // };

  const handleDataClick =
    (key: string) => (event: React.MouseEvent<HTMLLIElement>) => {
      if (!selectedDataKeys.includes(key)) {
        setSelectedDataKeys((prevKeys: any) => [...prevKeys, key]);
      }
    };

  const handlePopoverClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setPopoverAnchorEl(null);
  };

  const popoverMenuAction = (
    <React.Fragment>
      {/* <MenuItem onClick={handlePopoverClose}>New call</MenuItem>
      <MenuItem onClick={handlePopoverClose}>Mark all as read</MenuItem> */}
    </React.Fragment>
  );

  const handleAddButtonClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    // setPopoverAnchorEl(event.currentTarget);
  };

  // const addMenuAction = (
  //   <React.Fragment>
  //     <MenuItem onClick={handleDataClick("widgetKey")}>Add widget</MenuItem>
  //     {/* <MenuItem onClick={handlePopoverClose}>Mark all as read</MenuItem> */}
  //   </React.Fragment>
  // );

  return (
    <AppProvider
      navigation={[
        {
          segment: "contacts",
          title: "Contacts",
          icon: <ThermostatIcon />,
          action: <Chip label={7} color="primary" size="small" />,
        },
        {
          segment: "calls",
          title: "Calls",
          icon: <AirIcon />,
          // action: addMenuAction,
          children: CALLS_NAVIGATION,
        },
        {
          segment: "calls",
          title: "Calls",
          icon: <WbSunnyIcon />,
          action: popoverMenuAction,
          children: CALLS_NAVIGATION,
        },
        {
          segment: "calls",
          title: "Calls",
          icon: <NightlightIcon />,
          action: popoverMenuAction,
          children: CALLS_NAVIGATION,
        },
        {
          segment: "calls",
          title: "Calls",
          icon: <AirIcon />,
          action: popoverMenuAction,
          children: CALLS_NAVIGATION,
        },
        {
          segment: "calls",
          title: "Calls",
          icon: <AirIcon />,
          action: popoverMenuAction,
          children: CALLS_NAVIGATION,
        },
      ]}
      branding={{
        logo: <img src={logo} alt="weather logo" />,
        title: "Weather Dashboard",
      }}
    >
      <DashboardLayout>
        {weatherData ? (
          <div>
            <Box
              sx={{
                py: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <h1 className="pt-8">Weather Dashboard</h1>
              <Typography>
                Weather Dashboard for {weatherData.name} city
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5">Weather Dashboard</Typography>
              {Widgets.map((item) => (
                <IconButton
                  key={item.title}
                  onClick={() => handleDataClick(item.dataKey)}
                >
                  {item.icon}
                  <Typography>{item.title}</Typography>
                </IconButton>
              ))}
            </Box>
            {/* <h2>Weather data in {weatherData.name}</h2> */}
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Condition: {weatherData.weather[0].description}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </DashboardLayout>
    </AppProvider>
  );
}
