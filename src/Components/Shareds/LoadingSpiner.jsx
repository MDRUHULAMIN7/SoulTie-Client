

const LoadingSpiner = () => {
    return (
        <div className="flex items-center justify-center space-x-2  h-screen">
            <h1 className="text-5xl text-rose-400">Loading ...</h1>
        <div className="w-12 h-12 rounded-full animate-pulse bg-rose-400"></div>
        <div className="w-12 h-12 rounded-full animate-pulse bg-rose-400"></div>
        <div className="w-12 h-12 rounded-full animate-pulse bg-rose-400"></div>
    </div>
    );
};

export default LoadingSpiner;