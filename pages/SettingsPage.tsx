import React from 'react';
import Card from '../components/Card';
import { UserCircleIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../App';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6 py-6">
       <header>
        <h1 className="text-3xl font-display font-bold text-light-text dark:text-white-text">Configurações</h1>
        <p className="text-light-text-secondary dark:text-gray-400 mt-1">Ajuste o aplicativo para a sua preferência.</p>
      </header>

      <Card title="Perfil">
        <div className="flex items-center space-x-4">
          <UserCircleIcon className="w-16 h-16 text-primary" />
          <div>
            <p className="text-xl font-bold">Usuário Money Booster</p>
            <p className="text-sm text-light-text-secondary dark:text-gray-400">nickbargainsltda@outlook.com</p>
          </div>
        </div>
        <button className="mt-4 text-sm w-full sm:w-auto text-neon-green font-semibold bg-light-bg dark:bg-dark-2 px-4 py-2 rounded-lg hover:bg-light-border dark:hover:bg-dark-1 transition-colors">
            Alterar Senha
        </button>
      </Card>

      <Card title="Aparência">
        <div className="flex items-center justify-between">
            <p>Tema do Aplicativo</p>
            <div className="flex items-center space-x-2 p-1 bg-light-bg dark:bg-secondary rounded-lg">
                <button onClick={() => theme !== 'dark' && toggleTheme()} className={`p-2 rounded-md transition-colors ${theme === 'dark' ? 'bg-primary' : ''}`}>
                    <MoonIcon className={`w-5 h-5 ${theme === 'dark' ? 'text-white-text' : 'text-light-text-secondary'}`} />
                </button>
                <button onClick={() => theme !== 'light' && toggleTheme()} className={`p-2 rounded-md transition-colors ${theme === 'light' ? 'bg-primary' : ''}`}>
                    <SunIcon className={`w-5 h-5 ${theme === 'light' ? 'text-white-text' : 'text-light-text-secondary'}`} />
                </button>
            </div>
        </div>
      </Card>

    </div>
  );
};

export default SettingsPage;