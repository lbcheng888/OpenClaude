// ============================================================
// 1:1 from binary: Onboarding wizard (Z#337 ASK)
//
// Multi-step setup flow:
//  1. Preflight check (OAuth availability)
//  2. Theme selection
//  3. API key entry (if needed)
//  4. OAuth login (if available)
//  5. Security notes
//  6. Terminal setup (if Apple Terminal)
// ============================================================

import React, { useState, useEffect, useMemo } from "react";
import { Box, Text } from "@anthropic/ink";

interface OnboardingStep {
  id: string;
  component: React.ReactElement;
}

interface Props {
  onDone: () => void;
}

// ============================================================
// Sub-components (1:1 from binary Z#337)
// ============================================================

/** Theme selector step */
function ThemeStep({ onSelect }: { onSelect: (theme: string) => void }) {
  return React.createElement(
    Box,
    { marginX: 1 },
    React.createElement(Text, null, "Choose your theme:"),
    React.createElement(Text, { dimColor: true }, " (run /theme to change later)"),
    React.createElement(
      Box,
      { marginY: 1, flexDirection: "column", gap: 1 },
      React.createElement(Text, { color: "cyan" }, "  [1] Dark (recommended)"),
      React.createElement(Text, null, "  [2] Light"),
      React.createElement(Text, null, "  [3] System")
    )
  );
}

/** Security notes step */
function SecurityNotes() {
  return React.createElement(
    Box,
    { flexDirection: "column", gap: 1, paddingLeft: 1 },
    React.createElement(Text, { bold: true }, "Security notes:"),
    React.createElement(
      Box,
      { flexDirection: "column", width: 70 },
      React.createElement(
        Box,
        { flexDirection: "column" },
        React.createElement(Text, null, "Claude can make mistakes"),
        React.createElement(
          Text,
          { dimColor: true },
          "Always review Claude's responses, especially when running code."
        )
      ),
      React.createElement(
        Box,
        { flexDirection: "column", marginTop: 1 },
        React.createElement(
          Text,
          null,
          "Due to prompt injection risks, only use with code you trust."
        ),
        React.createElement(
          Text,
          { dimColor: true },
          "See: https://code.claude.com/docs/en/security"
        )
      )
    )
  );
}

/** API Key entry step */
function ApiKeyStep({
  maskedKey,
  onDone,
}: {
  maskedKey: string;
  onDone: (skipped: boolean) => void;
}) {
  return React.createElement(
    Box,
    { flexDirection: "column", gap: 1, paddingLeft: 1 },
    React.createElement(Text, null, "API key detected:"),
    React.createElement(Text, { dimColor: true }, maskedKey),
    React.createElement(Text, null, "Press Enter to use this key, or Esc to skip.")
  );
}

/** Terminal setup step (Apple Terminal only) */
function TerminalSetup({ onDone }: { onDone: () => void }) {
  const terminal = process.env.TERM_PROGRAM || "";
  const isAppleTerminal = terminal === "Apple_Terminal";

  if (!isAppleTerminal) {
    onDone();
    return null;
  }

  return React.createElement(
    Box,
    { flexDirection: "column", gap: 1, paddingLeft: 1 },
    React.createElement(Text, { bold: true }, "Use Claude Code's terminal setup?"),
    React.createElement(
      Box,
      { flexDirection: "column", width: 70, gap: 1 },
      React.createElement(
        Text,
        null,
        "Option+Enter for newlines and visual bell (recommended)"
      ),
      React.createElement(
        Box,
        null,
        React.createElement(Text, { color: "green" }, "[Y] Yes, use recommended settings"),
        React.createElement(Text, null, "  "),
        React.createElement(Text, { dimColor: true }, "[N] No, maybe later with /terminal-setup")
      )
    )
  );
}

// ============================================================
// Main Onboarding Component
// ============================================================

export function Onboarding({ onDone }: Props) {
  const [step, setStep] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [theme, setTheme] = useState("dark");

  const advance = () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      onDone();
    }
  };

  const steps: OnboardingStep[] = useMemo(() => {
    const s: OnboardingStep[] = [];

    // Step 1: Theme selection
    s.push({
      id: "theme",
      component: React.createElement(ThemeStep, {
        onSelect: (t: string) => {
          setTheme(t);
          advance();
        },
      }),
    });

    // Step 2: API key (if set via env)
    const apiKey = process.env.ANTHROPIC_API_KEY || "";
    if (apiKey) {
      const masked = apiKey.slice(0, 7) + "..." + apiKey.slice(-4);
      s.push({
        id: "api-key",
        component: React.createElement(ApiKeyStep, {
          maskedKey: masked,
          onDone: (skip: boolean) => {
            setSkipped(skip);
            advance();
          },
        }),
      });
    }

    // Step 3: OAuth (if available)
    const oauthAvailable = !!process.env.ANTHROPIC_AUTH_TOKEN;
    if (oauthAvailable) {
      s.push({
        id: "oauth",
        component: React.createElement(
          Box,
          { paddingLeft: 1 },
          React.createElement(
            Text,
            null,
            skipped
              ? "OAuth login skipped. Run /login to authenticate later."
              : "OAuth token detected. Authenticated."
          )
        ),
      });
      // auto-advance past oauth if already have token
      setTimeout(advance, 100);
    }

    // Step 4: Security notes
    s.push({
      id: "security",
      component: React.createElement(SecurityNotes),
    });

    // Step 5: Terminal setup
    s.push({
      id: "terminal-setup",
      component: React.createElement(TerminalSetup, { onDone: advance }),
    });

    return s;
  }, []);

  // Handle keyboard
  useEffect(() => {
    const { stdin } = process;
    if (!stdin?.isTTY) return;

    const onData = (chunk: Buffer) => {
      const char = chunk.toString();
      if (char === "\r" || char === "\n") advance();
      if (char === "1") { setTheme("dark"); advance(); }
      if (char === "2") { setTheme("light"); advance(); }
      if (char === "3") { setTheme("system"); advance(); }
      if (char === "y" || char === "Y") advance();
      if (char === "n" || char === "N") advance();
    };

    stdin.on("data", onData);
    return () => void stdin.removeListener("data", onData);
  }, [step]);

  if (step >= steps.length) {
    onDone();
    return null;
  }

  const current = steps[step];
  if (!current) return null;

  return React.createElement(
    Box,
    { flexDirection: "column", padding: 1 },
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { bold: true, color: "cyan" }, "Welcome to Claude Code"),
      React.createElement(
        Text,
        { dimColor: true },
        `  Step ${step + 1}/${steps.length}: ${current.id}`
      )
    ),
    current.component,
    React.createElement(
      Box,
      { marginTop: 2 },
      React.createElement(Text, { dimColor: true }, "Press Enter to continue...")
    )
  );
}
