
import { Outlet } from "react-router-dom";
import MyNavbar from "../../Components/Shareds/Navbar/MyNavbar";







const Main = () => {
    return (
        <div className="mt-2 mx-1">

            
          <MyNavbar></MyNavbar>
            <Outlet></Outlet>
            <h1>by</h1>
            
        </div>
    );
};

export default Main;