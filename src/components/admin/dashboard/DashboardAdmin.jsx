import React, { useEffect, useState } from "react";
import {
  dashboardDataApi,
  dashboardGraphApi,
} from "../../../services/adminAPI";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";

Chart.register(CategoryScale);

import { Bar } from "react-chartjs-2";

const DashboardAdmin = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await dashboardDataApi();
        setDashboardData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchDashboardGraph = async () => {
      try {
        const data = await dashboardGraphApi();
        setChartData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDashboardGraph();
  }, []);

  console.log(chartData, "chartdat");

  const { serviceChart, bookingChart,userChart,vendorChart } = chartData || {};

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
    },
  };

  const chartDataConfig = {
    labels: serviceChart ? Object.keys(serviceChart[0]?.data ?? 0) : [],
    datasets: [
      {
        label: "Services",
        data: serviceChart ? Object.values(serviceChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(21, 41, 194, 0.88)",
      },
      {
        label: "Bookings",
        data: bookingChart ? Object.values(bookingChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(46, 170, 18, 0.8)",
      },
      {
        label: "Users",
        data: userChart ? Object.values(userChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(238, 231, 9, 1)",
      },
      {
        label: "Vendors",
        data: vendorChart ? Object.values(vendorChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(238, 40, 9, 1)",
      },
    ],
  };

  return (
    <>
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
        <h1 className="font-bold mt-5 mb-3 text-2xl text-indigo-950">
          DASHBOARD
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:grid-cols-1 ">
          <div className="bg-gray-500 rounded-lg shadow-lg p-6 flex flex-col items-center max-w-xs  ">
            <div className="text-white text-4xl">
              <i className="fas fa-box"></i>
            </div>
            <h1 className="text-white text-center text-lg font-bold mt-4">
              Total service Packages
            </h1>
            <h1 className="text-white text-center text-lg font-bold">
              {dashboardData?.totalServices || 0}
            </h1>
          </div>
          <div className="bg-gray-500 rounded-lg shadow-lg p-6 flex flex-col items-center max-w-xs">
            <div className="text-white text-4xl">
              <i className="fas fa-money-bill-alt"></i>
            </div>
            <h1 className="text-white text-center text-lg font-bold mt-4">
              Total Bookings
            </h1>
            <h1 className="text-white text-center text-lg font-bold">
              {dashboardData?.totalbookings || 0}
            </h1>
          </div>

          <div className="bg-gray-500 rounded-lg shadow-lg p-6 flex flex-col items-center max-w-xs">
            <div className="text-white text-4xl">
              <i className="fas fa-users"></i>
            </div>
            <h1 className="text-white text-center text-lg font-bold mt-4">
              Total Users
            </h1>
            <h1 className="text-white text-center text-lg font-bold">
              {dashboardData?.totalUsers || 0}
            </h1>
          </div>

          <div className="bg-gray-500 rounded-lg shadow-lg p-6 flex flex-col items-center max-w-xs">
            <div className="text-white text-4xl">
              <i className="fas fa-store"></i>
            </div>
            <h1 className="text-white text-center text-lg font-bold mt-4">
              Total Vendors
            </h1>
            <h1 className="text-white text-center text-lg font-bold">
              {dashboardData?.totalVendors || 0}
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 ">
          <h1 className="font-bold mt-10 mb-6 text-2xl text-indigo-950 ">
            Monthly Data
          </h1>
          <div className="chart-container h-[400px] w-[100%] ">
            {chartData ? (
              <Bar data={chartDataConfig} options={chartOptions} />
            ) : (
              <div>Loading chart data...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
