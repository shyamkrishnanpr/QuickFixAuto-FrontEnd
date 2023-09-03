import React from 'react'
import Navbar from '../../../components/user/Navbar'
import Landing from '../../../components/user/Landing'
import bgImg from '../../../assets/images/car-banner.jpg'


const DashBoardPage = () => {
  const containerStyle1 = {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '80vh',
  };
  return (
    <>

    <Navbar/>
    <div className="w-full  " style={containerStyle1}>
    <Landing/>
    </div>
      
    </>
  )
}

export default DashBoardPage
