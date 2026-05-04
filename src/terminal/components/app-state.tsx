// ============================================================
// 1:1 from binary: qD component — AppState Context Provider
//
// Wraps the entire app in a React context that provides
// onChangeAppState callback for global state mutations.
// ============================================================

import React, { createContext, useContext, useCallback, type ReactNode } from "react";

interface AppStateContextValue {
  onChangeAppState?: (updater: (prev: any) => any) => void;
}

const AppStateContext = createContext<AppStateContextValue>({});

export function useAppState(): AppStateContextValue {
  return useContext(AppStateContext);
}

interface Props {
  children?: ReactNode;
  onChangeAppState?: (state: any) => void;
}

export function AppStateProvider({ children, onChangeAppState }: Props) {
  const handleChange = useCallback(
    (updater: (prev: any) => any) => {
      onChangeAppState?.(updater);
    },
    [onChangeAppState]
  );

  return React.createElement(
    AppStateContext.Provider,
    { value: { onChangeAppState: handleChange } },
    children
  );
}
