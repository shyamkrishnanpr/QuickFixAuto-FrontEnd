import react from 'react'
import{Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import AdminRoutes from './Routes/AdminRoutes'
import VendorRoutes from './Routes/VendorRoutes'
import UserRoutes from './Routes/UserRoutes'

import './App.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  
  AOS.init();

  return (
    <>
    <Router>
      <Routes>
      <Route path="/admin/*" element={ <AdminRoutes /> } />
      <Route path='/vendor/*' element={<VendorRoutes /> } />
      <Route path='/user/*' element={<UserRoutes /> } />
      </Routes>
      </Router> 
    </>
  )
}

export default App
