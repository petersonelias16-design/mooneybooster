import React from 'react';
import Card from '../components/Card';
import type { Reward } from '../types';
import { ShieldCheckIcon, StarIcon, ChartBarIcon, FireIcon } from '@heroicons/react/24/solid';


const mockRewards: Reward[] = [
    {id: '1', title: 'Primeiro Passo', description: 'Fez seu primeiro registro financeiro.', achieved: true, icon: <StarIcon className="w-8 h-8 text-digital-gold" />},
    {id: '2', title: 'Economista Iniciante', description: 'Economizou R$100 em um mês.', achieved: true, icon: <ShieldCheckIcon className="w-8 h-8 text-digital-gold" />},
    {id: '3', title: 'Consistência é a chave', description: 'Usou o app por 7 dias seguidos.', achieved: false, icon: <FireIcon className="w-8 h-8 text-gray-500" />},
    {id: '4', title: 'Mestre das Metas', description: 'Atingiu sua primeira meta de ganho.', achieved: false, icon: <ChartBarIcon className="w-8 h-8 text-gray-500" />},
];

const RewardsPage: React.FC = () => {
    return (
        <div className="space-y-6 py-6">
            <header>
                <h1 className="text-3xl font-display font-bold text-light-text dark:text-white-text">Central de Recompensas</h1>
                <p className="text-light-text-secondary dark:text-gray-400 mt-1">Sua consistência gera resultados e conquistas.</p>
            </header>

            <Card title="Suas Conquistas">
                <div className="space-y-4">
                    {mockRewards.map(reward => (
                        <div key={reward.id} className={`flex items-center p-4 rounded-lg transition-opacity bg-light-bg dark:bg-dark-2 ${reward.achieved ? 'opacity-100' : 'opacity-50'}`}>
                            <div className={`mr-4 ${reward.achieved ? 'text-digital-gold' : 'text-gray-500'}`}>
                                {React.cloneElement(reward.icon as React.ReactElement, { className: 'w-10 h-10' })}
                            </div>
                            <div>
                                <h3 className={`font-bold ${reward.achieved ? 'text-light-text dark:text-white-text' : 'text-light-text-secondary dark:text-gray-400'}`}>{reward.title}</h3>
                                <p className="text-sm text-light-text-secondary dark:text-gray-500">{reward.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card title="Progresso Pessoal">
                <p className="text-light-text-secondary dark:text-gray-400">Nível Atual: <span className="font-bold text-primary">Iniciante Financeiro</span></p>
                <div className="w-full bg-light-border dark:bg-dark-2 rounded-full h-2.5 mt-2">
                    <div className="bg-neon-green h-2.5 rounded-full" style={{width: '45%'}}></div>
                </div>
                <p className="text-xs text-light-text-secondary dark:text-gray-500 mt-1 text-right">450/1000 XP para o próximo nível</p>
            </Card>

        </div>
    );
}

export default RewardsPage;