import React from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-secondary flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#7040FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 7L12 12L22 7" stroke="#7040FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22V12" stroke="#52FFB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 4.5L7 9.5" stroke="#7040FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="text-4xl font-display font-bold text-light-text dark:text-white-text">Money Booster</h1>
        </div>
        <p className="text-light-text-secondary dark:text-gray-300 mb-8 font-sans">Multiplique seu dinheiro em minutos.</p>

        <div className="bg-light-card dark:bg-dark-1 p-8 rounded-2xl shadow-2xl glowing-border glowing-border-animated">
          <h2 className="text-2xl font-display font-semibold text-light-text dark:text-white-text mb-6">Acesso à Plataforma</h2>
          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="mb-6 text-left">
              <label htmlFor="key" className="block mb-2 text-sm font-medium text-light-text-secondary dark:text-gray-400">Chave de Ativação</label>
              <input 
                type="text" 
                id="key" 
                placeholder="Insira sua chave vitalícia"
                className="bg-light-bg dark:bg-secondary border border-light-border dark:border-dark-2 text-light-text dark:text-white-text text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-3 transition"
                defaultValue="DEMO-ACCESS-KEY"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-neon-green text-secondary font-display font-bold py-3 px-4 rounded-lg hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-neon-green/50 transition-all duration-300 transform hover:scale-105"
            >
              Entrar Agora
            </button>
          </form>
          <p className="text-xs text-light-text-secondary dark:text-gray-500 mt-6">Pague uma única vez e tenha acesso vitalício.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;