import React from 'react';
import Card from '../components/Card';
import { ArrowTrendingUpIcon, LightBulbIcon, PlusCircleIcon, ArrowUpCircleIcon, ArrowDownCircleIcon, WalletIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useTransactions } from '../contexts/TransactionsContext';

const DashboardPage: React.FC = () => {
  const { transactions, balance } = useTransactions();
  const recentTransactions = transactions.slice(0, 3);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="space-y-6 py-6">
      <header>
        <h1 className="text-3xl font-bold text-light-text dark:text-white-text">Dashboard</h1>
        <p className="text-light-text-secondary dark:text-gray-400 mt-1">Sua visão geral financeira.</p>
      </header>

      <Card glow={true}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-light-text-secondary dark:text-gray-400 text-sm font-semibold">SALDO ATUAL</p>
            <p className="text-4xl font-bold text-light-text dark:text-white-text mt-1">R$ {formatCurrency(balance)}</p>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <Link to="/finances" className="bg-neon-green text-secondary p-4 rounded-lg flex flex-col items-center justify-center text-center font-bold hover:brightness-110 transition-all duration-300 transform hover:scale-105">
            <PlusCircleIcon className="w-8 h-8 mb-1" />
            <span>Adicionar Gasto</span>
        </Link>
        <Link to="/tools" className="bg-primary text-white p-4 rounded-lg flex flex-col items-center justify-center text-center font-bold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
            <ArrowTrendingUpIcon className="w-8 h-8 mb-1" />
            <span>Multiplicar</span>
        </Link>
      </div>


      <Card title="Últimas Transações">
        {recentTransactions.length > 0 ? (
            <div className="space-y-4">
                {recentTransactions.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {tx.type === 'entrada' ? 
                                <ArrowUpCircleIcon className="w-8 h-8 text-neon-green"/> : 
                                <ArrowDownCircleIcon className="w-8 h-8 text-red-500" />
                            }
                            <div>
                                <p className="font-semibold text-light-text dark:text-white-text">{tx.description}</p>
                            </div>
                        </div>
                        <div>
                            <p className={`font-bold text-sm ${tx.type === 'entrada' ? 'text-neon-green' : 'text-red-500'}`}>
                                {tx.type === 'entrada' ? '+' : '-'} R$ {tx.amount.toFixed(2).replace('.',',')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-4 text-light-text-secondary dark:text-gray-400">
                <WalletIcon className="w-10 h-10 mx-auto mb-2" />
                <p>Nenhuma transação recente.</p>
            </div>
        )}
        <Link to="/finances" className="block text-center mt-4 text-sm text-primary font-semibold hover:underline">
            Ver Todas
        </Link>
      </Card>

      <Card>
          <div className="flex items-start space-x-4">
              <div className="bg-digital-gold/20 p-3 rounded-full">
                <LightBulbIcon className="w-6 h-6 text-digital-gold"/>
              </div>
              <div>
                  <h3 className="font-bold text-light-text dark:text-white-text">Dica do Dia</h3>
                  <p className="text-light-text-secondary dark:text-gray-400 text-sm mt-1">
                      Analise seus gastos com delivery. Pequenos cortes podem somar uma grande economia no final do mês.
                  </p>
              </div>
          </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
