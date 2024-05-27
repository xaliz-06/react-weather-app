import React from "react";
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";

import { iconUrlOW, formatToLocalTime } from "./Weather";

const TemperatureDetails = ({weather: {country, details, feels_like, humidity, icon, lat, lon, speed, sunrise, sunset, temp, temp_max, temp_min, zone, weather : {description, id, main}}}) => {
  return (
    <div>
      <div className="flex items-center justify-center py-1 text-l text-cyan-300">
        <p>{`${details}`}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-0">
        <img src={iconUrlOW(icon)} alt={description} className="w-15" />
        <p className="text-4xl">{`${Math.round(temp)}°`}</p>
        <div className="flex flex-col space-y-2 items-start">
          <div className="flex font-light text-xs items-center justify-center">
            <UilTemperature size={15} className="mr-1" />
            {`Real feel:`}
            <span className="font-medium ml-1">{`${Math.round(feels_like)}°`}</span>
          </div>
          <div className="flex font-light text-xs items-center justify-center">
            <UilTear size={15} className="mr-1" />
            {`Humidity:`}
            <span className="font-medium ml-1">{`${humidity}%`}</span>
          </div>
          <div className="flex font-light text-xs items-center justify-center">
            <UilWind size={15} className="mr-1" />
            {`Wind Speed:`}
            <span className="font-medium ml-1">{`${speed} km/h`}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-3 text-white text-sm pb-1">
        <UilSun />
        <p className="font-light">
          {`Rise: `}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, zone)}
          </span>
        </p>
        <UilSunset />
        <p className="font-light">
          {`Set: `}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, zone)}
          </span>
        </p>
        <UilArrowUp />
        <p className="font-light">
          {`High: `}
          <span className="font-medium ml-1">{`${Math.round(temp_max)}°`}</span>
        </p>
        <UilArrowDown />
        <p className="font-light">
          {`Low: `}
          <span className="font-medium ml-1">{`${Math.round(temp_min)}°`}</span>
        </p>
      </div>
    </div>
  );
};

export default TemperatureDetails;
