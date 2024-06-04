import { Navigate, useLocation,  } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import UserRole from "../Hooks/UserRole";
import LoadingSpiner from "../Components/Shareds/LoadingSpiner";


const AdminRoute = ({children}) => {

    const [role,isLoading]=UserRole()

    const{user,loading}=UseAuth();
    const location = useLocation();
    
if( loading || isLoading) {
    return <LoadingSpiner></LoadingSpiner>;
}
if(user && role[0]=='admin') return children;

return (
    <Navigate to={'/login'} state={{from:location}} replace></Navigate>
)
};

export default AdminRoute;