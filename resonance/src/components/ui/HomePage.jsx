import React from "react";
import Card from "./card";
import Footer from './Footer';
import { useState,useRef,useEffect } from "react";


const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    journey: false,
    stories: false
  });

  const user = {
    name: "Rutuja Shinde",
    profilePic: "./src/assets/woman-image1.jpg"
  };
  
  const journeyRef = useRef(null);
  const storiesRef = useRef(null);

  

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const observeElement = (ref, key) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isInView = rect.top <= window.innerHeight * 0.75;
          setIsVisible(prev => ({ ...prev, [key]: isInView }));
        }
      };

      observeElement(journeyRef, 'journey');
      observeElement(storiesRef, 'stories');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      

      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <section 
          className="text-center transition-all duration-500 max-w-7xl mx-auto"
          style={{
            opacity: 1 - (scrollY * 0.002),
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        >
          <div className="relative inline-block mb-16">
            <img
              src={user.profilePic}
              alt={user.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-xl border-4 border-white mb-8"
            />
            <div className="inline-block bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 sm:px-6 py-2 rounded-full shadow-lg text-sm sm:text-base">
              Welcome back, {user.name}!
            </div>
          </div>

          <Card className="max-w-2xl mx-auto p-4 sm:p-6">
            <p className="text-lg sm:text-xl italic text-gray-700">
              "A woman with a voice is, by definition, a strong woman."
            </p>
            <p className="text-sm text-gray-500 mt-2">- Melinda Gates</p>
          </Card>
        </section>

        <section className="max-w-6xl mx-auto space-y-8 sm:space-y-16 py-8 sm:py-16">
          <div 
            ref={journeyRef}
            className={`transition-all duration-1000 ${isVisible.journey ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Your Financial Journey
            </h2>
            <Card className="mt-4 p-4 sm:p-6">
              <p className="text-gray-600">
                Welcome to your personal financial empowerment hub. Here, you'll find tools,
                resources, and a supportive community to help you achieve your financial goals.
              </p>
            </Card>
          </div>

          <div 
            ref={storiesRef}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-1000 
              ${isVisible.stories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
          <Card className="p-4 sm:p-6">
              <h3 className="font-semibold text-gray-800">Real Results</h3>
              <p className="text-gray-600 mt-2">
                Member Achievements in Financial Growth
              </p>
            </Card>
            <Card className="p-4 sm:p-6">
                <h3 className="font-semibold text-gray-800">Financial Wins</h3>
                <p className="text-gray-600 mt-2">
                  Inspiring Journeys from Our Community
                </p>
              </Card>
            <Card className="p-4 sm:p-6">
                <h3 className="font-semibold text-gray-800">From Goals to Reality</h3>
                <p className="text-gray-600 mt-2">
                  How Members Are Thriving
                </p>
              </Card>
          </div>
        </section>
      </main>
      <Footer />

      
    </div>
  );
};

export default HomePage;