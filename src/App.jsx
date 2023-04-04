import { useState } from 'react'
import './App.css'
import DailyWeather from '../component/DailyWeather';
import { Route, Routes } from 'react-router-dom';
//import DailyWeatherChart from '../component/DailyWeatherChart';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null)
  const [Hourly,setHourly] = useState(null)
  const [highList, setHighList]= useState(null)
  const [lowList, setLowList] = useState(null)
  const [zipCode, setZipCode] = useState("")
  const [searchDate, setSearchDate] = useState('')
  const [filterType, setFilterType] = useState(-1)

  const dailyWeatherData = {
    state:'',
    city:'',
    datetime:'',
    max_temp:'',
    min_temp:'',
    temp:'',
    precip:'',
    max_wind_dir:'',
    max_wind_spd:''
  }



  const callDailyWeather = async () => {
      
    setZipCode(33510)
      
      const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?postal_code=${zipCode}&units=I&country=US&start_date=2023-03-01&end_date=2023-03-07&key=${API_KEY}`);

      const json = await response.json();
      const dailyWeather = json.data.map((element)=>{
        return{
          state: json.state_code,
          city: json.city_name,
          datetime: element.datetime,
          max_temp: element.max_temp,
          min_temp: element.min_temp,
          temp: element.temp,
          precip: element.precip,
          wind_dir: element.wind_dir,
          wind_spd: element.wind_spd,
        }
      })
      
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


    // const callHourlyWeather = async () => {

    //  const url = `https://api.weatherbit.io/v2.0/history/hourly?postal_code=${zipCode}&units=I&country=US&start_date=${start}&end_date=${end}&key=${API_KEY}`;
    //   const response = await fetch(url);

    //   const json = await response.json();
    //   const hourlyWeather = json.data.map((element)=>{
    //     return{
    //       state: json.state_code,
    //       city: json.city_name,
    //       datetime: element.datetime,
    //       max_temp: element.max_temp,
    //       min_temp: element.min_temp,
    //       temp: element.temp,
    //       precip: element.precip,
    //       wind_dir: element.wind_dir,
    //       wind_spd: element.wind_spd,
    //     }
    //   })
      
    //   setHourly(hourlyWeather); 
    //   //console.log(dailyWeather);       

    //   // const sortByHigh = hourlyWeather.sort((a, b) => {
    //   //   return Number(a.max_temp) - Number(b.min_temp);
    //   // });

    //   // console.log(sortByHigh); 
    //   // const sortdailyWeather = dailyWeather.sort((a, b) => {
    //   //   return Number(a.datetime.slice(8, 9)) - Number(b.datetime.slice(8, 9));
    //   // });

    //   // console.log(sortdailyWeather);    

    // };




    


  return (
    <>


      <div className=" App">
        <a className="text-3xl font-bold"> My Weather View</a> <br></br>{" "}
        <br></br>
        <div className=" space-x-2 ">
          <input
            className="placeholder:italic placeholder:text-slate-500 block bg-slate-200 w-full border border-slate-500 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm text-slate-700 "
            placeholder="enter a zip code"
            type="text"
            name="search"
            value={zipCode}
            onChange={(event) => setZipCode(event.target.value)}
          />{" "}
          <br></br>
          <button
            className="rounded-full... bg-slate-500 p-1  "
            onClick={callDailyWeather}>
            {" "}
            Call Daily Weather
          </button>
          <button
            className="rounded-full... bg-red-200 text-slate-800 p-1"
            onClick={() => setFilterType(1)}>
            {" "}
            Filter High
          </button>
          <button
            className="rounded-full... bg-blue-200 text-slate-800 p-1"
            onClick={() => setFilterType(2)}>
            {" "}
            Filter Low
          </button>
        </div>
        <br></br>
        <DailyWeather weatherData={list} />
      </div>
    </>
  );
}

export default App
