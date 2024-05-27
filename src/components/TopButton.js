import React from "react";

const TopButton = ({setQuery}) => {
  const cities = [
    { id: 1, title: "New Delhi" },
    { id: 2, title: "New York" },
    { id: 3, title: "London" },
    { id: 4, title: "Tokyo" },
    { id: 5, title: "Melbourne" },
  ];

  return (
    <div className="flex items-center justify-around my-1.5">
      {cities.map((city) => (
        <button className="text-white text- font-medium" key={city.id} onClick={() => setQuery({q: city.title})}>
          {city.title}
        </button>
      ))}
    </div>
  );
};

export default TopButton;
