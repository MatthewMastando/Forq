import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export const Footer: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  return <footer className={`glass bg-white/30 backdrop-blur-sm border-t border-white/20 ${isLandingPage ? 'mt-0' : ''}`}>
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:order-2 space-x-4 sm:space-x-6 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <Link to="/home" className="text-[#3C2A21] hover:text-[#E25E3E] transition-colors whitespace-nowrap">
              Home
            </Link>
            <Link to="/search" className="text-[#3C2A21] hover:text-[#E25E3E] transition-colors whitespace-nowrap">
              Explore
            </Link>
            <a href="#" className="text-[#3C2A21] hover:text-[#E25E3E] transition-colors whitespace-nowrap">
              About
            </a>
            <a href="#" className="text-[#3C2A21] hover:text-[#E25E3E] transition-colors whitespace-nowrap">
              Help
            </a>
          </div>
          <div className="mt-4 md:mt-0 md:order-1">
            <p className="text-center text-sm text-[#5C4033]">
              &copy; 2023 Forq. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </footer>;
};