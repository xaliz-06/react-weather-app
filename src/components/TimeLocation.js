import React from "react";

import { formatHeaderDate } from "./Weather";

const TimeLocation = ({weather: {dt, name, zone, countryFull : country }}) => {
  return (
    <div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-l font-extralight">
          {formatHeaderDate(dt, zone)}
        </p>
      </div>

      <div className="flex items-center justify-center my-1">
        <p className="text-white text-2xl font-medium">{name}, {country}</p>
      </div>
    </div>
  );
};

export default TimeLocation;
