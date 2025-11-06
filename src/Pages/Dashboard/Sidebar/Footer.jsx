import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import img from "../../../images/wedding-rings.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  ];

  const supportLinks = [
    { label: "Contact us", href: "/contact" },
    { label: "Feedback", href: "/" },
    { label: "Testimonials", href: "/" },
    { label: "FAQs", href: "/" },
    { label: "Privacy Policy", href: "/" },
  ];

  const developerLinks = [
    { label: "Public API", href: "/" },
    { label: "Documentation", href: "/" },
    { label: "Guides", href: "/" },
    { label: "Support", href: "/" },
  ];

  return (
    <footer className="bg-gradient-to-b from-rose-50 to-rose-100 border-t border-rose-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
              <Link
					  to="/"
					  className="flex items-center gap-2 mb-3 text-4xl font-serif text-rose-500"
					>
					  <img className="h-14" src={img} alt="Logo" />
					  <span className="tracking-wide hover:scale-105 transition-all duration-300">
						SoulTie
					  </span>
					</Link>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Connecting hearts, building futures. Your journey to finding the perfect life partner starts here with trust and commitment.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700 hover:text-rose-600 transition-colors">
                <FiMapPin className="w-5 h-5 text-rose-500" />
                <span className="text-sm">3812 Lena Lane, Jackson, Mississippi</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 hover:text-rose-600 transition-colors">
                <FiMail className="w-5 h-5 text-rose-500" />
                <span className="text-sm">info@soultie.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 hover:text-rose-600 transition-colors">
                <FiPhone className="w-5 h-5 text-rose-500" />
                <span className="text-sm">+92 (8800) 68 - 8960</span>
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 relative inline-block">
              Help & Support
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-rose-400 to-rose-300"></div>
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-rose-300 rounded-full mr-3 group-hover:bg-rose-500 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 relative inline-block">
              Developers
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-rose-400 to-rose-300"></div>
            </h3>
            <ul className="space-y-3">
              {developerLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-rose-300 rounded-full mr-3 group-hover:bg-rose-500 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 relative inline-block">
              Stay Connected
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-rose-400 to-rose-300"></div>
            </h3>
            
            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-gray-600 mb-4 text-sm">Subscribe to get updates on new features</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg hover:from-rose-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 font-medium">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-gray-600 mb-4 text-sm">Follow us on social media</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white border border-rose-200 rounded-lg flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-rose-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <span>© {currentYear} SoulTie. All rights reserved.</span>
              <FaHeart className="w-4 h-4 text-rose-500" />
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link to="/terms" className="hover:text-rose-600 transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-rose-600 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="hover:text-rose-600 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

  
    </footer>
  );
};

export default Footer;