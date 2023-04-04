import React, { Component, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function DailyWeatherChart({weatherData}){
    
   const chartData = weatherData.map((element) => {
     return {
       name: element.datetime,
       amount: element.temp
     }
   });



    return (
      <LineChart
        width={730}
        height={250}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    );
}

export default DailyWeatherChart
