import { useState } from "react";
import logo from "../../../images/wedding-rings.png";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import UseAuth from "../../../Hooks/UseAuth";
import UserRole from "../../../Hooks/UserRole";
import { FaHouseChimney, FaUsersGear } from "react-icons/fa6";
import { BsPersonCircle } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
import { FaConnectdevelop, FaEdit, FaRegHeart } from "react-icons/fa";
import { MdViewList } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { LuFileHeart } from "react-icons/lu";
import img from "../../../images/nnnn.png";
import { IoMdLogOut } from "react-icons/io";

const Sidebar = () => {
  const { logout } = UseAuth();
  const [isActive, setActive] = useState(false);
  const [role] = UserRole();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gradient-to-r from-rose-100 to-rose-200 text-gray-800 flex justify-between xl:hidden shadow-md">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link
              className="flex justify-center gap-2 items-center mx-auto"
              to="/"
            >
              <img src={logo} alt="logo" className="h-10 w-10" />
              <span className="text-2xl text-rose-600 font-bold">SoulTie</span>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-rose-200 rounded-lg mr-2"
        >
          <AiOutlineBars className="h-6 w-6 text-rose-600" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 xl:fixed flex flex-col justify-between overflow-x-hidden custom-scrollbar bg-gradient-to-b from-rose-50 to-white w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } xl:translate-x-0 transition duration-200 ease-in-out shadow-xl border-r-2 border-rose-200`}
      >
        <div>
          {/* Logo */}
          <div>
            <div className="w-full hidden xl:flex px-4 py-3 shadow-lg rounded-xl justify-center items-centermx-auto border border-rose-300">
              <Link
                className="flex justify-center gap-2 items-center mx-auto"
                to="/"
              >
                <img src={logo} alt="logo" className="h-10 w-10" />
                <span className="text-3xl text-rose-600 font-bold">
                  SoulTie
                </span>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col justify-between flex-1 mt-8">
            <nav className="text-base flex flex-col space-y-2 mx-auto">
              {/* Profile Link */}
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
                  <BsPersonCircle className="text-xl" />
                  <span className="font-medium">Admin Profile</span>
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
                  <BsPersonCircle className="text-xl" />
                  <span className="font-medium">My Profile</span>
                </NavLink>
              )}

              {/* Admin Routes */}
              {role?.roll === "admin" ? (
                <div className="flex flex-col space-y-2 mt-4">
                  <div className="px-4 py-2">
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                      Admin Panel
                    </span>
                  </div>

                  <NavLink
                    to="/dashboard/adminhome"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg shadow-md transform transition-all duration-200"
                        : "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-all duration-200"
                    }
                  >
                    <FaHouseChimney className="text-xl" />
                    <span className="font-medium">Admin Home</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/manageusers"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg shadow-md transform transition-all duration-200"
                        : "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-all duration-200"
                    }
                  >
                    <FaUsersGear className="text-xl" />
                    <span className="font-medium">Manage Users</span>
                  </NavLink>

                 

                  <NavLink
                    to="/dashboard/approvedcontactrequest"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg shadow-md transform transition-all duration-200"
                        : "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-all duration-200"
                    }
                  >
                    <FaConnectdevelop className="text-xl" />
                    <span className="font-medium">Contact Requests</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/successstory"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg shadow-md transform transition-all duration-200"
                        : "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-all duration-200"
                    }
                  >
                    <FaRegHeart className="text-xl" />
                    <span className="font-medium">Success Stories</span>
                  </NavLink>
                </div>
              ) : (
                // Normal User Routes
                <div className="flex flex-col space-y-2 mt-4">
                  <div className="px-4 py-2">
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                      My Dashboard
                    </span>
                  </div>

                  <NavLink
                    to="/dashboard/editbiodata"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg shadow-md transform transition-all duration-200"
                        : "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-all duration-200"
                    }
                  >
                    <FaEdit className="text-xl" />
                    <span className="font-medium">Edit Biodata</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/viewbiodata"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg shadow-md transform transition-all duration-200"
                        : "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-all duration-200"
                    }
                  >
                    <MdViewList className="text-xl" />
                    <span className="font-medium">View Biodata</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/mycontactrequest"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg shadow-md transform transition-all duration-200"
                        : "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-all duration-200"
                    }
                  >
                    <BiSolidContact className="text-xl" />
                    <span className="font-medium">Contact Requests</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/favouritebiodata"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg shadow-md transform transition-all duration-200"
                        : "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-all duration-200"
                    }
                  >
                    <LuFileHeart className="text-xl" />
                    <span className="font-medium">Favourite Biodatas</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/gotmarried"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg shadow-md transform transition-all duration-200"
                        : "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-all duration-200"
                    }
                  >
                    <img className="h-6 w-6" src={img} alt="married" />
                    <span className="font-medium">Got Married</span>
                  </NavLink>
                </div>
              )}
            </nav>
          </div>
        </div>

        {/* Logout Section */}
        <div>
          <hr className="border-rose-200 mb-4" />
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-4 py-3 text-gray-700 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-all duration-200 font-medium"
          >
            <IoMdLogOut className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
