import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';

const BottomNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-light-card dark:bg-dark-1 border-t border-light-border dark:border-dark-2 p-2 z-20">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-all duration-300 transform ${
                isActive ? 'text-neon-green scale-110' : 'text-light-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white-text'
              }`
            }
          >
            {item.icon}
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;