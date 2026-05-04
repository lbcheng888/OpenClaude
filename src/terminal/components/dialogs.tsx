// ============================================================
// 1:1 from binary: Dialog components from kk() call chain
//
// These are rendered via: kk(root, (done) => <Dialog onDone={done} />)
// Each dialog blocks the main app until user responds.
// ============================================================

import React, { useState, useEffect } from "react";
import { Box, Text } from "ink";

// ============================================================
// TrustDialog — first-run trust confirmation
// ============================================================

interface TrustDialogProps {
  onAccept: () => void;
  cwd: string;
}

export function TrustDialog({ onAccept, cwd }: TrustDialogProps) {
  useEffect(() => {
    // Auto-accept after 1s for demo
    const t = setTimeout(onAccept, 1000);
    return () => clearTimeout(t);
  }, [onAccept]);

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="yellow">⚠ Trust Confirmation</Text>
      </Box>
      <Box flexDirection="column" width={70}>
        <Text>
          Claude Code needs access to your working directory:
        </Text>
        <Text bold>  {cwd}</Text>
        <Box marginTop={1}>
          <Text dimColor>Press Enter to trust and continue.</Text>
        </Box>
      </Box>
    </Box>
  );
}

// ============================================================
// AutoModeOptInDialog
// ============================================================

interface AutoModeOptInProps {
  onAccept: () => void;
  onDecline: () => void;
  declineExits?: boolean;
}

export function AutoModeOptInDialog({ onAccept, onDecline, declineExits }: AutoModeOptInProps) {
  const [selected, setSelected] = useState<"accept" | "decline">("accept");

  useEffect(() => {
    const { stdin } = process;
    if (!stdin?.isTTY) return;

    const onData = (chunk: Buffer) => {
      const char = chunk.toString();
      if (char === "\r" || char === "\n") {
        selected === "accept" ? onAccept() : onDecline();
      }
      if (char === "y" || char === "Y") {
        setSelected("accept");
        onAccept();
      }
      if (char === "n" || char === "N") {
        setSelected("decline");
        onDecline();
      }
      if (char === "\t") setSelected((s) => (s === "accept" ? "decline" : "accept"));
    };

    stdin.on("data", onData);
    return () => void stdin.removeListener("data", onData);
  }, [selected, onAccept, onDecline]);

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">Auto Mode</Text>
      </Box>
      <Box flexDirection="column" width={70}>
        <Text>
          Auto mode lets Claude run tools without asking for permission each time.
          You can still review changes before they&apos;re committed.
        </Text>
        <Box marginTop={1} flexDirection="column">
          <Text color={selected === "accept" ? "green" : undefined}>
            {selected === "accept" ? "❯ " : "  "}[Y] Yes, enable auto mode
          </Text>
          <Text color={selected === "decline" ? "red" : undefined}>
            {selected === "decline" ? "❯ " : "  "}[N] No{declineExits ? " (exit)" : ""}, ask each time
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

// ============================================================
// ApproveApiKey — confirm API key usage
// ============================================================

interface ApproveApiKeyProps {
  customApiKeyTruncated: string;
  onDone: () => void;
}

export function ApproveApiKey({ customApiKeyTruncated, onDone }: ApproveApiKeyProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 1500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">API Key Detected</Text>
      </Box>
      <Box flexDirection="column" width={70}>
        <Text>Using API key: {customApiKeyTruncated}</Text>
        <Text dimColor>Press Enter to continue.</Text>
      </Box>
    </Box>
  );
}

// ============================================================
// TeamOnboarding — team setup wizard
// ============================================================

interface TeamOnboardingProps {
  onDone: () => void;
}

export function TeamOnboarding({ onDone }: TeamOnboardingProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">Team Setup</Text>
      </Box>
      <Box>
        <Text dimColor>Loading team configuration...</Text>
      </Box>
    </Box>
  );
}

// ============================================================
// SettingsErrors — config validation errors
// ============================================================

interface SettingsErrorsProps {
  settingsErrors: string[];
  onContinue: () => void;
  onFix: () => void;
  onExit: () => void;
}

export function SettingsErrors({ settingsErrors, onContinue, onFix, onExit }: SettingsErrorsProps) {
  const [selected, setSelected] = useState<"continue" | "fix" | "exit">("continue");

  useEffect(() => {
    const { stdin } = process;
    if (!stdin?.isTTY) { onContinue(); return; }

    const onData = (chunk: Buffer) => {
      const char = chunk.toString();
      if (char === "\r" || char === "\n") {
        if (selected === "continue") onContinue();
        else if (selected === "fix") onFix();
        else onExit();
      }
      if (char === "\t") {
        setSelected((s) => (s === "continue" ? "fix" : s === "fix" ? "exit" : "continue"));
      }
    };

    stdin.on("data", onData);
    return () => void stdin.removeListener("data", onData);
  }, [selected, onContinue, onFix, onExit]);

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="red">⚠ Configuration Errors</Text>
      </Box>
      <Box flexDirection="column" width={70}>
        {settingsErrors.slice(0, 5).map((err, i) => (
          <Text key={i} color="red">  • {err}</Text>
        ))}
        {settingsErrors.length > 5 && (
          <Text dimColor>  ... and {settingsErrors.length - 5} more</Text>
        )}
        <Box marginTop={1} flexDirection="column">
          <Text color={selected === "continue" ? "green" : undefined}>
            {selected === "continue" ? "❯ " : "  "}Continue anyway
          </Text>
          <Text color={selected === "fix" ? "yellow" : undefined}>
            {selected === "fix" ? "❯ " : "  "}Open settings to fix
          </Text>
          <Text color={selected === "exit" ? "red" : undefined}>
            {selected === "exit" ? "❯ " : "  "}Exit
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

// ============================================================
// ResumeConversation — resume previous session
// ============================================================

interface ResumeConversationProps {
  sessions: { id: string; title: string; date: string }[];
  onSelect: (id: string | null) => void;
}

export function ResumeConversation({ sessions, onSelect }: ResumeConversationProps) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const { stdin } = process;
    if (!stdin?.isTTY || sessions.length === 0) { onSelect(null); return; }

    const onData = (chunk: Buffer) => {
      const char = chunk.toString();
      if (char === "\r" || char === "\n") {
        onSelect(sessions[selected]?.id || null);
      }
      if (char === "j" || char === "\x1b[B") setSelected((s) => Math.min(s + 1, sessions.length - 1));
      if (char === "k" || char === "\x1b[A") setSelected((s) => Math.max(s - 1, 0));
      if (char === "\x1b") onSelect(null);
    };

    stdin.on("data", onData);
    return () => void stdin.removeListener("data", onData);
  }, [selected, sessions, onSelect]);

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">Resume Session</Text>
      </Box>
      <Box flexDirection="column">
        {sessions.length === 0 ? (
          <Text dimColor>No previous sessions found.</Text>
        ) : (
          sessions.map((s, i) => (
            <Text key={s.id} color={i === selected ? "green" : undefined}>
              {i === selected ? "❯ " : "  "}{s.title || s.id} — {s.date}
            </Text>
          ))
        )}
        <Box marginTop={1}>
          <Text dimColor>j/k to navigate, Enter to select, Esc for new session</Text>
        </Box>
      </Box>
    </Box>
  );
}
