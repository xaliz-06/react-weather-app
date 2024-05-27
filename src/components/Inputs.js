import React from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { useRef } from "react";
const Inputs = ({ setQuery, unit }) => {
  // const [city, setCity] = useState("");

  const cityRef = useRef("");

  const submitHandler = () => {
    if (cityRef.current.value !== "") setQuery({ q: cityRef.current.value });
  };

  return (
    <div className="flex flex-row justify-center my-5">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          ref={cityRef}
          placeholder="search..."
          className="text-m font-light p-1.5 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125 "
          onClick={submitHandler}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125 "
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-sl text-white font-light transition ease-out hover:scale-125"
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className="text-sl text-white transition ease-out font-light hover:scale-125"
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
