
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../../images/Login.jpg";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import logo from '../../images/gogle.png'
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import toast from "react-hot-toast";


const Login = () => {
   const{signInUser,googleSigin}=UseAuth()
   const navigate = useNavigate()
   const location = useLocation()
   let from = location.state?.from?.pathname || '/';
   const axiosPublic = UseAxiosPublic()
    const {reset,
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = async (data) => {
        
    
        
        const email = data.email;
        const password = data.password;
        console.log(email, password);
        signInUser(email,password)
        .then(result=>{
          if(result){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Login Successfully",
              showConfirmButton: false,
              timer: 1500
            });
            reset()
            navigate (from, {replace:true})
          }
            console.log(result);


      
        })
     
       
     
        
    
        
    
      };

      const handleGoogle=()=>{
        googleSigin()
        .then(result=>{
            console.log(result);

            const userInfo={
              name:result.user?.displayName,
              email:result.user?.email,
              roll:'normal',
              role:'normal'
            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
              if(res.data.insertedId){
                Swal.fire({
                  position: "top-centre",
                  icon: "success",
                  title: "Login Successfully",
                  showConfirmButton: false,
                  timer: 1500
                });
             
              }
              reset()
              navigate (from, {replace:true})
            })

    
        })
        .then(err=>{
            console.log(err);
            toast.error(err.message)
        })
      }
    return (
        <div
      className="flex mt-10 text-white flex-col max-w-screen-sm p-6 rounded-md sm:p-10 bg-cover bg-no-repeat mx-auto  dark:text-gray-800"
      style={{
        backgroundImage: `url(${login})`,
      }}
    >
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign In</h1>
        <p className=" dark:text-black text-lg">
          Sign in to access your account
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate=""
        action=""
        className="space-y-6"
      >
     
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block text-black text-lg">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="username"
            required
            {...register("email", { required: true, minLength: 6 })}
            placeholder="email"
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
          />
          {errors.email && (
            <span className="text-red-600  bg-slate-200 p-2">
              Email is required
            </span>
          )}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-black text-lg">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            {...register("password", {
              required: true,
             
            })}
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
          />
          {errors.password?.tupe === "required" && (
            <span className="text-red-600  bg-slate-200 p-2">
              Password is required
            </span>
          )}
         
        
        </div>

        <input
          className="block  mb-2 w-full p-3 text-center disabled:bg-black text-lg rounded-sm text-gray-50 bg-violet-600"
          type="submit"
          value="Sign in"
        />
      </form> 
      <hr />

      <button onClick={handleGoogle} className="w-full flex justify-center items-center bg-white mt-4 text-xl py-2 rounded-lg mx-auto text-center text-black">
        <span> <img className="h-8 mr-2" src={logo} alt="" /></span> <span>Login With Google</span>
      </button>
      <p className="px-6 text-lg text-center dark:text-black ">
       Do Not have an account ?
        <Link
          to={"/signup"}
          rel="noopener noreferrer"
          href="#"
          className="hover:underline text-black"
        >
         Signup
        </Link>
        
      </p>
    </div>
    );
};

export default Login;