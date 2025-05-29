import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SemiCircleDoughnut: React.FC<{
  income: number;
  expense: number;
  balance: number;
}> = ({ income, expense, balance }) => {
  const data = {
    labels: ["Income", "Expenses", "Balance"],
    datasets: [
      {
        data: [income, expense, balance],
        backgroundColor: ["#4be3d4", "#53b9ff", "#fed76d"],
        borderWidth: 0,
        cutout: "90%",
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    plugins: {
      responsive: 2,
      legend: {
        display: true,
        // position: "bottom", // Ensure this matches the allowed string literals
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="flex flex-col items-center  bg-white p-5 rounded-md shadow-md max-w-full">
      <div className="w-95 relative">
        <Doughnut data={data} options={options} />
        <div className="text-center mt-[-60px] absolute top-[70%] left-[50%] transform translate-x-1/2 -translate-y-1/2">
          <p className="text-gray-500 text-sm">Income</p>
          <p className="text-[#dc4b3e] text-xl font-semibold">
            KES{" "}
            {balance && balance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SemiCircleDoughnut;
