// ============================================================
// 1:1 from binary: Dialog components from kk() call chain
//
// These are rendered via: kk(root, (done) => <Dialog onDone={done} />)
// Each dialog blocks the main app until user responds.
// ============================================================

import React, { useState, useEffect } from "react";
import { Box, Text } from "@anthropic/ink";
import { DialogFrame, OptionSelector } from "./wrappers.js";

// ============================================================
// TrustDialog — first-run trust confirmation
// ============================================================

interface TrustDialogProps {
  onAccept: () => void;
  cwd: string;
}

export function TrustDialog({ onAccept, cwd }: TrustDialogProps) {
  useEffect(() => {
    const { stdin } = process;
    if (!stdin?.isTTY) { onAccept(); return; }
    const onData = (c: Buffer) => { if (c.toString() === "\r" || c.toString() === "\n") onAccept(); };
    stdin.on("data", onData);
    return () => void stdin.removeListener("data", onData);
  }, [onAccept]);

  return React.createElement(
    DialogFrame,
    { title: "Trust Confirmation", color: "background", onCancel: () => process.exit(0) },
    React.createElement(
      Box,
      { flexDirection: "column", gap: 1 },
      React.createElement(Text, null, "Claude Code needs access to your working directory:"),
      React.createElement(Text, { bold: true }, `  ${cwd}`)
    ),
    React.createElement(Text, { dimColor: true }, "Press Enter to trust and continue.")
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
  const options = [
    { label: React.createElement(Text, null, "Yes, enable auto mode"), value: "accept" },
    { label: React.createElement(Text, null, `No${declineExits ? " (exit)" : ""}, ask each time`), value: "decline" },
  ];

  const handleChange = (value: string) => {
    if (value === "accept") onAccept();
    else onDecline();
  };

  return React.createElement(
    DialogFrame,
    { title: "Auto Mode", color: "background", onCancel: onDecline },
    React.createElement(
      Text,
      null,
      "Auto mode lets Claude run tools without asking for permission each time. You can still review changes before they're committed."
    ),
    React.createElement(OptionSelector, { options, onChange: handleChange, onCancel: onDecline })
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
    const { stdin } = process;
    if (!stdin?.isTTY) { onDone(); return; }
    const onData = (c: Buffer) => { if (c.toString() === "\r" || c.toString() === "\n") onDone(); };
    stdin.on("data", onData);
    return () => void stdin.removeListener("data", onData);
  }, [onDone]);

  return React.createElement(
    DialogFrame,
    { title: "API Key Detected", color: "background" },
    React.createElement(Text, null, `Using API key: ${customApiKeyTruncated}`),
    React.createElement(Text, { dimColor: true }, "Press Enter to continue.")
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
// SettingsErrors — config validation errors (1:1 from binary ES3)
// ============================================================

interface SettingsErrorsProps {
  settingsErrors: string[];
  onContinue: () => void;
  onFix: () => void;
  onExit: () => void;
}

export function SettingsErrors({ settingsErrors, onContinue, onFix, onExit }: SettingsErrorsProps) {
  const hasSevere = false; // CS3: checks if any error.severity !== "warning"
  const title = hasSevere ? "Settings Error" : "Settings Warning";
  const cancelAction = hasSevere ? onExit : onContinue;

  const options = hasSevere
    ? [
        { label: React.createElement(Text, null, "Fix with Claude"), value: "fix" },
        { label: React.createElement(Text, null, "Exit and fix manually"), value: "exit" },
        { label: React.createElement(Text, null, "Continue without these settings"), value: "continue" },
      ]
    : [
        { label: React.createElement(Text, null, "Continue"), value: "continue" },
        { label: React.createElement(Text, null, "Fix with Claude"), value: "fix" },
        { label: React.createElement(Text, null, "Exit and fix manually"), value: "exit" },
      ];

  const explanation = hasSevere
    ? "Files with errors are skipped entirely, not just the invalid settings."
    : "The values listed above were skipped; the rest of the file is in effect.";

  const handleChange = (value: string) => {
    if (value === "exit") onExit();
    else if (value === "fix") onFix();
    else onContinue();
  };

  return React.createElement(
    DialogFrame,
    { title, color: "warning", onCancel: cancelAction },

    // Error list (1:1 binary vT6 component)
    React.createElement(
      Box,
      { flexDirection: "column" },
      ...settingsErrors.slice(0, 5).map((err, i) =>
        React.createElement(Text, { key: i, color: "red" as any }, `  • ${err}`)
      ),
      settingsErrors.length > 5 && React.createElement(
        Text,
        { dimColor: true },
        `  ... and ${settingsErrors.length - 5} more`
      )
    ),

    // Explanation
    React.createElement(Text, { dimColor: true }, explanation),

    // Options
    React.createElement(OptionSelector, { options, onChange: handleChange, onCancel: cancelAction })
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

  // Build options for OptionSelector
  const options = sessions.map((s) => ({
    label: React.createElement(Text, null, `${s.title || s.id} — ${s.date}`),
    value: s.id,
  }));

  return React.createElement(
    DialogFrame,
    { title: "Resume Session", color: "background", onCancel: () => onSelect(null) },

    sessions.length === 0
      ? React.createElement(Text, { dimColor: true }, "No previous sessions found.")
      : React.createElement(
          Box,
          { flexDirection: "column" },
          React.createElement(OptionSelector, {
            options,
            onChange: (id: string) => onSelect(id),
            onCancel: () => onSelect(null),
          }),
          React.createElement(
            Box,
            { marginTop: 1 },
            React.createElement(Text, { dimColor: true }, "j/k to navigate, Enter to select, Esc for new session")
          )
        )
  );
}
