import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import UseAuth from "../../../Hooks/UseAuth";
import logo from "../../../images/wedding-rings.png";
import UserRole from "../../../Hooks/UserRole";
import { BsPersonCircle } from "react-icons/bs";

// Placeholder avatar for users without a profile picture
const placeholderAvatar =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const MyNavbar = () => {
  const { user, logout } = UseAuth();
  const [toggle, setToggle] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [role] = UserRole();

  const handleLogout = () => {
    logout()
      .then(() => console.log("Logged out"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="backdrop-blur-md bg-rose-100/60 shadow-md sticky top-0 w-full z-50 border-b border-rose-100">
      <div className="h-16 flex justify-between items-center px-4 md:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-serif text-rose-500"
        >
          <img className="h-10" src={logo} alt="Logo" />
          <span className="tracking-wide hover:scale-105 transition-all duration-300">
            SoulTie
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex gap-6 items-center text-lg font-medium">
            {["/", "/biodatas", "/about", "/contact"].map((link, index) => (
              <NavLink
                key={index}
                to={link}
                className={({ isActive }) =>
                  `
                  relative px-1 capitalize
                  transition-all duration-300
                  after:content-[''] after:absolute after:left-0 after:-bottom-[2px]
                  after:h-[2px] after:w-0 after:bg-rose-500 after:transition-all after:duration-500 after:ease-in-out
                  ${
                    isActive
                      ? "text-rose-500 after:w-full"
                      : "text-black hover:text-rose-500 hover:after:w-full"
                  }
                  `
                }
              >
                {link === "/"
                  ? "Home"
                  : link.slice(1).replace(/([A-Z])/g, " $1")}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 relative">
          {user?.email ? (
            <div className="relative flex items-center">
              <button
                className="flex items-center text-2xl text-rose-500 focus:outline-none"
                onClick={() => setToggleMenu(!toggleMenu)}
              >
                <img
                  className="h-10 w-10 border-2 border-rose-300 rounded-full object-cover"
                  src={user?.photoURL || placeholderAvatar}
                  alt="User Profile"
                />
                {toggleMenu ? (
                  <IoIosArrowDropdown className="ml-2 transition-transform duration-300" />
                ) : (
                  <IoIosArrowDropup className="ml-2 transition-transform duration-300" />
                )}
              </button>

              {toggleMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white/80 backdrop-blur-md border border-rose-100 shadow-xl rounded-md z-30 transition-all">
                  <ul className="py-2  font-medium text-left px-2">
                    {role[0] === "admin" ? (
                      <NavLink
                        to="/dashboard/adminprofile"
                        end
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg shadow-md transform transition-all duration-200"
                            : "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-all duration-200"
                        }
                      >
                        <span className="font-medium">Admin Dashboard</span>
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/dashboard/profile"
                        end
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg shadow-md transform transition-all duration-200"
                            : "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-all duration-200"
                        }
                      >
                        <span className="font-medium">Dashboard</span>
                      </NavLink>
                    )}

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left  px-4 py-2 text-black hover:bg-rose-100 rounded-md transition-colors"
                    >
                      Logout
                    </button>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 text-lg font-medium text-rose-500 border border-rose-300 rounded-lg hover:bg-rose-50 transition-all">
                Sign In
              </button>
            </Link>
          )}

          {/* Mobile Menu Icon */}
          <button
            className="text-3xl text-rose-500 md:hidden focus:outline-none"
            onClick={() => setToggle(!toggle)}
          >
            <MdOutlineMenu />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {toggle && (
        <div className="md:hidden absolute w-44 right-2 p-4 bg-white/80 backdrop-blur-md rounded-md shadow-lg mt-2 z-30 border border-rose-100">
          <ul className="flex flex-col gap-4 text-lg font-medium ">
            {["/", "/biodatas", "/about", "/contact"].map((link, index) => (
              <NavLink
                key={index}
                to={link}
                onClick={() => setToggle(false)}
                className={({ isActive }) =>
                  `
                  relative px-1 capitalize
                  transition-all duration-300
                  after:content-[''] after:absolute after:left-0 after:-bottom-[2px]
                  after:h-[2px] after:w-0 after:bg-rose-500 after:transition-all after:duration-500 after:ease-in-out
                  ${
                    isActive
                      ? "text-rose-500 after:w-full"
                      : "text-black hover:text-rose-500 hover:after:w-full"
                  }
                  `
                }
              >
                {link === "/"
                  ? "Home"
                  : link.slice(1).replace(/([A-Z])/g, " $1")}
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyNavbar;
