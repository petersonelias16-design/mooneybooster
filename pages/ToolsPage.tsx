import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Card from '../components/Card';
import { getFinancialAdvice } from '../services/geminiService';
import LoadingSpinner from '../components/LoadingSpinner';
import type { GroundingChunk } from '../types';
import { LinkIcon } from '@heroicons/react/24/solid';

// Debounce hook to delay API calls
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};


const ToolsPage: React.FC = () => {
  const [monthlyGoal, setMonthlyGoal] = useState<string>('5000');
  const [strategies, setStrategies] = useState<string>('');
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Start loading true for initial generation

  const debouncedMonthlyGoal = useDebounce(monthlyGoal, 1000);

  const formatCurrency = (value: number) => {
    if (isNaN(value) || !isFinite(value)) {
        return '0,00';
    }
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
  };

  const goals = useMemo(() => {
    const goal = parseFloat(monthlyGoal.replace(/\./g, '').replace(',', '.')) || 0;
    const daily = goal / 30;
    const weekly = daily * 7;
    const hourly = daily / 8;
    return { daily, weekly, hourly };
  }, [monthlyGoal]);

  const handleGenerateStrategies = useCallback(async (goalValueStr: string) => {
    const goalValue = parseFloat(goalValueStr.replace(/\./g, '').replace(',', '.')) || 0;
    if (goalValue <= 0) {
        setStrategies('');
        setSources([]);
        setLoading(false);
        return;
    }

    setLoading(true);
    const dailyGoal = goalValue / 30;
    const prompt = `Gere uma lista numerada com 2 ou 3 estratégias acionáveis e realistas para alguém que precisa ganhar R$${formatCurrency(dailyGoal)} por dia para atingir uma meta mensal de R$${formatCurrency(goalValue)}. As estratégias devem ser curtas e diretas, focadas em vendas, serviços ou otimização de custos.`;

    try {
      const result = await getFinancialAdvice(prompt);
      setStrategies(result.text);
      setSources(result.sources);
    } catch (error) {
      setStrategies("Ocorreu um erro ao gerar as estratégias. Por favor, tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    handleGenerateStrategies(debouncedMonthlyGoal);
  }, [debouncedMonthlyGoal, handleGenerateStrategies]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Allow only numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    setMonthlyGoal(numericValue);
  };

  const renderStrategies = () => {
    // Basic parser for numbered lists
    return strategies.split(/\n/).map((line, index) => {
      const match = line.match(/^(\d+)\.\s*(.*)/);
      if (match) {
        return (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-sm">
              {match[1]}
            </div>
            <p className="flex-1 text-light-text-secondary dark:text-gray-300">{match[2]}</p>
          </div>
        );
      }
      return null;
    }).filter(Boolean);
  };


  return (
    <div className="space-y-6 py-6">
      <Card glow>
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-light-text dark:text-white-text">Multiplicador Financeiro</h1>
          <p className="text-light-text-secondary dark:text-gray-400 mt-1">Calcule exatamente o que você precisa fazer para atingir sua meta.</p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="relative">
            <label htmlFor="goal" className="block mb-2 text-sm font-medium text-left text-light-text-secondary dark:text-gray-400">Qual sua meta mensal de renda?</label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 mt-3 text-light-text-secondary dark:text-gray-400">R$</span>
            <input
              type="text"
              id="goal"
              value={monthlyGoal ? new Intl.NumberFormat('pt-BR').format(parseInt(monthlyGoal, 10)) : ''}
              onChange={handleInputChange}
              placeholder="5000"
              className="w-full bg-light-bg dark:bg-secondary border border-light-border dark:border-dark-2 rounded-lg p-3 pl-10 text-lg font-bold text-light-text dark:text-white-text focus:ring-primary focus:border-primary transition"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-light-bg dark:bg-dark-2 p-4 rounded-lg">
              <p className="text-xs font-semibold text-light-text-secondary dark:text-gray-400 uppercase">META DIÁRIA</p>
              <p className="text-xl font-bold text-neon-green mt-1">R$ {formatCurrency(goals.daily)}</p>
            </div>
            <div className="bg-light-bg dark:bg-dark-2 p-4 rounded-lg">
              <p className="text-xs font-semibold text-light-text-secondary dark:text-gray-400 uppercase">META SEMANAL</p>
              <p className="text-xl font-bold text-neon-green mt-1">R$ {formatCurrency(goals.weekly)}</p>
            </div>
             <div className="bg-light-bg dark:bg-dark-2 p-4 rounded-lg">
              <p className="text-xs font-semibold text-light-text-secondary dark:text-gray-400 uppercase">POR HORA (8H)</p>
              <p className="text-xl font-bold text-primary mt-1">R$ {formatCurrency(goals.hourly)}</p>
            </div>
          </div>
        </div>
      </Card>
      
      {loading && (
        <div className="flex justify-center items-center py-10">
          <LoadingSpinner />
        </div>
      )}

      {!loading && strategies && (
        <Card title="Estratégias Sugeridas">
            <div className="space-y-4">
              {renderStrategies()}
            </div>
            {sources.length > 0 && (
            <div className="mt-6 border-t border-light-border dark:border-dark-2 pt-4">
                <h3 className="text-sm font-semibold text-light-text-secondary dark:text-gray-400 flex items-center gap-2 mb-3">
                    <LinkIcon className="w-4 h-4" />
                    Fontes e Referências
                </h3>
                <ul className="space-y-2">
                    {sources.map((source, index) => (
                       source.web && (
                         <li key={index}>
                             <a 
                                  href={source.web.uri} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-sm text-primary hover:text-neon-green underline truncate block"
                             >
                                 {source.web.title || "Fonte desconhecida"}
                             </a>
                         </li>
                       )
                    ))}
                </ul>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default ToolsPage;
