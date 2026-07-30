'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

type AlternatePaths = {
  tr?: string;
  en?: string;
} | null;

type RouteTranslationContextType = {
  alternatePaths: AlternatePaths;
  setAlternatePaths: (paths: AlternatePaths) => void;
};

const RouteTranslationContext = createContext<RouteTranslationContextType | undefined>(undefined);

export function RouteTranslationProvider({ children }: { children: React.ReactNode }) {
  const [alternatePaths, setAlternatePaths] = useState<AlternatePaths>(null);
  const value = useMemo(() => ({ alternatePaths, setAlternatePaths }), [alternatePaths]);

  return (
    <RouteTranslationContext.Provider value={value}>
      {children}
    </RouteTranslationContext.Provider>
  );
}

export function useRouteTranslation() {
  const context = useContext(RouteTranslationContext);
  return context;
}
