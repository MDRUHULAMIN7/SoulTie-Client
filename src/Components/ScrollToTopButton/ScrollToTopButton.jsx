import  { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';


const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-rose-600 text-white p-3 rounded-full shadow-lg hover:bg-teal-700 transition-colors duration-300"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="text-xl" />
      </button>
    )
  );
};

export default ScrollToTopButton;
