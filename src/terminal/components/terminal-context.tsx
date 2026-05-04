// ============================================================
// 1:1 from binary: lD component — Terminal Context Provider
//
// Manages terminal-specific state: raw mode, columns, rows,
// stdin/stdout wrappers. Used by all Ink components.
// ============================================================

import React, { createContext, useContext, type ReactNode } from "react";

interface TerminalContextValue {
  columns: number;
  rows: number;
}

const TerminalContext = createContext<TerminalContextValue>({
  columns: process.stdout.columns || 80,
  rows: process.stdout.rows || 24,
});

export function useTerminal(): TerminalContextValue {
  return useContext(TerminalContext);
}

interface Props {
  children?: ReactNode;
}

export function TerminalProvider({ children }: Props) {
  const value: TerminalContextValue = {
    columns: process.stdout.columns || 80,
    rows: process.stdout.rows || 24,
  };

  return React.createElement(
    TerminalContext.Provider,
    { value },
    children
  );
}
