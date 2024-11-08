import React, { createContext, useContext, useState } from 'react';

interface ConfigContextType {
  startDay: string;
  theme: 'light' | 'dark' | 'system';
  setStartDay: (day: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [startDay, setStartDay] = useState<string>('Lunes');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  return (
    <ConfigContext.Provider value={{ startDay, theme, setStartDay, setTheme }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};