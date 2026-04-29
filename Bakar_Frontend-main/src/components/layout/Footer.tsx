import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';
import Logo from './Logo';
import { BUSINESS_INFO } from '@utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))] gap-10 items-start">
          {/* Brand Section */}
          <div>
            <div className="mb-4">
              <Logo variant="white" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Sydney's premier food delivery and catering service. Fresh,
              delicious meals delivered to your door.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/menu/daily"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Daily Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/menu/meals"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Meals Subscription
                </Link>
              </li>
              <li>
                <Link
                  to="/catering"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Special Catering
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">
                  {BUSINESS_INFO.address}
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={20} className="flex-shrink-0 mt-1" />
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={20} className="flex-shrink-0 mt-1" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Hours */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Business Hours</h4>
              <p className="text-gray-300 text-sm">
                Monday - Sunday
                <br />
                11:00 AM - 9:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-8 flex justify-center items-center">
          <p className="text-gray-300 text-sm text-center">
            © {currentYear} Bakar's Food & Catering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
