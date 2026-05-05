import React, { useEffect, useState, type ReactElement, type ReactNode } from "react";
import { Box, Text } from "@anthropic/ink";

type DialogProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  onCancel?: () => void;
  color?: string;
  hideInputGuide?: boolean;
  hideBorder?: boolean;
  inputGuide?: (state: { pending: boolean; keyName: string }) => ReactNode;
};

export function Dialog({
  title,
  subtitle,
  children,
  onCancel,
  color = "yellow",
  hideInputGuide,
  hideBorder,
  inputGuide,
}: DialogProps): ReactElement {
  useEffect(() => {
    if (!onCancel || !process.stdin.isTTY) return;
    const onData = (chunk: Buffer) => {
      const value = chunk.toString();
      if (value === "\x1b" || value === "n" || value === "N") onCancel();
    };
    process.stdin.on("data", onData);
    return () => {
      process.stdin.removeListener("data", onData);
    };
  }, [onCancel]);

  const content = (
    <Box flexDirection="column">
      <Box flexDirection="column">
        <Text bold color={color}>{title}</Text>
        {subtitle && <Text dimColor>{subtitle}</Text>}
      </Box>
      {children}
      {!hideInputGuide && (
        <Box marginTop={1}>
          {inputGuide ? inputGuide({ pending: false, keyName: "Esc" }) : <Text dimColor>Enter to confirm · Esc to cancel</Text>}
        </Box>
      )}
    </Box>
  );

  if (hideBorder) return content;
  return (
    <Box flexDirection="column" borderStyle="round" borderColor={color} paddingX={1}>
      {content}
    </Box>
  );
}

type Option = {
  label: ReactElement | string;
  value: string;
};

type SelectProps = {
  options: Option[];
  onChange: (value: string) => void;
  onCancel?: () => void;
};

export function Select({ options, onChange, onCancel }: SelectProps): ReactElement {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!process.stdin.isTTY) {
      if (options[0]) onChange(options[0].value);
      return;
    }

    const onData = (chunk: Buffer) => {
      const value = chunk.toString();
      if (value === "\r" || value === "\n") {
        if (options[selectedIndex]) onChange(options[selectedIndex].value);
      } else if (value === "\t") {
        setSelectedIndex(current => (current + 1) % options.length);
      } else if (value === "\x1b[A" || value === "k") {
        setSelectedIndex(current => Math.max(0, current - 1));
      } else if (value === "\x1b[B" || value === "j") {
        setSelectedIndex(current => Math.min(options.length - 1, current + 1));
      } else if (value === "\x1b" && onCancel) {
        onCancel();
      }
    };

    process.stdin.on("data", onData);
    return () => {
      process.stdin.removeListener("data", onData);
    };
  }, [onCancel, onChange, options, selectedIndex]);

  return (
    <Box flexDirection="column" marginTop={1}>
      {options.map((option, index) => (
        <Box key={option.value}>
          <Text color={index === selectedIndex ? "green" : undefined}>{index === selectedIndex ? "❯ " : "  "}</Text>
          {typeof option.label === "string" ? <Text>{option.label}</Text> : option.label}
        </Box>
      ))}
    </Box>
  );
}

export { Dialog as DialogFrame, Select as OptionSelector };
