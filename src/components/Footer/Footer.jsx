import React from "react";
import { FaCopyright } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="container max-w-6xl mx-auto flex items-center px-2 py-8">
        <div className="w-full mx-auto flex flex-wrap items-center">
          <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
            <Link
              className="text-gray-900 no-underline hover:text-gray-900 flex hover:no-underline"
              to="/"
            >
               <span className="text-base text-gray-200 pt-1 pr-2"><FaCopyright/></span> <span className="text-base text-gray-200">  BeeLog</span>
            </Link>
          </div>
          <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
            <ul className="list-reset flex justify-center flex-1 md:flex-none items-center">
              <li>
                <Link
                  className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:underline py-2 px-3"
                 to="/articles"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:underline py-2 px-3"
                  to="/register"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:underline py-2 px-3"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
