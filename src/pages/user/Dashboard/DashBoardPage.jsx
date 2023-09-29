import React, { useEffect, useState } from "react";
import Navbar from "../../../components/user/Navbar";
import Landing from "../../../components/user/Landing";
import bgImg from "../../../assets/images/car-banner.jpg";
import { fetchBannerApi } from "../../../services/userAPI";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const DashBoardPage = () => {
  const [banners, setBanners] = useState([]);
  
   
  useEffect(()=>{
    fetchBanners()
  },[])
  const fetchBanners = async () => {
    try {
      const bannerData = await fetchBannerApi();
      console.log(bannerData)
      setBanners(bannerData);
    } catch (error) {
      console.log(error);
    }
  };

  const containerStyle1 = {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "80vh",
  };
  return (
    <>
      <Navbar />
      <div style={{ position: 'relative', height: '100vh' }} >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
          <Landing />
        </div >
        {/* <Carousel showArrows={true} showStatus={false} showIndicators={false} showThumbs={false} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          {banners?.map((banner) => (
            <div key={banner._id}>
              <img src="https://di-uploads-development.dealerinspire.com/raybrandttoyota/uploads/2018/11/Parts-Banner-3.jpg" alt={`Banner ${banner._id}`} />
            </div>
          ))}
        </Carousel> */}
        <img src="https://di-uploads-development.dealerinspire.com/raybrandttoyota/uploads/2018/11/Parts-Banner-3.jpg" alt="" />

      </div>
    </>
  );
};

export default DashBoardPage;
