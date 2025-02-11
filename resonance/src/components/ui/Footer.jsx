import React from "react";

function Footer(){
    return(
     <>
     <footer className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-teal-100 hover:text-white">Our Mission</a></li>
                <li><a href="#" className="text-teal-100 hover:text-white">Team</a></li>
                <li><a href="#" className="text-teal-100 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-teal-100 hover:text-white">Resources</a></li>
                <li><a href="#" className="text-teal-100 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-teal-100 hover:text-white">Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-teal-100 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-teal-100 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-teal-100 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-teal-100 hover:text-white">Instagram</a></li>
                <li><a href="#" className="text-teal-100 hover:text-white">Facebook</a></li>
                <li><a href="#" className="text-teal-100 hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="text-teal-100 hover:text-white">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-teal-500/30 text-center text-teal-100">
            <p className="text-sm sm:text-base">&copy; 2025 Financial Independence Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
     </>
    );
}

export default Footer;