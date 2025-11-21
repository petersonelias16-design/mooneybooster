import React from 'react';
import Card from '../components/Card';
import { ArrowTrendingUpIcon, LightBulbIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 py-6">
      <header>
        <h1 className="text-3xl font-display font-bold text-light-text dark:text-white-text">Bem-vindo(a) de volta!</h1>
        <p className="text-light-text-secondary dark:text-gray-400 mt-1">Você merece viver com tranquilidade. Vamos construir isso juntos.</p>
      </header>

      <Card glow={true}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-light-text-secondary dark:text-gray-400 text-sm">Status Financeiro</p>
            <p className="text-3xl font-bold font-display text-light-text dark:text-white-text mt-1">R$ 2.450,78</p>
            <p className="text-sm text-neon-green flex items-center mt-2">
              <ArrowTrendingUpIcon className="w-4 h-4 mr-1"/>
              +12.5% este mês
            </p>
          </div>
          <div className="w-24 h-24 flex items-center justify-center bg-primary/20 rounded-full">
            <ArrowTrendingUpIcon className="w-12 h-12 text-primary"/>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <div className="flex items-start space-x-4">
                <LightBulbIcon className="w-8 h-8 text-digital-gold mt-1"/>
                <div>
                    <h3 className="font-bold font-display text-light-text dark:text-white-text">Dica Rápida do Money Booster</h3>
                    <p className="text-light-text-secondary dark:text-gray-400 text-sm mt-2">
                        Analise seus gastos com delivery. Pequenos cortes podem somar uma grande economia no final do mês.
                    </p>
                </div>
            </div>
        </Card>

        <Card>
            <div className="flex items-start space-x-4">
                <CheckCircleIcon className="w-8 h-8 text-neon-green mt-1"/>
                <div>
                    <h3 className="font-bold font-display text-light-text dark:text-white-text">Tarefas Pendentes</h3>
                    <p className="text-light-text-secondary dark:text-gray-400 text-sm mt-2">
                        Você tem 2 tarefas para hoje.
                    </p>
                    <button className="text-sm text-neon-green font-semibold mt-3 hover:underline">Ver tarefas</button>
                </div>
            </div>
        </Card>
      </div>

      <Card title="Acesso Rápido">
        <div className="grid grid-cols-2 gap-4 text-center">
            <Link to="/tools" className="bg-light-bg dark:bg-dark-2 p-4 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/50 transition-all duration-300 transform hover:scale-105">
                <p>Multiplicador</p>
            </Link>
            <Link to="/finances" className="bg-light-bg dark:bg-dark-2 p-4 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/50 transition-all duration-300 transform hover:scale-105">
                <p>Registrar Gasto</p>
            </Link>
            <Link to="/rewards" className="bg-light-bg dark:bg-dark-2 p-4 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/50 transition-all duration-300 transform hover:scale-105">
                <p>Ver Recompensas</p>
            </Link>
             <Link to="/finances" className="bg-light-bg dark:bg-dark-2 p-4 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/50 transition-all duration-300 transform hover:scale-105">
                <p>Ver Gráficos</p>
            </Link>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;