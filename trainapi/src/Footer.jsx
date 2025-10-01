import React from "react";
import "./App.css"

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About */}
        <div>
          <h3 className="font-bold text-lg mb-2">About Travel Website</h3>
          <p className="text-sm text-gray-200">
            Explore the best tourist destinations and hotels across India.
            Plan your next trip with ease!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <ul className="text-sm text-gray-200 space-y-1">
            <li>
              <a href="/tourist" className="hover:underline">
                Tourist Cities
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <p className="text-sm text-gray-200">Email: ******</p>
          <p className="text-sm text-gray-200">Phone: *********</p>
          <p className="text-sm text-gray-200">Address: *********</p>
        </div>
      </div>

      <div className="text-center text-gray-200 text-sm mt-6">
        &copy; {new Date().getFullYear()} Travel Website. All rights reserved.
      </div>
    </footer>
  );
}