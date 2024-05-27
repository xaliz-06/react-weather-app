import { useState, useEffect } from "react";

import "./App.css";
import TopButton from "./components/TopButton";
import Inputs from "./components/Inputs";
import TimeLocation from "./components/TimeLocation";
import TemperatureDetails from "./components/TemperatureDetails";
import ForecastDaily from "./components/ForecastDaily";
import ForecastHourly from "./components/ForecastHourly";
import formatCurrentWeather from "./components/Weather";

function App() {
  const [query, setQuery] = useState({ q: "Berlin" });
  const [unit, setUnit] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      await formatCurrentWeather({ ...query, unit }).then((data) => {
        setWeather(data);
        console.log(data);
      });
      setIsLoading(false);
    };
    fetchWeather();
  }, [query, unit]);

  return (
    <div className="mx-auto max-w-screen-lg mt-4 mb-2 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopButton setQuery={setQuery} />
      <Inputs setQuery={setQuery} unit={unit} setUnit={setUnit} />
      {isLoading && (
        <div className="flex items-center justify-center my-3">
          <p className="text-white text-l font-extralight">
            {`Loading... Please wait :)`}
          </p>
        </div>
      )}
      {weather && !isLoading && (
        <div>
          <TimeLocation weather={weather} />
          <TemperatureDetails weather={weather} />
          <div className="flex flex-row items-center justify-between space-x-14">
            <ForecastHourly
              title="hourly forecast"
              items={weather.hourlyForecast}
            />
            <ForecastDaily
              title="daily forecast"
              items={weather.dailyForecast}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
