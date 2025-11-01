import { Heart, Users, Sparkles } from "lucide-react";

const Carousel = () => {
  return (
    <div className="relative">
      <section
        className="relative h-screen w-full bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dpomtzref/image/upload/v1725112319/chuttersnap-iQVn40PdwW0-unsplash_wqjdxk.jpg')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
      
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

     
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl">
         
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-rose-500/20 backdrop-blur-sm border border-rose-400/30 rounded-full mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-rose-300" />
              <span className="text-rose-200 text-xs sm:text-sm font-medium">
                Bangladesh's Most Trusted Matrimony
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Find Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-rose-400 to-rose-500 mt-1 sm:mt-2">
                SoulTie
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed mb-6 sm:mb-8 max-w-2xl">
              Where hearts meet and destinies unite. Connect with compatible
              partners who share your values, dreams, and vision for a beautiful
              future together.
            </p>

        
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-10">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />
                <span className="text-white text-sm sm:text-base font-semibold">
                  50,000+ Members
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />
                <span className="text-white text-sm sm:text-base font-semibold">
                  10,000+ Success Stories
                </span>
              </div>
            </div>

        
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="/biodatas"
                className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-rose-400 to-rose-500 text-white text-sm sm:text-base font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/50 hover:scale-105 text-center"
              >
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              <a
                href="/dashboard/editbiodata"
                className="group px-6 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-sm text-white text-sm sm:text-base font-semibold rounded-lg border-2 border-rose-400/50 transition-all duration-300 hover:bg-gradient-to-r hover:from-rose-400 hover:to-rose-500 hover:border-rose-500 hover:scale-105 text-center"
              >
                Create Your Profile
              </a>
            </div>

            <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-300">
              ✓ 100% Verified Profiles • ✓ Secure & Private • ✓ Free
              Registration
            </p>
          </div>
        </div>

     
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-rose-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-10 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 bg-rose-400/10 rounded-full blur-2xl"></div>
      </section>
    </div>
  );
};

export default Carousel;
