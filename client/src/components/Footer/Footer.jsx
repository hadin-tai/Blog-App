import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 border-t border-gray-700 py-10">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Copyright */}
          <div className="flex flex-col justify-between">
            <div className="mb-4">
              <Logo width="120px" />
            </div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} All rights reserved by DevUI.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Account
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legals */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
