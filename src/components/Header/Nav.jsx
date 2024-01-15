import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link
} from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
function Nav() {
  const { user, logout } = useAuthContext();

  return (
    <nav className="w-9/12 mx-auto bg-indigo-900 h-12 flex content-center">
      <div className="container mx-auto flex items-center">
        <div className="flex  pl-4 text-sm">
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
            <li className="mr-2">
              <NavLink
                className={`navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2`}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="mr-2">
              {user ? (
                <NavLink
                  className="navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2"
                  to="/dashboard"
                >
                  Dashboard
                </NavLink>
              ) : (
                <NavLink
                  className=" navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2"
                  to="/articles"
                >
                  articles
                </NavLink>
              )}
            </li>
            <li className="mr-2">
              {user ? (
                <NavLink
                  className=" navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2"
                  to="/articles"
                >
                  articles
                </NavLink>
              ) : null}
            </li>
            <li className="mr-2">
              {user ? (
                <NavLink
                  to="/createpost"
                  className="navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2"
                >
                  Create Article
                </NavLink>
              ) : (
                <NavLink
                  className="navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2"
                  to="/register"
                >
                  register
                </NavLink>
              )}
            </li>
            <li className="mr-2">
              {user ? (
                <Link
                  className="navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2"
                  onClick={logout}
                >
                  Logout
                </Link>
              ) : (
                <NavLink
                  className="navLink inline-block text-gray-400 no-underline uppercase hover:text-gray-200 hover:underline py-2 px-2"
                  to="/login"
                >
                  login
                </NavLink>
              )}
            </li>
          </ul>
        </div>

        <div className="flex w-1/2 justify-end content-center">
          <div className="">
            {user && (
              <span className="text-gray-300 pr-2">Welcome, {user.name}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
