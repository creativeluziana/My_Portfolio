import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Handle navigation scroll behavior
  useEffect(() => {
    if (location.hash === '#contact-me-section') {
      const scrollToContact = () => {
        const el = document.getElementById('contact-me-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };
      // Wait a tick to ensure Home and section are rendered
      setTimeout(scrollToContact, 100);
    } else {
      scrollToTop();
    }
  }, [location]);

  return (
    <>
      {/* Mobile Hamburger Icon */}
      <div className="lg:hidden fixed top-6 right-6 z-50">
        <button
          onClick={toggleMenu}
          className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-opacity-30 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Desktop Navbar - Hidden on Mobile */}
      <nav className="hidden lg:block fixed bottom-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-4">
          {/* Segmented Navigation Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-full p-1 shadow-lg">
              <div className="flex">
                {/* Home Section */}
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="flex-1 text-center py-2 px-4 rounded-full text-gray-800 font-semibold hover:bg-purple-100 transition-all duration-300 text-sm"
                >
                  Home
                </Link>

                {/* About Me Section */}
                <Link
                  to="/about"
                  onClick={scrollToTop}
                  className="flex-1 text-center py-2 px-4 rounded-full text-gray-800 font-semibold hover:bg-purple-100 transition-all duration-300 text-sm"
                >
                  About Me
                </Link>

                {/* My Projects Section */}
                <Link
                  to="/projects"
                  onClick={scrollToTop}
                  className="flex-1 text-center py-2 px-4 rounded-full text-gray-800 font-semibold hover:bg-purple-100 transition-all duration-300 text-sm"
                >
                  My Projects
                </Link>

                {/* Contact Me Button */}
                <Link
                  to="/#contact-me-section"
                  className="flex-1 text-center py-2 px-4 rounded-full text-gray-800 font-semibold hover:bg-purple-100 transition-all duration-300 text-sm"
                >
                  Contact Me
                </Link>

                {/* View Resume Button */}
                <a
                  href="/Luziana_Dmello_1022135_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-black text-white py-2 px-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-1 text-sm"
                >
                  <span>View Resume</span>
                  <span>📄</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sliding Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white bg-opacity-95 backdrop-blur-md z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-6 right-6 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Sidebar Content */}
        <div className="pt-20 px-8">
          <div className="space-y-8">
            {/* Navigation Links */}
            <div className="space-y-4">
              <Link
                to="/"
                onClick={() => {
                  toggleMenu();
                  scrollToTop();
                }}
                className="block text-2xl font-semibold text-gray-800 hover:text-purple-600 transition-colors"
              >
                HOME
              </Link>
              <Link
                to="/about"
                onClick={() => {
                  toggleMenu();
                  scrollToTop();
                }}
                className="block text-2xl font-semibold text-gray-800 hover:text-purple-600 transition-colors"
              >
                ABOUT ME
              </Link>
              <Link
                to="/projects"
                onClick={() => {
                  toggleMenu();
                  scrollToTop();
                }}
                className="block text-2xl font-semibold text-gray-800 hover:text-purple-600 transition-colors"
              >
                PROJECTS
              </Link>
              <Link
                to="/experiences"
                onClick={() => {
                  toggleMenu();
                  scrollToTop();
                }}
                className="block text-2xl font-semibold text-gray-800 hover:text-purple-600 transition-colors"
              >
                EXPERIENCES
              </Link>
              <Link
                to="/#contact-me-section"
                onClick={() => {
                  toggleMenu();
                }}
                className="block text-2xl font-semibold text-gray-800 hover:text-purple-600 transition-colors"
              >
                CONTACT
              </Link>
            </div>

            {/* Hobby Links */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-4">HOBBIES</h3>
              <div className="space-y-3">
                <Link
                  to="/painting"
                  onClick={() => {
                    toggleMenu();
                    scrollToTop();
                  }}
                  className="block text-lg text-gray-700 hover:text-purple-600 transition-colors"
                >
                  PAINTING
                </Link>
                <Link
                  to="/calligraphy"
                  onClick={() => {
                    toggleMenu();
                    scrollToTop();
                  }}
                  className="block text-lg text-gray-700 hover:text-purple-600 transition-colors"
                >
                  CALLIGRAPHY
                </Link>
                <Link
                  to="/coding"
                  onClick={() => {
                    toggleMenu();
                    scrollToTop();
                  }}
                  className="block text-lg text-gray-700 hover:text-purple-600 transition-colors"
                >
                  CODING
                </Link>
                <Link
                  to="/knitting"
                  onClick={() => {
                    toggleMenu();
                    scrollToTop();
                  }}
                  className="block text-lg text-gray-700 hover:text-purple-600 transition-colors"
                >
                  KNITTING
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default Navbar; 