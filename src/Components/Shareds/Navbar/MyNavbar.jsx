import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { MdOutlineMenu } from 'react-icons/md';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import UseAuth from '../../../Hooks/UseAuth';
import logo from '../../../images/wedding-rings.png';

const MyNavbar = () => {
  const { user, logout } = UseAuth();

  const handleLogout = () => {
    logout()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [toggle, setToggle] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="h-16 flex justify-between items-center px-4 py-2">
        {/* Logo and Title */}
        <div className="flex items-center gap-2 text-2xl font-serif text-rose-500">
          <img className="h-10" src={logo} alt="Logo" />
          SoulTie
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:block">
          <ul className="flex gap-6 items-center text-xl">
            {['/', '/biodatas', '/about', '/contact'].map((link, index) => (
              <NavLink
                key={index}
                to={link}
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-500 underline'
                    : 'text-black hover:text-rose-500'
                }
              >
                {link === '/' ? 'Home' : link.slice(1).replace(/([A-Z])/g, ' $1')}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* User Profile and Authentication */}
        <div className="flex items-center gap-4 relative">
          {user?.email ? (
            <div className="relative flex items-center">
              <button
                className="flex items-center text-2xl text-rose-500 focus:outline-none"
                onClick={handleToggleMenu}
              >
                <img
                  className="h-10 w-10 border-2 border-rose-300 rounded-full object-cover"
                  src={user?.photoURL}
                  alt="User Profile"
                />
                {toggleMenu ? <IoIosArrowDropdown className="ml-2" /> : <IoIosArrowDropup className="ml-2" />}
              </button>

              {toggleMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-rose-100 shadow-lg rounded-md z-30">
                  <ul className="py-2 text-center">
                    <NavLink
                      to="/dashboard"
                      className="block px-4 py-2 text-black hover:bg-rose-300"
                      onClick={() => setToggleMenu(false)}
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-black hover:bg-rose-300"
                    >
                      Logout
                    </button>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="px-3 py-2 text-xl text-rose-500 hover:bg-rose-100 rounded">
                Sign In
              </button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="text-3xl text-rose-500 md:hidden focus:outline-none"
            onClick={handleToggle}
          >
            <MdOutlineMenu />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {toggle && (
        <div className="md:hidden absolute w-44 right-2 p-4 bg-rose-100 rounded-md shadow-lg mt-2 z-30">
          <ul className="flex flex-col gap-4 text-xl">
            {['/', '/biodatas', '/about', '/contact'].map((link, index) => (
              <NavLink
                key={index}
                to={link}
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-500 underline'
                    : 'text-black hover:text-rose-500'
                }
              >
                {link === '/' ? 'Home' : link.slice(1).replace(/([A-Z])/g, ' $1')}
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyNavbar;
