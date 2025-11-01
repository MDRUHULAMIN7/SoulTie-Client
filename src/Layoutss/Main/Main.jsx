
import { Outlet } from "react-router-dom";
import MyNavbar from "../../Components/Shareds/Navbar/MyNavbar";
import Footer from "../../Pages/Dashboard/Sidebar/Footer";







const Main = () => {
    return (
        <div className=" bg-white max-w-[2000px] mx-auto">

            
          <MyNavbar></MyNavbar>
         <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default Main;