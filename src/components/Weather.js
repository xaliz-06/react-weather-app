import { DateTime } from "luxon";

const API_KEY = "0c2e8162718ccfdc47df1b6c16b16685";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const API_KEY_AW = "IivRnKHhxmIDcMtu87GGwFFQ5XVPADKI";
const BASE_URL_AW =
  "https://dataservice.accuweather.com/locations/v1/cities/search";
const BASE_URL_AW_FORECAST = "https://dataservice.accuweather.com/forecasts/v1";

const getOPWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: API_KEY,
    units: "metric",
  });

  return fetch(url).then((res) => res.json());
};

const getAWWeatherData = (searchParams) => {
  const url = new URL(BASE_URL_AW);
  url.search = new URLSearchParams({ ...searchParams, apikey: API_KEY_AW });

  return fetch(url).then((res) => res.json());
};

const getAWForecastData = async (locationKey, infoType, searchParams) => {
  const url = new URL(
    BASE_URL_AW_FORECAST + "/" + infoType + "/" + locationKey
  );
  url.search = new URLSearchParams({ ...searchParams, apikey: API_KEY_AW });
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        "Something went wrong fetching AccuWeather Forecast Data"
      );
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

const formatToDate = (inputDate) => {
  const parsedDate = DateTime.fromISO(inputDate);

  const formattedDate = parsedDate.toFormat("dd LLL");

  return formattedDate;
};

const formatToTime = (inputDate, zone) => {
  const parsedDate = DateTime.fromISO(inputDate, { zone: zone });

  const formattedTime = parsedDate.toFormat("HH:mm");

  //   console.log(formattedTime)

  return formattedTime;
};

const formatToLocalTime = (inputTime, zone) => {
  const parsedTime = DateTime.fromSeconds(inputTime, { zone: zone });

  const formattedLocalTime = parsedTime.toFormat("hh:mm a");

  return formattedLocalTime;
};

const formatHeaderDate = (inputDate, zone) => {
  const luxonHeaderDate = DateTime.fromSeconds(inputDate, { zone: zone });

  const formattedHeaderDate = luxonHeaderDate.toFormat(
    "EEEE, dd LLLL yyyy | 'Local time: ' hh:mm a"
  );

  return formattedHeaderDate;
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    weather,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { DailyForecasts } = data;

  DailyForecasts = DailyForecasts.map((d) => {
    return {
      title: formatToDate(d.Date),
      temp: `${Math.round(d.Temperature.Maximum.Value)}° / ${Math.round(
        d.Temperature.Minimum.Value
      )}°`,
      iconDay: String(d.Day.Icon).padStart(2, "0"),
      iconNight: String(d.Night.Icon).padStart(2, "0"),
    };
  });

  return DailyForecasts;
};

const formatHourlyWeather = (data, zone) => {
  let hourlyData = data.map((d) => {
    return {
      titleDate: formatToDate(d.DateTime),
      title: formatToTime(d.DateTime, zone),
      iconPhrase: d.IconPhrase,
      isDayLight: d.IsDayLight,
      hasPrecipitation: d.HasPrecipitation,
      temp: d.Temperature.Value,
      weatherIcon: String(d.WeatherIcon).padStart(2, "0"),
    };
  });

  return hourlyData;
};

const iconUrlAW = (code) =>
  `https://developer.accuweather.com/sites/default/files/${code}-s.png`;

const iconUrlOW = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

const formatWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getOPWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const formattedForecastLocationWeather = await getAWWeatherData(searchParams);

  console.log(formattedForecastLocationWeather);

  const {
    Key,
    Region: { EnglishName: Region },
    Country: { EnglishName: countryFull },
    EnglishName: City,
    TimeZone: { Name: zone },
  } = formattedForecastLocationWeather[0];

  const formattedDailyForecastWeather = await getAWForecastData(
    Key,
    "daily/5day",
    { language: "en-us", details: false, metric: true }
  ).then(formatForecastWeather);

  console.log(formattedDailyForecastWeather);

  const formattedHourlyForecastWeather = await getAWForecastData(
    Key,
    "hourly/12hour",
    { language: "en-us", details: false, metric: true }
  ).then((data) => formatHourlyWeather(data, zone));

  console.log(formattedHourlyForecastWeather);

  return {
    ...formattedCurrentWeather,
    dailyForecast: formattedDailyForecastWeather,
    hourlyForecast: formattedHourlyForecastWeather,
    zone,
    countryFull,
  };
};
export { iconUrlAW, iconUrlOW, formatHeaderDate, formatToLocalTime };

export default formatWeatherData;
