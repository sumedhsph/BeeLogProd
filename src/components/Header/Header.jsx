import React from "react";
import cover from "../../assets/cover.png";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { useAuthContext } from "../../context/AuthContext";

function Header() {
  const{user, logout}=useAuthContext();
  return (
    <>
    
    <div
      className="w-full m-0 p-0 bg-cover bg-bottom"
      style={{
        backgroundImage: `url(${cover})`,
        height: "60vh",
        maxHeight: `460px`
      }}
    >
      <div className="container max-w-4xl mx-auto pt-4 md:pt-10 text-center break-normal mb-10">
        <Link to="/" className="text-white font-extrabold text-2xl md:text-5xl flex justify-center">
          <img src={logo} alt="BeeLog" /> <span> BeeLog</span>
        </Link>
        <p className="text-xl md:text-2xl text-gray-500">Welcome to my Blog</p>
      </div>
      <Nav/>
    </div>
    </>
  );
}

export default Header;
