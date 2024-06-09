import { Link, NavLink } from 'react-router-dom';
import logo from '../../../images/wedding-rings.png'
import UseAuth from '../../../Hooks/UseAuth';
import { useState } from 'react';
import { MdOutlineMenu } from 'react-icons/md';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';



const MyNavbar = () => {

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
 const[toggle,setToggle]=useState(false)
 const[toggleMenu,setToggleMenu]=useState(false)

 const handletoggle=()=>{
    setToggle(!toggle)
 }
 const handleToggleMenu=()=>{
   setToggleMenu(!toggleMenu)
 }

    return (
        <div className=' bg-rose-100'>

         
            <div className="h-16   flex justify-between items-center px-4 py-2">

                <div className=''>
                <div className=" flex items-center text-2xl font-serif text-black gap-2"> <img className="h-10" src={logo} alt="" /> SoulTie</div>
                </div>
                <div className='hidden md:block'>
                <ul className="mt-2 mb-4  md:gap-4 lg:space-x-14 flex lg:mr-10 items-start flex-col lg:mb-0 lg:mt-0  justify-center text-xl md:flex-row lg:items-center">
     
     
     <NavLink className={({isActive,isPending})=>
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-black' } to={"/"}>Home</NavLink>
     
     <NavLink className={({isActive,isPending})=>
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-black' } to={"/biodatas"}>Biodatas</NavLink>
     <NavLink className={({isActive,isPending})=>
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-black' } to={"/"}>About Us</NavLink>
     <NavLink className={({isActive,isPending})=>
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-black' } to={"/"}>Contact Us</NavLink>
          
    </ul>
                </div>
                
           
               
                <div className='flex items-center'>
                <div className='md:hidden items-end flex gap-2'>


<button className='text-3xl mr-4' onClick={handletoggle}><MdOutlineMenu></MdOutlineMenu></button>


</div>
                {user?.email ? <div className='flex items-center'>  <button className='flex items-center text-2xl text-rose-400' onClick={handleToggleMenu}> <img 
               onClick={handleToggleMenu} className='h-12 w-12  border-2 border-rose-100 rounded-full' src={user?.photoURL} alt="" /> {!toggleMenu ? <IoIosArrowDropup  />: <IoIosArrowDropdown />}  </button> <button onClick={handleLogout} className="  text 2xl text-black mx-3 p-3 text-xl">Logout</button>

<div className={ !toggleMenu ? "hidden absolute  w-44":"flex top-20 mr-10 rounded-md right-4 p-4 w-44 bg-rose-100   pt-3 absolute z-20"}>
            <ul className="mt-2 mb-4 lg:mr-10 items-start flex-col lg:mb-0 lg:mt-0  justify-center text-xl md:flex-row lg:items-center">
     
     
     <NavLink className={({isActive,isPending})=>
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-black' } to={"/dashboard"}>Dashboard</NavLink>
     
     <button onClick={handleLogout} className="  text 2xl text-black p-3 text-xl">Logout</button>
          
    </ul>
                </div>
               
               </div>  : <Link to={'/login'}>
      <button className="px-3 py-2 text xl text-black ">SignIn</button></Link>}

                </div>

            </div>
            <div className={ !toggle ? "hidden md:hidden absolute w-44":"flex  md:hidden left-2 p-4 bg-rose-100 w-44 rounded-md pt-3 absolute z-20"}>
            <ul className="mt-2 mb-4  md:gap-4 lg:space-x-14 flex lg:mr-10 items-start flex-col lg:mb-0 lg:mt-0  justify-center text-xl md:flex-row lg:items-center">
     
     
     <NavLink className={({isActive,isPending})=>
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-black' } to={"/"}>Home</NavLink>
     
     <NavLink className={({isActive,isPending})=>
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-black' } to={"/biodatas"}>Biodatas</NavLink>
     <NavLink className={({isActive,isPending})=>
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-black' } to={"/aboutus"}>About Us</NavLink>
     <NavLink className={({isActive,isPending})=>
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-black' } to={"/contactus"}>Contact Us</NavLink>
          
    </ul>
                </div>
           
        </div>
    );
};

export default MyNavbar;