

const LoadingSpiner = () => {
    return (
        <div className="flex items-center justify-center space-x-2  h-screen">
     
        <div className="w-12 h-12 rounded-full animate-pulse bg-rose-400"></div>
        <div className="w-12 h-12 rounded-full animate-pulse bg-rose-400"></div>
        <div className="w-12 h-12 rounded-full animate-pulse bg-rose-400"></div>
    </div>
    );
};

export default LoadingSpiner;