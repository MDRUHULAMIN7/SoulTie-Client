import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Rating } from "@smastrom/react-rating";
import { Fragment } from "react";

const BookingModal = ({ closeModal, isOpen, user }) => {
  if (!user) {
    return null;
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Success Story
                </DialogTitle>
                <div className="w-96   rounded-md shadow-md bg-rose-50  text-gray-800">
                  <img
                    src={user?.Coupleimage}
                    alt=""
                    className="object-cover object-center w-full rounded-t-md h-96  dark:bg-gray-500"
                  />
                  <div className="flex flex-col justify-between p-6 ">
                    <div className="space-y-2">
                      <div className="flex justify-center   items-center">
                        <h1 className="text-xl text-rose-400">Rating</h1>{" "}
                        <Rating
                          className="text-center my-3 ml-2"
                          style={{ maxWidth: 150 }}
                          value={user.Ratings}
                        />
                      </div>
                    </div>
                    <p className="text-center">{user.shortStory}</p>

                    <button
                      onClick={closeModal}
                      className="px-3 py-2 rounded-md w-24 bg-rose-300 text-end "
                    >
                      Close
                    </button>
                  </div>
                </div>
                {/* checkout form */}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

BookingModal.propTypes = {
  bookingInfo: PropTypes.object,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BookingModal;
