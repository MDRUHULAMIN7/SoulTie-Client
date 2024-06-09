import { useState } from 'react'
import logo from '../../../images/wedding-rings.png'
import { Link, NavLink } from 'react-router-dom'

import { AiOutlineBars } from 'react-icons/ai'
import { GrLogout } from 'react-icons/gr'
import UseAuth from '../../../Hooks/UseAuth'
import UserRole from '../../../Hooks/UserRole'
import { FaHouseChimney, FaUsersGear } from 'react-icons/fa6'
import { BsPersonCircle } from 'react-icons/bs'
import { FcApproval } from 'react-icons/fc'
import { FaConnectdevelop, FaEdit, FaRegHeart } from 'react-icons/fa'
import {  MdViewList } from 'react-icons/md'
import { BiSolidContact } from 'react-icons/bi'
import { LuFileHeart } from 'react-icons/lu'
import img from "../../../images/nnnn.png"

const Sidebar = () => {
  const { logout } = UseAuth()
  const [isActive, setActive] = useState(false)
  const [role]=UserRole()
console.log(role);
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-rose-50 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link className='flex justify-center gap-2 items-center mx-auto' to='/'>
              <img
                // className='hidden md:block'
                src={logo}
                alt='logo'
                width='100'
                className='h-10 w-10'
                height='100'
              /> <span className='text-2xl text-black'>SoulTie</span>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-rose-50'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-rose-50 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-slate-200 mx-auto'>
              <Link className='flex justify-center gap-2 items-center mx-auto' to='/'>
              <img
                // className='hidden md:block'
                src={logo}
                alt='logo'
                width='100'
                className='h-10 w-10'
                height='100'
              /> <span className='text-3xl text-black'>SoulTie</span>
              </Link>
            </div>
          </div>

         
          <div className='flex flex-col justify-between flex-1 mt-6'>
         
            <nav className='text-xl flex-col space-y-4 mx-auto'>

                {/* dashboard routes */}
            
            <NavLink className={({isActive,isPending})=>
            isPending ? 'text-black hover:bg-slate-200 ' : isActive ? 'text-rose-300  underline' :'text-black hover:bg-slate-200' } to={"/dashboard"}> <p className='flex items-center gap-2'><span><BsPersonCircle></BsPersonCircle></span> <span>Profile</span></p> </NavLink>
        { role[0] === "admin" ?
           <div className='flex flex-col space-y-2'> 
             {/*admin routes  */}
            
             <NavLink className={({isActive,isPending})=>
            isPending ? 'text-black hover:bg-slate-200 ' : isActive ? 'text-green-500  underline' :'text-black hover:bg-slate-200' } to={"/dashboard/adminhome"}> <p className='flex items-center gap-2'><span><FaHouseChimney></FaHouseChimney></span> <span>Admin Home</span></p> </NavLink>

      <NavLink className={({isActive,isPending})=>
            isPending ? 'text-black hover:bg-slate-200 ' : isActive ? 'text-green-500  underline' :'text-black hover:bg-slate-200' } to={"/dashboard/manageusers"}> <p className='flex items-center gap-2'><span><FaUsersGear></FaUsersGear></span> <span>Manage Users</span></p> </NavLink>

      <NavLink className={({isActive,isPending})=>
            isPending ? 'text-black hover:bg-slate-200 ' : isActive ? 'text-green-500  underline' :'text-black hover:bg-slate-200' } to={"/dashboard/approvepremium"}> <p className='flex items-center gap-2'><span><FcApproval></FcApproval></span> <span>Approved Premium</span></p> </NavLink>

      <NavLink className={({isActive,isPending})=>
            isPending ? 'text-black hover:bg-slate-200 mt-2' : isActive ? 'text-green-500 mt-2  underline' :  'mt-2 text-black hover:bg-slate-200' } to={"/dashboard/approvedcontactrequest"}> <p className='flex items-center gap-2'><span><FaConnectdevelop></FaConnectdevelop></span> <span className='flex flex-col items-center'><span>Approved</span> <span>ContactRequest</span>
      </span></p> </NavLink>

      <NavLink className={({isActive,isPending})=>
            isPending ? 'text-black hover:bg-slate-200 mt-2' : isActive ? 'text-green-500 mt-2  underline' :  'mt-2 text-black hover:bg-slate-200' } to={"/dashboard/successstory"}> <p className='flex items-center gap-2'><span><FaRegHeart /></span> <span>SuccessStory</span>
     </p> </NavLink>
            
            
             </div> :

        //    normal users routes
            <div className='flex flex-col space-y-3'>
                  <NavLink className={({isActive,isPending})=>
            isPending ? 'text-black hover:bg-slate-200 ' : isActive ? 'text-green-500  underline' :'text-black hover:bg-slate-200' } to={"/dashboard/editbiodata"}> <p className='flex items-center gap-2'><span><FaEdit></FaEdit></span> <span>Edit Biodata</span></p> </NavLink>
                  <NavLink className={({isActive,isPending})=>
            isPending ? 'text-black hover:bg-slate-200 ' : isActive ? 'text-green-500  underline' :'text-black hover:bg-slate-200' } to={"/dashboard/viewbiodata"}> <p className='flex items-center gap-2'><span><MdViewList></MdViewList></span> <span>View Biodata</span></p> </NavLink>
                  <NavLink className={({isActive,isPending})=>
            isPending ? 'text-black hover:bg-slate-200 ' : isActive ? 'text-green-500  underline' :'text-black hover:bg-slate-200' } to={"/dashboard/mycontactrequest"}> <p className='flex items-center gap-2'><span><BiSolidContact></BiSolidContact></span> <span>My ContactRequest</span></p> </NavLink>
                  <NavLink className={({isActive,isPending})=>
            isPending ? 'text-black hover:bg-slate-200 ' : isActive ? 'text-green-500  underline' :'text-black hover:bg-slate-200' } to={"/dashboard/favouritebiodata"}> <p className='flex items-center gap-2'><span><LuFileHeart></LuFileHeart></span> <span>Favourites Biodata</span></p> </NavLink>
                  <NavLink className={({isActive,isPending})=>
            isPending ? 'text-black hover:bg-slate-200 ' : isActive ? 'text-green-500  underline' :'text-black hover:bg-slate-200' } to={"/dashboard/gotmarried"}> <p className='flex items-center gap-2'><span><img className='h-10' src={img} alt="" /></span> <span>Got Married</span></p> </NavLink>
                </div>
        }
          
             
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
         

          <button
            onClick={logout}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-rose-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar