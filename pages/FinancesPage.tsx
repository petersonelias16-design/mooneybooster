import React, { useState, useMemo } from 'react';
import Card from '../components/Card';
import { useTransactions } from '../contexts/TransactionsContext';
import type { Transaction } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { 
    WalletIcon, 
    ChartPieIcon,
    BriefcaseIcon,
    HomeIcon,
    ShoppingCartIcon,
    TruckIcon,
    DocumentTextIcon,
    TicketIcon,
    MapPinIcon,
    HeartIcon,
    TagIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    ScaleIcon,
    ChevronDownIcon
} from '@heroicons/react/24/solid';

const CATEGORIES = ['Trabalho', 'Moradia', 'Alimentação', 'Delivery', 'Contas', 'Lazer', 'Transporte', 'Saúde', 'Outros'];
const COLORS = ['#7040FF', '#52FFB8', '#F2C94C', '#FF6384', '#36A2EB', '#FFCE56', '#9966FF'];

const categoryIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  'Trabalho': BriefcaseIcon,
  'Moradia': HomeIcon,
  'Alimentação': ShoppingCartIcon,
  'Delivery': TruckIcon,
  'Contas': DocumentTextIcon,
  'Lazer': TicketIcon,
  'Transporte': MapPinIcon,
  'Saúde': HeartIcon,
  'Outros': TagIcon,
};

const CategoryIcon = ({ category, className }: { category: string; className?: string }) => {
    const Icon = categoryIcons[category] || TagIcon;
    return <Icon className={className || "w-5 h-5"} />;
};

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
};

const FinancesPage: React.FC = () => {
    const { transactions, addTransaction, balance } = useTransactions();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [expandedTxId, setExpandedTxId] = useState<string | null>(null);

    const handleAddTransaction = (type: 'entrada' | 'saida') => {
        const numAmount = parseFloat(amount);
        if (!description.trim() || isNaN(numAmount) || numAmount <= 0) {
            alert('Por favor, preencha a descrição e um valor válido.');
            return;
        }

        addTransaction({
            type,
            description,
            amount: numAmount,
            date,
            category,
        });
        
        // Reset form
        setDescription('');
        setAmount('');
        setDate(new Date().toISOString().split('T')[0]);
        setCategory(CATEGORIES[0]);
    };

    const { totalIncome, totalExpenses, expenseData } = useMemo(() => {
        let income = 0;
        const expensesByCategory: Record<string, number> = {};
        
        transactions.forEach(tx => {
            if (tx.type === 'entrada') {
                income += tx.amount;
            } else {
                if (!expensesByCategory[tx.category]) {
                    expensesByCategory[tx.category] = 0;
                }
                expensesByCategory[tx.category] += tx.amount;
            }
        });

        const totalExp = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);
        const chartData = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));
        
        return { totalIncome: income, totalExpenses: totalExp, expenseData: chartData };
    }, [transactions]);
    
    const groupedTransactions = useMemo(() => {
        const groups: Record<string, Transaction[]> = {};
        if (!transactions) return groups;

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const formatKey = (date: Date) => {
            if (date.toDateString() === today.toDateString()) return 'Hoje';
            if (date.toDateString() === yesterday.toDateString()) return 'Ontem';
            return new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(date);
        };

        transactions.forEach(tx => {
            const txDate = new Date(tx.date + 'T00:00:00'); 
            const key = formatKey(txDate);
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(tx);
        });

        return groups;
    }, [transactions]);


  return (
    <div className="space-y-6 py-6">
       <header>
        <h1 className="text-3xl font-display font-bold text-light-text dark:text-white-text">Controle Financeiro</h1>
        <p className="text-light-text-secondary dark:text-gray-400 mt-1">Seu saldo e transações em um só lugar.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="!hover:scale-100">
              <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-full bg-neon-green/20"><ArrowUpIcon className="w-5 h-5 text-neon-green" /></div>
                  <div>
                      <p className="text-sm text-light-text-secondary dark:text-gray-400">Total Entradas</p>
                      <p className="text-xl font-bold font-display text-light-text dark:text-white-text">R$ {formatCurrency(totalIncome)}</p>
                  </div>
              </div>
          </Card>
          <Card className="!hover:scale-100">
              <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-full bg-red-500/20"><ArrowDownIcon className="w-5 h-5 text-red-500" /></div>
                  <div>
                      <p className="text-sm text-light-text-secondary dark:text-gray-400">Total Saídas</p>
                      <p className="text-xl font-bold font-display text-light-text dark:text-white-text">R$ {formatCurrency(totalExpenses)}</p>
                  </div>
              </div>
          </Card>
           <Card className="!hover:scale-100">
              <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-full bg-primary/20"><ScaleIcon className="w-5 h-5 text-primary" /></div>
                  <div>
                      <p className="text-sm text-light-text-secondary dark:text-gray-400">Saldo Final</p>
                      <p className="text-xl font-bold font-display text-light-text dark:text-white-text">R$ {formatCurrency(balance)}</p>
                  </div>
              </div>
          </Card>
      </div>

      <Card title="Registrar Nova Transação">
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                    type="text" 
                    placeholder="Descrição (ex: Supermercado)" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-light-bg dark:bg-secondary border border-light-border dark:border-dark-2 rounded-lg p-3 text-light-text dark:text-white-text focus:ring-primary focus:border-primary transition"
                />
                 <input 
                    type="number" 
                    placeholder="Valor (R$)" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-light-bg dark:bg-secondary border border-light-border dark:border-dark-2 rounded-lg p-3 text-light-text dark:text-white-text focus:ring-primary focus:border-primary transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-light-bg dark:bg-secondary border border-light-border dark:border-dark-2 rounded-lg p-3 text-light-text dark:text-white-text focus:ring-primary focus:border-primary transition"
                />
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-light-bg dark:bg-secondary border border-light-border dark:border-dark-2 rounded-lg p-3 text-light-text dark:text-white-text focus:ring-primary focus:border-primary transition"
                >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button 
                    onClick={() => handleAddTransaction('entrada')}
                    className="w-full bg-neon-green text-secondary font-display font-bold py-3 px-4 rounded-lg hover:brightness-110 transition-all duration-300"
                >
                    Adicionar Entrada
                </button>
                <button 
                    onClick={() => handleAddTransaction('saida')}
                    className="w-full bg-red-500 text-white font-display font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-300"
                >
                    Adicionar Saída
                </button>
            </div>
        </div>
      </Card>

      <Card title="Análise de Gastos">
        {expenseData.length > 0 ? (
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
                      itemStyle={{
                          color: '#7040FF'
                      }}
                      cursor={{ fill: 'rgba(112, 64, 255, 0.2)' }}
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
        ) : (
          <div className="text-center py-10 text-light-text-secondary dark:text-gray-400">
              <ChartPieIcon className="w-12 h-12 mx-auto mb-2" />
              <p>Nenhuma despesa registrada para análise.</p>
          </div>
        )}
      </Card>

      <Card title="Histórico de Transações">
        {Object.keys(groupedTransactions).length > 0 ? (
            <div className="space-y-6">
                {Object.keys(groupedTransactions).map((dateGroup) => {
                    const txs = groupedTransactions[dateGroup];
                    return (
                        <div key={dateGroup}>
                            <h3 className="text-sm font-semibold text-light-text-secondary dark:text-gray-400 mb-3 sticky top-[64px] bg-light-card dark:bg-dark-1 py-1">{dateGroup}</h3>
                            <div className="space-y-3">
                                {txs.map(tx => (
                                    <div key={tx.id} className="bg-light-bg dark:bg-dark-2 rounded-lg transition-shadow duration-300 hover:shadow-lg">
                                        <button 
                                            onClick={() => setExpandedTxId(expandedTxId === tx.id ? null : tx.id)}
                                            className="w-full flex items-center justify-between p-3 text-left"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === 'entrada' ? 'bg-neon-green/20' : 'bg-red-500/20'}`}>
                                                    <CategoryIcon 
                                                        category={tx.category} 
                                                        className={`w-6 h-6 ${tx.type === 'entrada' ? 'text-neon-green' : 'text-red-500'}`} 
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-light-text dark:text-white-text">{tx.description}</p>
                                                    <p className="text-sm text-light-text-secondary dark:text-gray-400">{tx.category}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <p className={`font-bold text-lg ${tx.type === 'entrada' ? 'text-neon-green' : 'text-red-500'}`}>
                                                {tx.type === 'entrada' ? '+' : '-'} R$ {formatCurrency(tx.amount)}
                                                </p>
                                                <ChevronDownIcon className={`w-5 h-5 text-light-text-secondary dark:text-gray-400 transition-transform duration-300 ${expandedTxId === tx.id ? 'rotate-180' : ''}`} />
                                            </div>
                                        </button>
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedTxId === tx.id ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="px-4 pb-4 border-t border-light-border dark:border-dark-1/50 pt-3 text-sm text-light-text-secondary dark:text-gray-400">
                                                <p><span className="font-semibold">Data Completa:</span> {new Date(tx.date + 'T00:00:00').toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        ) : (
          <div className="text-center py-10 text-light-text-secondary dark:text-gray-400">
              <WalletIcon className="w-12 h-12 mx-auto mb-2" />
              <p>Nenhuma transação registrada ainda.</p>
          </div>
        )}
      </Card>

    </div>
  );
};

export default FinancesPage;