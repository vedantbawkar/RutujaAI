import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ children, variant = 'primary', ...props }) => {
  const baseStyle = "px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2";
  const variants = {
    primary: "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600",
    ghost: "text-gray-700 hover:bg-gray-100"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

const MobileMenu = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600"
      >
        <div className="w-6 h-0.5 bg-current mb-1.5"></div>
        <div className="w-6 h-0.5 bg-current mb-1.5"></div>
        <div className="w-6 h-0.5 bg-current"></div>
      </button>
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg py-2">
          {items.map(item => (
            <button key={item} className="w-full px-4 py-2 text-left hover:bg-gray-100">
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const GoogleTranslate = () => {
  useEffect(() => {
    // Load Google Translate script only once
    if (!window.googleTranslateElementInit) {
      const addScript = document.createElement("script");
      addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.async = true;
      document.body.appendChild(addScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,kn,ml,mr,pa,ta,te,bn,gu,or,as,ur,ks,sd,sa,ne,si,bo,doi,brx,mni,ksf,kok",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };
    }
  }, []);

  return <div id="google_translate_element" className="mx-2" />;
};

function Header() {

  const user = {
    name: "Sarah Johnson",
    profilePic: "../src/assets/woman-image1.jpg"
  };

  const navigate = useNavigate();

  return (
    <>
      <nav className="sticky top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <MobileMenu items={['Home', 'Chatbot', 'Dashboard', 'Microfinance']} />
            <div className="hidden md:flex items-center space-x-4">
              {['Home', 'Chatbot', 'AI Budget Tracker', 'Microfinance'].map(item => (
                <Button
                  key={item}
                  variant="ghost"
                  onClick={() => navigate(item === 'Home' ? '/' : item === 'AI Budget Tracker' ? '/dashboard' : `/${item.toLowerCase()}`)}
                >
                  {item}
                </Button>
              ))}

            </div>

            <div className="flex items-center space-x-4">
              {/* Replacing the Language dropdown with Google Translate component */}
              <GoogleTranslate />
              <div className="flex items-center" id="google_translate_element"></div>
              <img src={user.profilePic} alt="Profile" className="w-8 h-8 rounded-full cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
