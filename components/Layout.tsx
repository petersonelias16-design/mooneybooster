import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-light-bg dark:bg-secondary text-light-text dark:text-white-text font-sans">
      <Header />
      <main className="flex-grow overflow-y-auto pb-24 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;