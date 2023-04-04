import { useState } from "react";
import "../src/App.css";
import DailyWeather from "../component/DailyWeather";
import { Route, Routes } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function Home() {
  const [list, setList] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [filterType, setFilterType] = useState(-1);

  const dailyWeatherData = {
    state: "",
    city: "",
    datetime: "",
    max_temp: "",
    min_temp: "",
    temp: "",
    precip: "",
    max_wind_dir: "",
    max_wind_spd: "",
  };

  const callDailyWeather = async () => {
    setZipCode(33623);

    const url = `https://api.weatherbit.io/v2.0/history/daily?postal_code=!${zipCode}&units=I&country=US&start_date=2023-03-01&end_date=2023-03-31&key=${API_KEY}`;
    const response = await fetch(url);

    const json = await response.json();
    const dailyWeather = json.data.map((element) => {
      return {
        state: json.state_code,
        city: json.city_name,
        datetime: element.datetime,
        max_temp: element.max_temp,
        min_temp: element.min_temp,
        temp: element.temp,
        precip: element.precip,
        wind_dir: element.wind_dir,
        wind_spd: element.wind_spd,
      };
    });

    setList(dailyWeather);
    //console.log(dailyWeather);

    const sortByHigh = dailyWeather.sort((a, b) => {
      return Number(a.max_temp) - Number(b.min_temp);
    });

    console.log(sortByHigh);
    // const sortdailyWeather = dailyWeather.sort((a, b) => {
    //   return Number(a.datetime.slice(8, 9)) - Number(b.datetime.slice(8, 9));
    // });

    // console.log(sortdailyWeather);
  };

  return (
    <div className="Home">
      <a className="text-3xl font-bold"> My Weather View</a> <br></br> <br></br>
      <div className=" space-x-2 ">
        <button className="rounded-full... " onClick={callDailyWeather}>
          {" "}
          Call Daily Weather
        </button>
        <button
          className="rounded-full... bg-red-200 text-slate-800"
          onClick={callDailyWeather}>
          {" "}
          Filter by High
        </button>
        <button
          className="rounded-full... bg-blue-200 text-slate-800 "
          onClick={callDailyWeather}>
          {" "}
          Filter by Low
        </button>
      </div>
      <br></br>
      <DailyWeather weatherData={list} />
    </div>
  );
}

export default Home;
