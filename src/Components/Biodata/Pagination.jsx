import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pagination, currentPage, onPageChange }) => {
  if (pagination.totalPages <= 1) {
    return null;
  }

  return (
    <>
      <div className="mt-12 flex items-center justify-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!pagination.hasPrevPage}
          className={`p-2 rounded-lg border transition-all ${
            pagination.hasPrevPage
              ? 'border-rose-400 text-rose-500 hover:bg-rose-50'
              : 'border-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {[...Array(pagination.totalPages)].map((_, index) => {
          const page = index + 1;
          if (
            page === 1 ||
            page === pagination.totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                  page === currentPage
                    ? 'bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-md'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            );
          } else if (
            page === currentPage - 2 ||
            page === currentPage + 2
          ) {
            return <span key={page} className="text-gray-400">...</span>;
          }
          return null;
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!pagination.hasNextPage}
          className={`p-2 rounded-lg border transition-all ${
            pagination.hasNextPage
              ? 'border-rose-400 text-rose-500 hover:bg-rose-50'
              : 'border-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>


      <p className="text-center text-sm text-gray-500 mt-4">
        Page {currentPage} of {pagination.totalPages}
      </p>
    </>
  );
};

export default Pagination;