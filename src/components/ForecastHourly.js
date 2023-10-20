import React from "react";

import { iconUrlAW } from "./Weather";

const ForecastHourly = ({ title, items }) => {
  return (
    <div>
      <div className="flex items-center justify-start my-3 min-w-fit">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1" />

      <div className="flex flex-row items-center justify-between text-white space-x-3">
        {items.map((item) => (
          <div className="flex flex-col items-center w-6 justify-center">
            <p className="font-light text-xs">{`${item.title}`}</p>
            <img
              src={iconUrlAW(item.weatherIcon)}
              alt={item.iconPhrase}
              className="w-10 my-1"
            />
            <p className="font-medium">{`${Math.round(item.temp)}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastHourly;
