import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import ToolsPage from './pages/ToolsPage';
import FinancesPage from './pages/FinancesPage';
import RewardsPage from './pages/RewardsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import { TransactionsProvider } from './contexts/TransactionsContext';

type Theme = 'dark' | 'light';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = () => {
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    setIsLoggedIn(true);
    if (!onboardingCompleted) {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setShowOnboarding(false);
  };

  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  const MainApp = () => (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/finances" element={<FinancesPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <TransactionsProvider>
        {!isLoggedIn ? (
          <LoginPage onLogin={handleLogin} />
        ) : showOnboarding ? (
          <OnboardingPage onComplete={handleOnboardingComplete}>
              <MainApp />
          </OnboardingPage>
        ) : (
          <MainApp />
        )}
      </TransactionsProvider>
    </ThemeContext.Provider>
  );
}

export default App;
