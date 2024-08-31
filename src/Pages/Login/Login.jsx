import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import logo from '../../images/gogle.png';
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser, googleSigin } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const axiosPublic = UseAxiosPublic();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    
    signInUser(email, password)
      .then(result => {
        if (result) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          reset();
          navigate(from, { replace: true });
        }
      })
      .catch(err => {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Login Failed",
          text: err.message,
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

  const handleGoogle = () => {
    googleSigin()
      .then(result => {
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          roll: 'normal',
          role: 'normal'
        };
        axiosPublic.post('/users', userInfo)
          .then(res => {
            if (res.data) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Login Successfully",
                showConfirmButton: false,
                timer: 1500
              });
              reset();
              navigate(from, { replace: true });
            }
          });
      })
      .catch(err => {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Login Failed",
          text: err.message,
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

  return (
    <div className="flex flex-col max-w-screen-sm p-6 mx-auto mt-20 rounded-lg bg-white shadow-lg dark:bg-gray-800">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Sign In</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Sign in to access your account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block text-lg text-gray-800 dark:text-gray-100">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required", minLength: { value: 6, message: "Email must be at least 6 characters" } })}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-300"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-lg text-gray-800 dark:text-gray-100">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-300"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <button type="submit" className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400">Sign In</button>
      </form>
      <hr className="my-4 border-gray-300 dark:border-gray-600" />
      <button onClick={handleGoogle} className="w-full flex items-center justify-center py-2 text-xl text-gray-800 bg-white rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
        <img className="h-8 mr-2" src={logo} alt="Google" />
        <span>Login with Google</span>
      </button>
      <p className="mt-4 text-lg text-center text-gray-600 dark:text-gray-300">
        Do not have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
