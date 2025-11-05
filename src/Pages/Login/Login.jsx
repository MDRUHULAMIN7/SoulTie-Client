import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import UseAuth from "../../Hooks/UseAuth";
import { useState } from "react";
import logo from '../../images/gogle.png';
import Swal from "sweetalert2";

const Login = ({ navigate, from, axiosPublic }) => {
  const { signInUser, googleSigin } = UseAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { email, password } = data;
    
    try {
      await signInUser(email, password);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Welcome Back to SoulTie!",
        showConfirmButton: false,
        timer: 1500,
        background: '#fdf2f8',
        color: '#be185d'
      });
      reset();
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password",
        showConfirmButton: false,
        timer: 1500,
        background: '#fdf2f8',
        color: '#be185d'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = () => {
    googleSigin()
      .then(result => {
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          roll: 'user',
          type: 'normal',
          photo: result.user?.photoURL,
          createdAt: new Date()
        };
        axiosPublic.post('/users', userInfo)
          .then(res => {
            if (res.data) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Welcome to SoulTie!",
                showConfirmButton: false,
                timer: 1500,
                background: '#fdf2f8',
                color: '#be185d'
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
          timer: 1500,
          background: '#fdf2f8',
          color: '#be185d'
        });
      });
  };

  return (
    <div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <label>
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400 w-5 h-5" />
            <input
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              placeholder="Enter your email"
              className="custom-input"
            />
          </div>
          {errors.email && (
            <p className="text-rose-500 text-sm font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password  */}
        <div className="space-y-2">
          <label >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              placeholder="Enter your password"
              className="custom-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rose-400 hover:text-rose-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-rose-500 text-sm font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing In...
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">Or continue with</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Google */}
      <button 
        onClick={handleGoogle}
        className="w-full flex items-center justify-center gap-3 py-3 px-6 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-0.5"
      >
        <img className="h-6" src={logo} alt="Google" />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button>
    </div>
  );
};

export default Login;