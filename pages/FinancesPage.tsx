import React from 'react';
import Card from '../components/Card';
import type { Transaction } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ArrowUpCircleIcon, ArrowDownCircleIcon } from '@heroicons/react/24/solid';

const mockTransactions: Transaction[] = [
  { id: '1', type: 'entrada', description: 'Salário', amount: 3500, date: '2023-10-05', category: 'Trabalho' },
  { id: '2', type: 'saida', description: 'Aluguel', amount: 1200, date: '2023-10-05', category: 'Moradia' },
  { id: '3', type: 'saida', description: 'Supermercado', amount: 450.75, date: '2023-10-07', category: 'Alimentação' },
  { id: '4', type: 'saida', description: 'iFood', amount: 89.90, date: '2023-10-09', category: 'Delivery' },
  { id: '5', type: 'entrada', description: 'Freelance', amount: 800, date: '2023-10-10', category: 'Trabalho' },
  { id: '6', type: 'saida', description: 'Conta de Luz', amount: 120.50, date: '2023-10-12', category: 'Contas' },
];

const expenseData = [
  { name: 'Moradia', value: 1200 },
  { name: 'Alimentação', value: 450.75 },
  { name: 'Delivery', value: 89.90 },
  { name: 'Contas', value: 120.50 },
];

const COLORS = ['#7040FF', '#52FFB8', '#F2C94C', '#FF6384'];

const totalExpenses = expenseData.reduce((acc, item) => acc + item.value, 0);

const FinancesPage: React.FC = () => {
  return (
    <div className="space-y-6 py-6">
       <header>
        <h1 className="text-3xl font-display font-bold text-light-text dark:text-white-text">Controle Financeiro</h1>
        <p className="text-light-text-secondary dark:text-gray-400 mt-1">Visualize suas entradas e saídas de forma simples.</p>
      </header>

      <Card title="Análise de Gastos">
        <div className="relative" style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                  <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      innerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                  >
                      {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A1A1A',
                      borderColor: '#292929',
                      borderRadius: '12px',
                    }}
                  />
                  <Legend />
                </PieChart>
            </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-sm text-light-text-secondary dark:text-gray-400">Total Gasto</p>
                <p className="text-2xl font-bold font-display text-light-text dark:text-white-text">
                    R$ {totalExpenses.toFixed(2).replace('.', ',')}
                </p>
            </div>
        </div>
      </Card>

      <Card title="Histórico de Transações">
        <div className="space-y-4">
            {mockTransactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-light-bg dark:bg-dark-2 rounded-lg">
                    <div className="flex items-center space-x-3">
                        {tx.type === 'entrada' ? 
                            <ArrowUpCircleIcon className="w-8 h-8 text-neon-green"/> : 
                            <ArrowDownCircleIcon className="w-8 h-8 text-red-500" />
                        }
                        <div>
                            <p className="font-semibold text-light-text dark:text-white-text">{tx.description}</p>
                            <p className="text-sm text-light-text-secondary dark:text-gray-400">{tx.category}</p>
                        </div>
                    </div>
                    <div>
                        <p className={`font-bold ${tx.type === 'entrada' ? 'text-neon-green' : 'text-red-500'}`}>
                           {tx.type === 'entrada' ? '+' : '-'} R$ {tx.amount.toFixed(2).replace('.',',')}
                        </p>
                        <p className="text-xs text-light-text-secondary dark:text-gray-500 text-right">{new Date(tx.date).toLocaleString('pt-BR')}</p>
                    </div>
                </div>
            ))}
        </div>
      </Card>

    </div>
  );
};

export default FinancesPage;