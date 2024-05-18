import React from 'react'
import getCookieByName from '../../functions/getcookie'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = () => {
 const token  = getCookieByName("token")
 console.log("token",token);
 if(token === ""){



   return <Navigate to ='/login' />

 }
 else{
    return <Outlet />
 }

}

export default AuthRoute