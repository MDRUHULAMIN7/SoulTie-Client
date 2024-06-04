
import logo from '../../../images/wedding-rings.png'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
 Bars2Icon,
} from "@heroicons/react/24/solid";
import { Link, NavLink } from "react-router-dom";

import UseAuth from "../../../Hooks/UseAuth";
import React from 'react';
 
// profile menu component

 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 


 const {user,logout} =UseAuth()

 const handleLogout=()=>{
  logout()
  .then(res=>{
    console.log(res);
  })
  .then(err=>{
    console.log(err);
  })
 }
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
    {user ?   <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="image"
            className=" w-12 h-12 ml-2 rounded-full border-2 border-lime-300  p-0.5"
            src={user?.photoURL}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler> : ''}
      <MenuList className="px-10 py-4 flex-col">
     <div className=" flex-col justify-center items-center">
     <NavLink className={({isActive,isPending})=>
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-red' } to={"/dashboard"}>Dashboard</NavLink> <br />

        <button onClick={handleLogout} className="px-3 py-2 text xl text-black ">Logout</button>
     </div>
      </MenuList>
      {user ? <button onClick={handleLogout} className="px-3 py-2 text xl text-black ">Logout</button> : <Link to={'/login'}>
      <button className="px-3 py-2 text xl text-black ">SignIn</button></Link>}
    </Menu>
  );
}
 
 
function NavList() {
  return (
    <ul className="mt-2 mb-4  gap-2 lg:space-x-14 flex lg:mr-10 items-start flex-col lg:mb-0 lg:mt-0  justify-center text-xl lg:flex-row lg:items-center">
     
     
     <NavLink className={({isActive,isPending})=>
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-black' } to={"/"}>Home</NavLink>
     
     <NavLink className={({isActive,isPending})=>
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-black' } to={"/biodatas"}>Biodatas</NavLink>
     <NavLink className={({isActive,isPending})=>
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-black' } to={"/aboutus"}>About Us</NavLink>
     <NavLink className={({isActive,isPending})=>
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-black' } to={"/contactus"}>Contact Us</NavLink>
          
    </ul>
  );
}
 
export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-full p-2 bg-slate-200 border-none rounded-none lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer lg:text-3xl py-1.5 font-semibold"
        >
         <div className=" flex items-center text-black gap-2"> <img className="h-10" src={logo} alt="" /> SoulTie</div>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
 
     
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}