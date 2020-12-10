import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import "../Styles/TableStyle.css";

const TableWeather = ({ weatherData }) => {
  const [checkedToFilter, setcheckedToFilter] = useState({});

  const handleCheckBox = (checkedItems) => {
    setcheckedToFilter(checkedItems);
  };

  return (
    <div className="overflow">
      <table className="weatherTable">
        <thead>
          <tr>
            {Object.keys(weatherData).map((key, i) =>
              weatherData[key].label ? (
                <th
                  key={i + "headTh"}
                  id="heading"
                  className={i === 0 ? "" : ""}
                >
                  <DropdownMenu
                    i={i}
                    key={i + "dropdown"}
                    weather={weatherData[key].data}
                    label={weatherData[key].label}
                    handleCheckBox={handleCheckBox}
                  />
                </th>
              ) : null
            )}
          </tr>
        </thead>
        <tbody>
          {weatherData.Temperature.data.map((item, i) => (
            <tr key={i}>
              {!checkedToFilter[i] ? (
                <>
                  <th className="responsive">
                    {weatherData.weatherHours.data[i]}
                  </th>
                  <td>{weatherData.Temperature.data[i]}</td>
                  <td>{weatherData.RealFeelTemperature.data[i]}</td>
                  <td>{weatherData.Rain.data[i]}</td>
                  <td>{weatherData.Snow.data[i]}</td>
                  <td>{weatherData.DewPoint.data[i]}</td>
                  <td>{weatherData.CloudCover.data[i]}</td>
                </>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const checkEquality = (prevTableWeather, NextTableWeather) =>
  JSON.stringify(prevTableWeather) === JSON.stringify(NextTableWeather);
export default React.memo(TableWeather, checkEquality);
