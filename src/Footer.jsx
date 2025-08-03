import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Footer() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  const scrollToTopSlow = () => {
    const scrollDuration = 1500;
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    let scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  return (
    <footer 
      className="bg-black text-white w-full block relative"
      style={{ 
        position: 'relative',
        zIndex: 1,
        marginTop: 'auto',
        clear: 'both'
      }}
    >
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Company Info Section */}
            <div className="space-y-6">
              <div>
                <h5 className="text-2xl font-bold text-white mb-4">Parkpuram</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your trusted parking solution platform. Find and book parking spaces easily across multiple cities.
                </p>
              </div>
              
              <nav aria-label="Footer navigation">
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium inline-flex items-center group"
                      onClick={scrollToTopSlow}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        Home
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Help"
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium inline-flex items-center group"
                      onClick={scrollToTopSlow}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        Help Center
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/TermsandServices"
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium inline-flex items-center group"
                      onClick={scrollToTopSlow}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        Terms of Service
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/About"
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium inline-flex items-center group"
                      onClick={scrollToTopSlow}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        About
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Registration Section */}
            <div className="space-y-6">
              <div>
                <h5 className="text-xl font-semibold text-white mb-4">
                  Register Your Parking Space
                </h5>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Contribute to our platform by sharing your available parking space. 
                  Help other drivers while earning from your unused space.
                </p>
              </div>
              
              <div>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScpuO0DkUJgNaqGH7pM_KmuEklpAe4c2cRNPMlX3CHouJzCbg/viewform?usp=sf_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button
                    type="button"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
                  >
                    Register Now
                  </button>
                </a>
              </div>

              {/* Contact Info */}
              <div className="pt-4">
                <h6 className="text-sm font-semibold text-white mb-2">Get in Touch</h6>
                <p className="text-gray-400 text-xs">
                  Questions? Contact our support team for assistance.
                </p>
              </div>
            </div>
          </div>

          {/* Divider and Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Parkpuram. All rights reserved.
                </p>
              </div>
              
              <div className="flex space-x-6">
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white text-xs transition-colors duration-200"
                  onClick={scrollToTopSlow}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/cookies"
                  className="text-gray-400 hover:text-white text-xs transition-colors duration-200"
                  onClick={scrollToTopSlow}
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;