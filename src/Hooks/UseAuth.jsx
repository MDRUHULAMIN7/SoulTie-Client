import { useContext } from "react";
import {AuthContext} from "../Providers/AuthProviders"

const UseAuth = () => {
   const auth = useContext(AuthContext)
   return auth
};

export default UseAuth;