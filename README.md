Overview:
---------
The Weather Dashboard is a React application that provides real-time weather information for different cities. Users can view various weather metrics such as temperature, humidity, pressure, wind speed, and timezone. The application also allows users to switch between Celsius and Fahrenheit for temperature units using React's Context API.

Features:
---------
- Display real-time weather data.
- Toggle between Celsius and Fahrenheit for temperature display.
- Responsive design suitable for different screen sizes.
- Dynamic addition and removal of weather widgets.

Technologies Used:
------------------
- React
- Material-UI
- TypeScript
- Context API for global state management

Installation Instructions:
--------------------------
1. Clone the repository:
   Open your terminal and run the following command:
   ### `npm install`

In the project directory, you can run: 

### `npm start`

2. Open your browser:
Navigate to `http://localhost:3000` to view the application.

3. Using the Application:
- Use the toggle buttons to switch between Celsius and Fahrenheit.
- Click on the weather metrics in the sidebar to add or remove widgets.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


Folder Structure:
-----------------
weather-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── WeatherDashboard.tsx
│   │   └── TemperatureContext.tsx
│   ├── services/
│   │   └── WeatherService.ts
│   ├── images/
│   │   └── logo.png
│   └── index.tsx
├── package.json
└── README.txt


Acknowledgements:
-----------------
- OpenWeatherMap (https://openweathermap.org/) for providing the weather data API.
- Material-UI (https://mui.com/) for their UI components.
