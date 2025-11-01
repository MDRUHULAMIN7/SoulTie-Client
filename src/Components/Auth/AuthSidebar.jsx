import { Heart, User, ArrowRight, ArrowLeft } from "lucide-react";
import logo from '../../images/wedding-rings.png';
const AuthSidebar = ({ isLogin, onToggle }) => {
  return (
    <div className="bg-gradient-to-br from-rose-400 to-rose-600 p-8 text-white flex flex-col justify-center relative overflow-hidden h-full min-h-[600px]">

      <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full"></div>
      
      <div className="relative z-10 text-left">
  
        <div className="flex items-center gap-3 mb-6">
          <div className="">
            <img className="h-10" src={logo} alt="Logo" />
          </div>
          <h1 className="text-3xl font-bold">SoulTie</h1>
        </div>
        
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-4">
            {isLogin ? "Welcome Back!" : "Join SoulTie"}
          </h2>
          <p className="text-rose-100 text-lg">
            {isLogin 
              ? "Continue your journey to find your perfect match" 
              : "Begin your journey to find your perfect match"
            }
          </p>
        </div>

        {/* Desktop Toggle Button */}
        <div>
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            {isLogin ? (
              <>
                Create Account 
                <ArrowRight className="w-5 h-5 transition-transform duration-300" />
              </>
            ) : (
              <>
                <ArrowLeft className="w-5 h-5 transition-transform duration-300" />
                Sign In
              </>
            )}
          </button>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transform transition-all duration-300 hover:scale-105">
            <User className="w-6 h-6 mb-2" />
            <p className="text-sm font-medium">Verified Profiles</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transform transition-all duration-300 hover:scale-105">
            <Heart className="w-6 h-6 mb-2" />
            <p className="text-sm font-medium">Perfect Matches</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSidebar;