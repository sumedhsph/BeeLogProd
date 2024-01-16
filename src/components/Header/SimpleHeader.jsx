import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import logo from "../../assets/logo.png";
 

function SimpleHeader() {

   
  return (
    <div className='bg-indigo-900 flex align-middle'>
        <Link to="/" className="text-white font-extrabold text-sm md:text-l flex justify-center pt-2 pl-2">
          <img src={logo} alt="BeeLog" style={{widows:'30px', height:'30px'}}/> <span> BeeLog</span>
        </Link>
       <Nav/>
    </div>
  )
}

export default SimpleHeader