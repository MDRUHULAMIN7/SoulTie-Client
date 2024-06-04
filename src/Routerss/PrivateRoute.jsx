import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import LoadingSpiner from "../Components/Shareds/LoadingSpiner";



const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user,loading} = UseAuth()
    if(loading) { 
        return ( <LoadingSpiner> </LoadingSpiner>
    )
    }

    if(user){
        return children;
    }
    return (
        <Navigate to={'/login'} state={{from:location}}
        replace></Navigate>
    );
};

export default PrivateRoute;