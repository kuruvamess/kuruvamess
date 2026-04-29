import Link from 'next/link';
import { Phone, MapPin, Clock, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">Kuruva Mess House</h3>
            <p className="text-gray-300 mb-4">
              Authentic Kerala cuisine served with love near the scenic Kuruva Island. 
              Experience traditional flavors that have been delighting customers for years.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="text-gray-300 hover:text-white transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-gray-300 hover:text-white transition-colors">
                  Order Online
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  Near Kuruva Island,<br />
                  Kerala, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-secondary mr-2" />
                <div className="text-gray-300">
                  <a href="tel:9846880933" className="hover:text-white transition-colors">
                    9846880933
                  </a>
                  <br />
                  <a href="tel:8075387332" className="hover:text-white transition-colors">
                    8075387332
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-secondary mr-2" />
                <a 
                  href="mailto:kuruvamesshouse@gmail.com" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  kuruvamesshouse@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Operating Hours</h4>
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-1" />
              <div className="text-gray-300">
                <p className="font-medium">Open 7 Days a Week</p>
                <p>5:00 AM - 10:00 PM</p>
                <p className="mt-2 text-sm">
                  Delivery available within 20km radius<br />
                  Minimum order: ₹2000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Kuruva Mess House. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
