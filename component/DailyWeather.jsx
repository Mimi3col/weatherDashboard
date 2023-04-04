import { useState } from "react";
//import DailyWeatherChart from "./DailyWeatherChart";

function DailyWeather({weatherData}) {
    const [location, setLocation] = useState({
        state:'',
        city:''
    })

    if(weatherData == null){
        return(
            <div>
                Searching For Data...
            </div>
        )
    }

    const weatherList = weatherData.map((element) => (
      <div
        key={element.datetime}
        className="weatherItem box-border border-slate-800 border-2  w-40 hover:shadow-yellow-300 shadow-xl  ">
        <button className="rounded-full text-slate-300  bg-transparent hover:bg-zinc-700 ">
          {element.datetime}
        </button>{" "}
        <br></br>
        <a className=" text-red-300">Daily High:</a> {element.max_temp}{" "}
        <br></br>
        <a className=" text-blue-300">Daily Low:</a> {element.min_temp}{" "}
        <br></br>
        <a className=""> rain:{element.precip} in</a> <br></br>
        <a className="">
          {" "}
          wind: {(Number(element.wind_spd) * 2.23).toPrecision(2)} mph{" "}
        </a>
      </div>
    ));

    return (
        <div className="Weather_data flex flex-row">
          {weatherList}
        </div>
    );
    
}

export default DailyWeather; 