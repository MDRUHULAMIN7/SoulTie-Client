

const LoadingSpiner = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-rose-50">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-rose-500"></div>
      </div>
    );
};

export default LoadingSpiner;