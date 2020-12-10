import React, { useEffect, useState } from "react";
import Graph from "./GraphWeather";
import Table from "./TableWeather";
import { API_KEY, LOCATION_KEY, LOCATION_NAME } from "../ConstantApi";
import "../Styles/Main.css";

const Main = () => {
  let [weatherData, setweatherData] = useState({
    weatherHours: { label: "", data: [] },
    Temperature: { label: "", data: [] },
    RealFeelTemperature: { label: "", data: [] },
    Rain: { label: "", data: [] },
    Snow: { label: "", data: [] },
    DewPoint: { label: "", data: [] },
    CloudCover: { label: "", data: [] },
    timer: 0,
  });

  const calculateNewTimer = () => {
    //getting the minutes left until the next hour starts, to call the api
    let date = new Date();
    return (60 - date.getMinutes()) * 60000;
  };

  const arrangeWeatherData = (apiResult) => {
    //initilize temprory arrays
    let tempLabels = [],
      tempTemperature = [],
      tempRealFeelTemperature = [],
      tempRain = [],
      tempSnow = [],
      tempDewPoint = [],
      tempCloudCover = [];

    //extracting data of each hour into arrays, because the graph needs the data seperated for each line
    apiResult.map((item, i) => {
      let hour = Number(item.DateTime.slice(11, 13));
      let converHour24To12 =
        (hour % 12 || 12) + (hour < 12 || hour === 24 ? "AM" : "PM");

      tempLabels.push(converHour24To12);
      tempTemperature.push(item.Temperature.Value);
      tempRealFeelTemperature.push(item.RealFeelTemperature.Value);
      tempRain.push(item.Rain.Value);
      tempSnow.push(item.Snow.Value);
      tempDewPoint.push(item.DewPoint.Value);
      tempCloudCover.push(item.CloudCover);
      return null;
    });

    //arranging the weather data to update the state
    let weatherData = {
      weatherHours: { label: "Hours", data: tempLabels },
      Temperature: {
        label: "Temperature in " + apiResult[0].Temperature.Unit,
        data: tempTemperature,
      },
      RealFeelTemperature: {
        label:
          "Real Feel Temperature in " + apiResult[0].RealFeelTemperature.Unit,
        data: tempRealFeelTemperature,
      },
      Rain: {
        label: "Rain in " + apiResult[0].Rain.Unit,
        data: tempRain,
      },
      Snow: {
        label: "Snow in " + apiResult[0].Snow.Unit,
        data: tempSnow,
      },
      DewPoint: {
        label: "Dew Point in " + apiResult[0].DewPoint.Unit,
        data: tempDewPoint,
      },
      CloudCover: {
        label: "Cloud Cover in %",
        data: tempCloudCover,
      },
      timer: 0,
    };
    return weatherData;
  };

  const fetchingData = () =>
    fetch(
      `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${LOCATION_KEY}?apikey=${API_KEY}&language=en-us&details=true&metric=true`
    )
      .then((res) => res.json())
      .then((result) => {
        //the fellowing steps will ensure that after the api data got recieved,
        //the component will rerender with the new data
        //and another setTimeout will be fired with the new timer adjusted to the next hour
        let newWeatherState = arrangeWeatherData(result);
        let newTimer = calculateNewTimer();
        newWeatherState.timer = newTimer;
        setweatherData(newWeatherState);
      });

  useEffect(() => {
    //setTimeOut will be called at the beginig of each hour
    setTimeout(() => fetchingData(), weatherData.timer);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData.weatherData, weatherData.timer]);

  return (
    <div className="alignment">
      <div className="paddingHeader">
        <h2>{` Weather of ${LOCATION_NAME}`}</h2>
        <p>{`Below are hourly weather info of ${LOCATION_NAME}`}</p>
        <br />
      </div>
      {weatherData.weatherHours.data.length ? (
        <>
          <Graph weatherData={weatherData} />
          <br />
          <Table weatherData={weatherData} />
        </>
      ) : null}
    </div>
  );
};
export default Main;
