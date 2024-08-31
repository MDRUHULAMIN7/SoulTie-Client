
import { Outlet } from "react-router-dom";
import MyNavbar from "../../Components/Shareds/Navbar/MyNavbar";
import Footer from "../../Pages/Dashboard/Sidebar/Footer";







const Main = () => {
    return (
        <div className="mt-2 mx-1 bg-white">

            
          <MyNavbar></MyNavbar>
            <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default Main;