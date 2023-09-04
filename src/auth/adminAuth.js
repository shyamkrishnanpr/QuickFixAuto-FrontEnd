import React from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router'
import {useSelector} from 'react-redux'

export default function adminAuth({children}){
    const navigate = useNavigate()
    const adminToken = useSelector(state=>state.token.token) 

    console.log("token in auth ",adminToken)

    useEffect(() => {
        if (adminToken==null) {
          navigate('/admin/login');
        }
    },[adminToken,navigate])



return children
}