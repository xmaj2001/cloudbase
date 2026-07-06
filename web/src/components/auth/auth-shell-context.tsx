'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthShellContextType {
  eyebrow: string;
  title: string;
  subtitle: ReactNode | string;
  rightFooter: ReactNode | null;
  setShellConfig: (config: {
    eyebrow?: string;
    title: string;
    subtitle?: ReactNode | string;
    rightFooter?: ReactNode | null;
  }) => void;
}

const AuthShellContext = createContext<AuthShellContextType | undefined>(undefined);

export function AuthShellProvider({ children }: { children: ReactNode }) {
  const [eyebrow, setEyebrow] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState<ReactNode | string>('');
  const [rightFooter, setRightFooter] = useState<ReactNode | null>(null);

  const setShellConfig = (config: {
    eyebrow?: string;
    title: string;
    subtitle?: ReactNode | string;
    rightFooter?: ReactNode | null;
  }) => {
    setEyebrow(config.eyebrow ?? '');
    setTitle(config.title);
    setSubtitle(config.subtitle ?? '');
    setRightFooter(config.rightFooter ?? null);
  };

  return (
    <AuthShellContext.Provider value={{ eyebrow, title, subtitle, rightFooter, setShellConfig }}>
      {children}
    </AuthShellContext.Provider>
  );
}

// Hook para os filhos atualizarem a shell dinamicamente
export function useAuthShell() {
  const context = useContext(AuthShellContext);
  if (!context) {
    throw new Error('useAuthShell deve ser usado dentro de um AuthShellProvider');
  }
  return context;
}