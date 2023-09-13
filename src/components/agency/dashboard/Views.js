import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);
const Views = () => {
  const data = {
    labels: [
      "August 30, 2023",
      "August 31, 2023",
      "September 1, 2023",
      "September 2, 2023",
      "September 3, 2023",
      "September 4, 2023",
      "September 5, 2023",
      "September 6, 2023",
      "September 7, 2023",
      "September 8, 2023",
      "September 9, 2023",
      "September 10, 2023",
      "September 11, 2023",
      "September 12, 2023",
      "September 13, 2023",
    ],
    datasets: [
      {
        id: 1,
        label: "Views",
        data: [2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgb(0,0,0)",
        backgroundColor: "rgb(0,0,0)",
        fill: true,
        tension: 0.3,
      },
    ],
  };
  return (
    <div className="card">
      <div className="card-title">Your Profile Views</div>
      <div className="card-body">
        <Line
          data={data}
          options={{
            responsive: true,
            scales: {
              x: {
                ticks: {
                  stepSize: 1,
                  callback: function (value, index, tick) {
                    if (index % 2 === 0) {
                      return this.getLabelForValue(value);
                    }
                    return "";
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Views;
