import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  glow?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, glow = false }) => {
  const borderClass = glow ? 'glowing-border' : 'border border-light-border dark:border-dark-2';
  
  return (
    <div className={`bg-light-card dark:bg-dark-1 p-6 rounded-xl shadow-lg ${borderClass} ${className} transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-primary/20`}>
      {title && <h2 className="text-lg font-display font-bold mb-4 text-light-text dark:text-white-text">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;