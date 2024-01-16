import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link
} from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
import { FaHome, FaFileAlt, FaUserPlus, FaPowerOff } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";

function Nav() {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  const { user, logout } = useAuthContext();

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 769);
    };
    //initial check on component mount
    handleResize();

    //
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="w-9/12 mx-auto bg-indigo-900 h-12 flex content-center">
      {/* {isScreenSmall ? <p>Screen is small</p> : <p>screen is large</p>} */}
      <div className="container mx-auto flex items-center">
        <div className="flex  pl-4 text-sm">
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
            <li className="mr-2">
              <NavLink
                className={`navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2`}
                to="/"
              >
                {isScreenSmall ? <FaHome titlek="Home" /> : `Home`}
              </NavLink>
            </li>
            <li className="mr-2">
              {user ? (
                <NavLink
                  className="navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2"
                  to="/dashboard"
                >
                  {isScreenSmall ? (
                    <MdDashboard titlek="Dashboard" />
                  ) : (
                    `Dashboard`
                  )}
                </NavLink>
              ) : (
                <NavLink
                  className=" navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2"
                  to="/articles"
                >
                  {isScreenSmall ? <FaFileAlt titlek="articles" /> : `articles`}
                </NavLink>
              )}
            </li>
            <li className="mr-2">
              {user ? (
                <NavLink
                  className=" navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2"
                  to="/articles"
                >
                  {isScreenSmall ? <FaFileAlt titlek="articles" /> : `articles`}
                </NavLink>
              ) : null}
            </li>
            <li className="mr-2">
              {user ? (
                <NavLink
                  to="/createpost"
                  className="navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2"
                >
                  {isScreenSmall ? (
                    <TfiWrite titlek="Create Article" />
                  ) : (
                    `Create Article`
                  )}
                </NavLink>
              ) : (
                <NavLink
                  className="navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2"
                  to="/register"
                >
                  {isScreenSmall ? (
                    <FaUserPlus titlek="register" />
                  ) : (
                    `register`
                  )}
                </NavLink>
              )}
            </li>
            <li className="mr-2">
              {user ? (
                <Link
                  className="navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2"
                  onClick={logout}
                >
                   
                  {isScreenSmall ? <FaPowerOff titlek="Logout" /> : `Logout`}
                </Link>
              ) : (
                <NavLink
                  className="navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2"
                  to="/login"
                >
                  {isScreenSmall ? <RiLoginBoxLine titlek="Login" /> : `Login`}
                </NavLink>
              )}
            </li>
          </ul>
        </div>

        <div className="flex w-1/2 justify-end content-center">
          <div className="">
            {user && (
              <span className="text-gray-300 pr-2">{isScreenSmall ? `` : `Welcome, ${user.name}`}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
