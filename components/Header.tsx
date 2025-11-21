import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  return (
    <header className="bg-light-card dark:bg-secondary sticky top-0 z-10 p-4 flex justify-between items-center border-b border-light-border dark:border-dark-2">
      <div className="flex items-center space-x-2">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#7040FF'}} />
                    <stop offset="100%" style={{stopColor: '#52FFB8'}} />
                </linearGradient>
            </defs>
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 7L12 12L22 7" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22V12" stroke="#52FFB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 4.5L7 9.5" stroke="#7040FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="text-xl font-display font-bold text-light-text dark:text-white-text">Money Booster 2.0</h1>
      </div>
      <div>
        <UserCircleIcon className="w-8 h-8 text-primary" />
      </div>
    </header>
  );
};

export default Header;
