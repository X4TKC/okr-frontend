import React from "react";
import { Scatter } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import Chart from "chart.js/auto";
import "./index.css";
/*import {
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  Legend,
  TimeScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from "chart.js";

ChartJS.register(
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  Title,
  LineElement,
  LineController
);*/
function ProgressChart({ progressData }) {
  const dataTest = {
    "6le4AGbZ96pO64lA0FLv": [
      {
        id: "FD1VUUMf58IvF2Ir5azS",
        day: "2023-08-24T17:15:53.470Z",
        value: 12,
        keyId: "6le4AGbZ96pO64lA0FLv",
        objectiveId: "O4jAz8I49YcuAlkck0rH",
      },
      {
        id: "FD1VUUMf58IvF2Ir5azS",
        day: "2023-08-25T17:15:53.470Z",
        value: 13,
        keyId: "6le4AGbZ96pO64lA0FLv",
        objectiveId: "O4jAz8I49YcuAlkck0rH",
      },
    ],
    riYDBs7Xozg7Vl5E6Kab: [
      {
        id: "GGPBwSLQhnNZGklHCCrV",
        day: "2023-08-24T17:16:11.074Z",
        value: 20,
        keyId: "riYDBs7Xozg7Vl5E6Kab",
        objectiveId: "O4jAz8I49YcuAlkck0rH",
      },
      {
        id: "GGPBwSLQhnNZGklHCCrV",
        day: "2023-08-25T17:16:11.074Z",
        value: 22,
        keyId: "riYDBs7Xozg7Vl5E6Kab",
        objectiveId: "O4jAz8I49YcuAlkck0rH",
      },
    ],
  };
  // Create an object to store datasets for each key result
  function separateDataByKeyId(data) {
    const separatedData = {};

    data.forEach((entry) => {
      const keyId = entry.keyId;

      if (!separatedData[keyId]) {
        separatedData[keyId] = [];
      }

      separatedData[keyId].push(entry);
    });
    return separatedData;
  }
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const datasets = Object.entries(separateDataByKeyId(progressData)).map(
    ([keyId, data]) => {
      return {
        label: `Key ${keyId}`,
        pointRadius: 4,
        pointBackgroundColor: getRandomColor(), // You can generate a random color here
        data: data.map((entry) => ({
          x: entry.day,
          y: entry.value,
        })),
      };
    }
  );

  const data = {
    datasets: datasets,
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "MMM d",
          },
        },
        position: "bottom",
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        min: 0,
        max: 70,
      },
    },
  };

  return <Scatter data={data} options={options} />;
}

export default ProgressChart;
