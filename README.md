Weather Forecast Application 

A simple weather forecast application built with HTML, TailwindCSS, and JavaScript.  
The app retrieves weather data from the "OpenWeatherMap API" and displays current weather conditions along with extended forecasts.

---

1. Features
- Search weather by city name   
- Display current weather conditions(temperature, humidity, wind, description)  
- Show a 5-day forecast
- Responsive UI built with Tailwind CSS

---

2. Technologies Used
 HTML5
 Tailwind CSS
 JavaScript (ES6+)
 OpenWeatherMap API

---

3 .Project Structure
│── index.html # Main HTML file
│── style.css # Optional custom CSS (with Tailwind)
│── script.js # JavaScript logic
│── README.md # Project documentation

4. Get an OpenWeatherMap API Key

   Go to OpenWeatherMap

   Create an account (free)

   Generate your API Key

   Replace "YOUR_API_KEY" in script.js with your key: const API_KEY = "YOUR_API_KEY";

5. How to run (recommended, with Node & Tailwind CLI):
1) Ensure Node.js & npm are installed.
2) Install Tailwind CLI locally:
   npm init -y
   npm install -D tailwindcss
   npx tailwindcss init
3) Build CSS:
   npx tailwindcss -i ./src/input.css -o ./dist/style.css --minify
4) Open index.html in your browser (or serve with a static server):
   npx serve .
   # or
   npx http-server

6. Run the App

Just open index.html in your browser
