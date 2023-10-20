import React from 'react'
import { iconUrlAW } from './Weather';

const ForecastDaily = ({title, items }) => {
  return (
    <div>
      <div className="flex items-center justify-start my-3 min-w-fit">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1" />

      <div className="flex flex-row items-center justify-between text-white space-x-0">
        {items.map((item) => (
          <div className="flex flex-col items-center w-16 justify-center">
            <p className="font-light text-xs">{`${item.title}`}</p>
            <img
              src={iconUrlAW(item.iconDay)}
              alt='weather-icon'
              className="w-10 my-1"
            />
            <p className="font-medium text-sm">{item.temp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastDaily