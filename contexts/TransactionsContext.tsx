import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import type { Transaction } from '../types';

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transactionData: Omit<Transaction, 'id'>) => void;
  balance: number;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
};

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const savedTransactions = localStorage.getItem('transactions');
      return savedTransactions ? JSON.parse(savedTransactions) : [];
    } catch (error) {
      console.error("Error reading transactions from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error("Error saving transactions to localStorage", error);
    }
  }, [transactions]);

  const addTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      id: new Date().toISOString() + Math.random(),
      ...transactionData,
    };
    setTransactions(prev => [newTransaction, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const balance = useMemo(() => {
    return transactions.reduce((acc, tx) => {
      return tx.type === 'entrada' ? acc + tx.amount : acc - tx.amount;
    }, 0);
  }, [transactions]);

  const value = {
    transactions,
    addTransaction,
    balance,
  };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};
