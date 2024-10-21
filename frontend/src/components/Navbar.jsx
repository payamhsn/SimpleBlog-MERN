import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoClose, IoMenuSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

import AvaterImg from "../assets/commentor.png";

const navLists = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about-us" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Contact Us", path: "/contact-us" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <header className="bg-white py-6 border">
      <nav className="container mx-auto flex justify-between px-5">
        <Link to="/">
          <img src="/logo.png" alt="" className="h-12" />
          <p>Logo here</p>
        </Link>
        <ul className="sm:flex hidden items-center gap-8">
          {navLists.map((list, index) => (
            <li key={index}>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to={`${list.path}`}
              >
                {list.name}
              </NavLink>
            </li>
          ))}
          {user && user?.role === "user" ? (
            <li className="flex gap-3 items-center">
              <img src={AvaterImg} alt="" className="size-8" />
              <button
                onClick={handleLogout}
                className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}

          {/* admin */}
          {user && user?.role === "admin" && (
            <li className="flex gap-3 items-center">
              <img src={AvaterImg} alt="" className="size-8" />
              <Link to="/dashboard">
                <button className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm">
                  Dashboard
                </button>
              </Link>
            </li>
          )}
        </ul>

        {/* toogle menu */}
        <div className="flex items-center sm:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm text-gray-500 hover:text-gray-900"
          >
            {isMenuOpen ? (
              <IoClose className="size-6" />
            ) : (
              <IoMenuSharp className="size-6" />
            )}
          </button>
        </div>

        {/* mobile menu items */}
        {isMenuOpen && (
          <ul className="fixed top-[106px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50 sm:hidden">
            {navLists.map((list, index) => (
              <li className="mt-5 px-4" key={index}>
                <NavLink
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to={`${list.path}`}
                >
                  {list.name}
                </NavLink>
              </li>
            ))}
            {user ? (
              <>
                <img src={AvaterImg} alt="" className="size-8" />
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="px-4 mt-5">
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
