import { Link, NavLink } from 'react-router-dom';
import logo from '../../../images/wedding-rings.png'
import UseAuth from '../../../Hooks/UseAuth';
import { useState } from 'react';



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

 const handletoggle=()=>{
    setToggle(!toggle)
 }

    return (
        <div>
            <div className="h-16 bg-red-500 flex justify-between items-center px-4 py-2">

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
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-black' } to={"/aboutus"}>About Us</NavLink>
     <NavLink className={({isActive,isPending})=>
        isPending ? 'text-black ' : isActive ? 'text-green-500  underline' :'text-black' } to={"/contactus"}>Contact Us</NavLink>
          
    </ul>
                </div>
                
                <div className='md:hidden items-end flex gap-2'>


                    <button onClick={handletoggle}>menu</button>
                    
                    
                </div>
               
                <div>
             
                {user ? <button onClick={handleLogout} className="px-3 py-2 text xl text-black ">Logout</button> : <Link to={'/login'}>
      <button className="px-3 py-2 text xl text-black ">SignIn</button></Link>}

                </div>

            </div>
            <div className={ !toggle ? "hidden ":"flex  pt-3 relative z-20"}>
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