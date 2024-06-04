
import { Outlet } from "react-router-dom";
import { ComplexNavbar } from "../../Components/Shareds/Navbar/Navbar";





const Main = () => {
    return (
        <div className="mt-2 mx-1">

            <ComplexNavbar></ComplexNavbar>
            <Outlet></Outlet>
            <h1>by</h1>
            
        </div>
    );
};

export default Main;