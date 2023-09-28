import React, { useEffect, useState } from "react";
import { fetchDashboardDataApi,fetchDashboardApi } from "../../services/vendorAPI";

const DashBoard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardData = await fetchDashboardDataApi();

        setDashboardData(dashboardData);
        console.log(dashboardData, "at page dashboard data is .....");
      } catch (error) {
        console.log(error);
      }
    };
    fetchDashboardData();
  }, []);



  return (
    <>
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
        <h1 className="font-bold mt-10 mb-6 text-2xl text-indigo-950">
          DASHBOARD
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-400 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <div className="text-white text-4xl">
              <i className="fas fa-box"></i>
            </div>
            <h1 className="text-blue-900 text-center text-lg font-bold mt-4">
              Total Service Package(verified)
            </h1>
            <h1 className="text-white text-center text-lg font-bold">
              {dashboardData?.verifiedService || 0}
            </h1>
          </div>
          <div className="bg-gray-400 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <div className="text-white text-4xl">
              <i className="fas fa-users"></i>
            </div>
            <h1 className="text-blue-900 text-center text-lg font-bold mt-4">
              Total Service Package(Not verified)
            </h1>
            <h1 className="text-white text-center text-lg font-bold">
              {dashboardData?.unVerifiedService || 0}
            </h1>
          </div>
          <div className="bg-gray-400 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <div className="text-white text-4xl">
              <i className="fas fa-money-bill-alt"></i>
            </div>
            <h1 className="text-blue-900 text-center text-lg font-bold mt-4">
              Total Revenue
            </h1>
            <h1 className="text-white text-center text-lg font-bold">
              ₹ {dashboardData?.totalCurrency || 0}
            </h1>
          </div>
          <div className="bg-gray-400 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <div className="text-white text-4xl">
              <i className="fas fa-money-bill-alt"></i>
            </div>
            <h1 className="text-blue-900 text-center text-lg font-bold mt-4">
              Bookings(pending)
            </h1>
            <h1 className="text-white text-center text-lg font-bold">
              {dashboardData?.bookings || 0}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
