
import React from 'react';
import { HomeIcon, WrenchScrewdriverIcon, ChartPieIcon, TrophyIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: <HomeIcon className="w-6 h-6" /> },
  { path: '/tools', label: 'Ferramentas', icon: <WrenchScrewdriverIcon className="w-6 h-6" /> },
  { path: '/finances', label: 'Finanças', icon: <ChartPieIcon className="w-6 h-6" /> },
  { path: '/rewards', label: 'Recompensas', icon: <TrophyIcon className="w-6 h-6" /> },
  { path: '/settings', label: 'Ajustes', icon: <Cog6ToothIcon className="w-6 h-6" /> },
];
