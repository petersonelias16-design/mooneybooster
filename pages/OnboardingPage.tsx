import React, { useState } from 'react';
import { HomeIcon, WrenchScrewdriverIcon, ChartPieIcon } from '@heroicons/react/24/solid';

const ONBOARDING_STEPS = [
  {
    icon: <HomeIcon className="w-16 h-16 text-primary" />,
    title: 'Bem-vindo(a) à sua Central de Comando!',
    description: 'No Dashboard, você tem uma visão geral e rápida do seu progresso financeiro, dicas diárias e acesso fácil a todas as ferramentas.',
  },
  {
    icon: <WrenchScrewdriverIcon className="w-16 h-16 text-primary" />,
    title: 'Transforme Metas em Ação',
    description: 'Use o Multiplicador Financeiro para definir sua meta mensal e receber estratégias diárias geradas por IA para alcançá-la.',
  },
  {
    icon: <ChartPieIcon className="w-16 h-16 text-primary" />,
    title: 'Organize Suas Finanças',
    description: 'Registre suas entradas e saídas de forma simples e visualize seus gastos com gráficos intuitivos para manter tudo sob controle.',
  },
];

interface OnboardingPageProps {
  onComplete: () => void;
  children: React.ReactNode;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete, children }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const step = ONBOARDING_STEPS[currentStep];

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 filter blur-sm brightness-50">
        {children}
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="w-full max-w-md bg-light-card dark:bg-dark-1 rounded-2xl shadow-2xl p-8 text-center animate-fade-in">
          <div className="mx-auto mb-6">{step.icon}</div>
          
          <h2 className="text-2xl font-display font-bold text-light-text dark:text-white-text mb-4">{step.title}</h2>
          
          <p className="text-light-text-secondary dark:text-gray-300 mb-8">{step.description}</p>
          
          <div className="flex justify-center space-x-2 mb-8">
            {ONBOARDING_STEPS.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentStep === index ? 'bg-primary scale-125' : 'bg-light-border dark:bg-dark-2'
                }`}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onComplete}
              className="w-full text-sm font-semibold text-light-text-secondary dark:text-gray-400 py-3 px-4 rounded-lg hover:bg-light-border dark:hover:bg-dark-2 transition"
            >
              Pular
            </button>
            <button
              onClick={handleNext}
              className="w-full bg-neon-green text-secondary font-display font-bold py-3 px-4 rounded-lg hover:brightness-110 transition"
            >
              {currentStep === ONBOARDING_STEPS.length - 1 ? 'Concluir' : 'Próximo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
