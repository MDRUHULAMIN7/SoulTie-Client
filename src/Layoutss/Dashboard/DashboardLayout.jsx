import { Outlet } from "react-router-dom";

import Sidebar from "../../Pages/Dashboard/Sidebar/Sidebar";


const DashboardLayout = () => {

 
    return (
        <div className='relative bg-white min-h-screen xl:flex'>
        {/* Sidebar */}
        <Sidebar />
  
        {/* Outlet --> Dynamic content */}
        <div className='flex-1 xl:ml-64'>
          <div className='p-2 lg:p-4 xl:p-4'>
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default DashboardLayout;