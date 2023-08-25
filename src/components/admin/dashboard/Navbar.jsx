import React from 'react'
import {useNavigate} from 'react-router'
import {useDispatch,useSelector} from 'react-redux'
import { removeToken } from '../../../store/actions/admin/tokenAction'

const Navbar = () => {

  const token = useSelector(state => state.token.token)
  console.log("token in homepage ",token)
  const navigate = useNavigate()
  const disapatch = useDispatch()
  const handleLogout = (e)=>{
     e.preventDefault()
     disapatch(removeToken())
     navigate('/admin/login')   
  }

  return (
<>
<div className="bg-gradient-to-tr from-gray-600 to-gray-300 p-4">
  <nav className="flex items-center justify-between">
    <div className="text-white text-2xl font-bold">ADMIN PANEL</div>
    <ul className="flex space-x-4">
      <li>
        <a href="#" onClick={handleLogout} className="text-white hover:underline">Logout</a>
      </li>
    </ul>
  </nav>
</div>

    
    
    </>
  )
}

export default Navbar
