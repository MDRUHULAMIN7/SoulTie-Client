import { createBrowserRouter } from "react-router-dom";
import Main from "../Layoutss/Main/Main";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import DashboardLayout from "../Layoutss/Dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ApprovedPremium from "../Pages/Dashboard/Admin/ApprovedPremium";
import ApprovedContactRequest from "../Pages/Dashboard/Admin/ApprovedContactRequest";
import EditBiodata from "../Pages/Dashboard/Normal/EditBiodata";
import ViewBiodata from "../Pages/Dashboard/Normal/ViewBiodata";
import MyContactRequest from "../Pages/Dashboard/Normal/MyContactRequest";
import MyFavouriteBiodata from "../Pages/Dashboard/Normal/MyFavouriteBiodata";
import AdminRoute from "./AdminRoute";
import Biodatas from "../Pages/Biodatas/Biodatas";
import DetailBiodata from "../Pages/Biodatas/DetailBiodata";
import Payment from "../Pages/Dashboard/Payment/Payment";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
       children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'detailprofile/:id',
            element:<PrivateRoute><DetailBiodata></DetailBiodata></PrivateRoute>
        }
        ,
        {
            path:"biodatas",
            element:<Biodatas></Biodatas>

        },
        {
            path:'signup',
            element:<SignUp></SignUp>
        }
        ,{
            path:'login',
            element:<Login></Login>
        }

       ] 
    },
    {
        path:'dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            // admins routes

            {
                path:"/dashboard/adminhome",
                element:<PrivateRoute><AdminRoute><AdminHome></AdminHome></AdminRoute></PrivateRoute>
            },
          
            {
                path:'/dashboard/manageusers',
                element:<PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>
            },
            {
                path:'/dashboard/approvepremium',
                element:<PrivateRoute><AdminRoute><ApprovedPremium></ApprovedPremium></AdminRoute></PrivateRoute>
            },
            {
                path:'/dashboard/approvedcontactrequest',
                element:<PrivateRoute><AdminRoute><ApprovedContactRequest></ApprovedContactRequest></AdminRoute></PrivateRoute>
            },

            // normal users routes

            {
                path:'/dashboard/editbiodata',
                element:<PrivateRoute><EditBiodata></EditBiodata></PrivateRoute>
            },
            {
                path:"/dashboard/payment",
                element:<PrivateRoute><Payment></Payment></PrivateRoute>
            }
            ,
            {
                path:'/dashboard/viewbiodata',
                element:<PrivateRoute><ViewBiodata></ViewBiodata></PrivateRoute>
            },
            {
                path:'/dashboard/mycontactrequest',
                element:<PrivateRoute><MyContactRequest></MyContactRequest></PrivateRoute>
            },
            {
                path:'/dashboard/favouritebiodata',
                element:<PrivateRoute><MyFavouriteBiodata></MyFavouriteBiodata></PrivateRoute>
            },
        ]
    }
])