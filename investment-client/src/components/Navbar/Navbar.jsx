import { useState } from "react";
import { NavLink } from "react-router-dom";
// import { LuLoader2 } from "react-icons/lu";
import { FaBitcoin } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { LuLoader2 } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import NotificationPopup from "../NotificationPopup/NotificationPopup";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/logo.jpeg";

function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  const { user, logout, logoutLoading } = useAuth();
  const links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Investments", link: "/investments" },
    // { name: "Faq", link: "/faq" },
    { name: "security", link: "/security" },
    // { name: "About", link: "/about" },
    // { name: "Store locations", link: "/locations" },
  ];

  return (
    <div className="shadow-md w-full fixed z-[1999] top-0 left-0 font-montserrat bg-slate-900">
      {/* find a wrapper */}
      {/* <Container> */}
      <div
        className="md:px-10 py-4 px-7 md:flex justify-between items-center
bg-slate-900 text-white"
      >
        {/* logo here */}
        <NavLink
          to="/"
          className="flex text-2xl cursor-pointer items-center gap-2 w-fit"
        >
          <img
            src={logo}
            alt="logo"
            className=" w-16 h-16 rounded-full object-cover"
          />
          <span className="font-bold text-sm md:text-xl">XWIN</span>
        </NavLink>

        {/* menu icon */}
        <div
          onClick={() => setisOpen(!isOpen)}
          onKeyDown={() => setisOpen(!isOpen)}
          role="presentation"
          className="w-7 h-7 absolute right-8 top-6
    cursor-pointer md:hidden"
        >
          {isOpen ? <IoIosCloseCircle /> : <RxHamburgerMenu />}
        </div>

        {/* nav links here */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static
     bg-slate-900 text-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9
      transition-all duration-500 ease-in ${
        isOpen ? "top-12" : "top-[-490px]"
      } `}
        >
          {links.map((link) => (
            <li key={link.name} className="font-semibold my-7 md:my-0 md:ml-8">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "text-white"
                }
                to={link.link}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {user ? (
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row">
              <NavLink
                to="/dashboard"
                className="text-white flex items-center justify-center w-[150px] bg-transparent border border-red-400  py-1 px-3 md:ml-8 rounded md:static"
              >
                Dashboard
              </NavLink>
              <button
                onClick={logout}
                type="button"
                className="text-white w-[150px] items-center justify-center bg-red-400 border border-red-400  py-1 px-3 md:ml-8 rounded md:static"
              >
                {logoutLoading ? (
                  <LuLoader2 className="animate-spin" />
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-white bg-transparent border border-red-400  py-1 px-3 md:ml-8 rounded md:static"
            >
              Login
            </NavLink>
          )}
        </ul>
      </div>
      <NotificationPopup />
      {/* </Container> */}
    </div>
  );
}

export default Navbar;
