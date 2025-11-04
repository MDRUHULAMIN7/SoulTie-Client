import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import LoadingSpiner from "../../../Components/Shareds/LoadingSpiner";
import Heading from "../Sidebar/Heading";
import BookingModal from "./BookingModal";
import {
  FaStar,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const SeeSuccess = () => {
  const { loading } = UseAuth();
  const axiosPublic = UseAxiosPublic();

  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState("desc");

  const {
    data: storiesResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["success-stories", currentPage, itemsPerPage, sortOrder],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        sortOrder: sortOrder,
      });

      const res = await axiosPublic.get(`/success?${params}`);
      return res.data;
    },
  });

  const successStories = storiesResponse?.data || [];
  const pagination = storiesResponse?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalStories: 0,
    showing: 0,
  };

  // Handle modal
  const handleModal = (story) => {
    console.log(story);
    setModalData(story);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalData(null);
    setIsOpen(false);
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(
      pagination.totalPages,
      startPage + maxPagesToShow - 1
    );

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`${
          index < rating ? "text-yellow-400" : "text-gray-300"
        } inline-block`}
        size={16}
      />
    ));
  };

  if (loading || isLoading) {
    return <LoadingSpiner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Stories
          </h2>
          <p className="text-gray-600">
            Failed to load success stories. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Heading
        heading="Success Stories"
        subheading="Discover beautiful love stories from our platform"
      />

      {/* Debug Info  */}
      <div className="mb-4 p-4 bg-yellow-100 rounded-lg">
        <p className="text-sm text-yellow-800">
          Page {pagination.currentPage}, Showing {pagination.showing} of{" "}
          {pagination.totalStories} stories, Total Pages:{" "}
          {pagination.totalPages}
        </p>
      </div>

      {/*  Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-rose-100">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-rose-400 to-rose-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Self Biodata ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Partner Biodata ID
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Ratings
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {successStories?.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FaHeart className="text-rose-300 text-6xl mb-4" />
                      <p className="text-gray-500 text-lg">
                        No success stories found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                successStories?.map((story) => (
                  <tr
                    key={story._id}
                    className="hover:bg-rose-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                          <span className="text-rose-600 font-bold text-sm">
                            {story.SelfBiodata?.charAt(0) || "U"}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {story.SelfBiodata || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                          <span className="text-rose-600 font-bold text-sm">
                            {story.PartnerBiodata?.charAt(0) || "P"}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {story.PartnerBiodata || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <div className="flex items-center gap-1">
                          {renderStars(story.Ratings || 0)}
                          <span className="ml-2 text-sm text-gray-600">
                            ({story.Ratings || 0})
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            story.status === "married"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {story.status || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleModal(story)}
                          className="bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md flex items-center gap-2"
                        >
                          <FaHeart className="text-sm" />
                          View Story
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border border-rose-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-rose-600">
                {pagination.showing}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-rose-600">
                {pagination.totalStories}
              </span>{" "}
              stories
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-3 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-rose-500 text-white hover:bg-rose-600"
                }`}
              >
                <FaChevronLeft />
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1">
                {getPageNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageClick(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      currentPage === pageNum
                        ? "bg-rose-500 text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-rose-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === pagination.totalPages}
                className={`px-3 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  currentPage === pagination.totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-rose-500 text-white hover:bg-rose-600"
                }`}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <BookingModal isOpen={isOpen} closeModal={closeModal} user={modalData} />
    </div>
  );
};

export default SeeSuccess;
