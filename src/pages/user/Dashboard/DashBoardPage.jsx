import React, { useEffect, useState } from "react";
import Navbar from "../../../components/user/Navbar";
import Landing from "../../../components/user/Landing";
import bgImg from "../../../assets/images/car-banner.jpg";
import { fetchBannerApi } from "../../../services/userAPI";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const DashBoardPage = () => {
  const [banners, setBanners] = useState([]);

  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2 }}>
        <Navbar />
      </div>

      <div className="flex mt-20   p-8">
        <div className="w-1/3  ">
          <img
            src="/banner.jpg"
            alt="Image Alt Text"
            className="w-full  h-auto"
          />
        </div>

        <div className="w-2/3 p-8 bg-gradient-to-r from-slate-800 via-gray-900 to-gray-800 h-[441.5px]">
          <Landing />
        </div>
      </div>

      <h1 className="text-3xl text-left ml-4 font-semibold mt-6">
        Car Services Available near you..
      </h1>

      <div data-aos="fade-up">
        <div className=" flex flex-wrap justify-between w-full  mx-auto mt-2">
          <div className="w-1/2 md:w-1/4 p-4">
            <div className=" p-4 border rounded-lg flex flex-col items-center">
              <img src="/periodic.jpg" alt="Image 1" className="w-20 h-20 " />
              <p className="text-gray-700 text-xl">Periodic Services</p>
            </div>
          </div>

          <div className="w-1/2 md:w-1/4 p-4">
            <div className=" p-4 border rounded-lg flex flex-col items-center">
              <img src="/batt2.jpg" alt="Image 1" className="w-20 h-20 " />
              <p className="text-gray-700 text-xl">Batteries</p>
            </div>
          </div>

          <div className="w-1/2 md:w-1/4 p-4">
            <div className=" p-4 border rounded-lg flex flex-col items-center">
              <img src="/tyres.jpg" alt="Image 1" className="w-20 h-20 " />
              <p className="text-gray-700 text-xl">Tyres and Wheel Care</p>
            </div>
          </div>
          <div className="w-1/2 md:w-1/4 p-4">
            <div className=" p-4 border rounded-lg flex flex-col items-center">
              <img src="/sus2.jpg" alt="Image 1" className="w-20 h-20 " />
              <p className="text-gray-700 text-xl">Suspension & Fitment</p>
            </div>
          </div>
        </div>
      </div>

      <div data-aos="fade-up">
        <div className=" flex flex-wrap justify-between w-full mx-auto ">
          <div className="w-1/2 md:w-1/4 p-4">
            <div className=" p-4 border rounded-lg flex flex-col items-center">
              <img src="/turbo.jpg" alt="Image 1" className="w-20 h-20 " />
              <p className="text-gray-700 text-xl">Turbo</p>
            </div>
          </div>
          <div className="w-1/2 md:w-1/4 p-4">
            <div className=" p-4 border rounded-lg flex flex-col items-center">
              <img src="/brakes.jpg" alt="Image 1" className="w-20 h-20 " />
              <p className="text-gray-700 text-xl">Brakes </p>
            </div>
          </div>
          <div className="w-1/2 md:w-1/4 p-4">
            <div className=" p-4 border rounded-lg flex flex-col items-center">
              <img src="/engine.jpg" alt="Image 1" className="w-20 h-20 " />
              <p className="text-gray-700 text-xl">Engine and Related</p>
            </div>
          </div>
          <div className="w-1/2 md:w-1/4 p-4">
            <div className=" p-4 border rounded-lg flex flex-col items-center">
              <img src="/clutch.jpg" alt="Image 1" className="w-20 h-20 " />
              <p className="text-gray-700 text-xl">Clutch and Body parts</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardPage;
