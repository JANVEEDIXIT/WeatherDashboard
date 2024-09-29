import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import SpeedIcon from "@mui/icons-material/Speed";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WeatherService from "../services/WeatherService";
import WeatherDashboard from "./WeatherDashboard";
import useMediaQuery from "@mui/material/useMediaQuery";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : theme.spacing(7) + 1,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  },
}));

const WIDGETS = [
  { title: "Temperature", icon: <ThermostatIcon />, dataKey: "temp" },
  { title: "Humidity", icon: <AirIcon />, dataKey: "humidity" },
  { title: "Pressure", icon: <SpeedIcon />, dataKey: "pressure" },
  { title: "Wind Speed", icon: <AirIcon />, dataKey: "speed" },
  { title: "Timezone", icon: <AccessTimeIcon />, dataKey: "timezone" },
];

export default function Dashboard() {
  // const logo = require("../images/logo.png");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Adjust breakpoint as needed
  const [weatherData, setWeatherData] = React.useState<any>(null);
  const [selectedDataKeys, setSelectedDataKeys] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(!isSmallScreen); // Start with the drawer open or closed based on screen size

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

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev); // Toggle drawer open/close
  };

  const handleDataClick = (key: string) => {
    if (!selectedDataKeys.includes(key)) {
      setSelectedDataKeys((prevKeys) => [...prevKeys, key]);
    }
  };

  React.useEffect(() => {
    setOpen(!isSmallScreen); // Close drawer on small screens
  }, [isSmallScreen]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {/* <img src={logo} alt="logo"></img> */}
            Weather Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            p: 1,
          }}
        >
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </Box>
        <List>
          {WIDGETS.map((widget) => (
            <ListItem key={widget.title} disablePadding>
              <ListItemButton onClick={() => handleDataClick(widget.dataKey)}>
                <ListItemIcon>{widget.icon}</ListItemIcon>
                <ListItemText
                  primary={open ? widget.title : ""}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {weatherData ? (
          <WeatherDashboard
            weatherData={weatherData}
            selectedDataKeys={selectedDataKeys}
          />
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Box>
  );
}
