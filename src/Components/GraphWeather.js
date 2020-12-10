import React from "react";
import { Line } from "react-chartjs-2";

const GraphWeather = ({ weatherData }) => {
  const graphData = {
    labels: weatherData.weatherHours.data,
    datasets: [
      {
        label: weatherData.Temperature.label,
        data: weatherData.Temperature.data,
        borderColor: ["rgba(255, 99, 132, 1)"],
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 3,
        pointRadius: 2.5,
        fill: false,
      },
      {
        label: weatherData.RealFeelTemperature.label,
        data: weatherData.RealFeelTemperature.data,
        borderColor: ["rgba(33, 99, 132, 1)"],
        pointBackgroundColor: "rgba(33, 99, 132, 1)",
        pointBorderColor: "rgba(33, 99, 132, 1)",
        borderWidth: 3,
        pointRadius: 2.5,
        fill: false,
      },

      {
        label: weatherData.Rain.label,
        data: weatherData.Rain.data,
        borderColor: ["rgba(255, 99, 7, 1)"],
        pointBackgroundColor: "rgba(255, 99, 7, 1)",
        pointBorderColor: "rgba(255, 99, 7, 1)",
        borderWidth: 3,
        pointRadius: 2.5,
        fill: false,
      },
      {
        label: weatherData.Snow.label,
        data: weatherData.Snow.data,
        borderColor: ["rgba(0, 255, 0, 1)"],
        pointBackgroundColor: "rgba(0, 255, 0, 1)",
        pointBorderColor: "rgba(0, 255, 0, 1)",
        borderWidth: 3,
        pointRadius: 2.5,
        fill: false,
      },
      {
        label: weatherData.DewPoint.label,
        data: weatherData.DewPoint.data,
        borderColor: ["rgba(255, 0, 0, 1)"],
        pointBackgroundColor: "rgba(255, 0, 0, 1)",
        pointBorderColor: "rgba(255, 0, 0, 1)",
        borderWidth: 3,
        pointRadius: 2.5,
        fill: false,
      },
      {
        label: weatherData.CloudCover.label,
        data: weatherData.CloudCover.data,
        borderColor: ["rgba(153, 51, 255, 1)"],
        pointBackgroundColor: "rgba(153, 51, 255, 1)",
        pointBorderColor: "rgba(153, 51, 255, 1)",
        borderWidth: 3,
        pointRadius: 2.5,
        fill: false,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: -20,
            suggestedMax: 20,
          },
        },
      ],
    },
    hover: {
      mode: "point",
    },
  };

  const isMobile = window.innerWidth >= 425 ? false : true;

  const grapLegend = {
    display: true,
    position: "bottom",
    align: isMobile ? "start" : "center",
    labels: {
      fontColor: "#323130",
      fontSize: 12,
      boxWidth: 20,
      padding: 20,
    },
  };

  return (
    <div
      style={{
        position: "relative",
        margin: "0 auto",
        height: "80vh",
        width: "80vw",
      }}
    >
      <Line data={graphData} legend={grapLegend} options={graphOptions} />
    </div>
  );
};
export default GraphWeather;
