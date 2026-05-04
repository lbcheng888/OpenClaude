// ============================================================
// 1:1 from binary Z blocks - Batch 2
// ============================================================
// Z#146 EGK: Vim Mode Handler
// Z#150 UGK: Keyboard Shortcuts Guide
// Z#166 yRK: Session Color/Theme
// Z#063 BnH: Tool progress components
// Z#079 cPK: Plan Mode Entry Dialog
// Z#114 VWK: Sandbox Violation Banner
// Z#047 _KH: Permission Result Display
// Z#023 pfK: Team Lead Banner
// ============================================================

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Box, Text, useInput } from "ink";

// ============================================================
// Z#146 EGK — Vim Mode Handler
// ============================================================
// Manages INSERT/NORMAL/VISUAL modes for text input.
// Tracks selection anchor, linewise/characterwise mode.

type VimMode = "INSERT" | "NORMAL" | "VISUAL" | "VISUAL LINE";

interface VimState {
  mode: VimMode;
  anchor: number;
  kind: "character" | "line";
  offset: number;
}

export function useVimMode(): {
  vimState: VimState;
  setVimOffset: (offset: number) => void;
  handleVimKey: (char: string, key: { upArrow?: boolean; downArrow?: boolean; escape?: boolean; return?: boolean }) => boolean;
} {
  const vimRef = useRef<VimState>({
    mode: "INSERT",
    anchor: 0,
    kind: "character",
    offset: 0,
  });

  const setVimOffset = useCallback((offset: number) => {
    if (offset !== undefined) vimRef.current.offset = offset;
  }, []);

  const handleVimKey = useCallback(
    (char: string, key: { upArrow?: boolean; downArrow?: boolean; escape?: boolean; return?: boolean }): boolean => {
      const state = vimRef.current;

      // ESC: enter NORMAL mode
      if (key.escape) {
        if (state.mode === "INSERT") {
          state.mode = "NORMAL";
          return true; // handled
        }
        if (state.mode === "VISUAL" || state.mode === "VISUAL LINE") {
          state.mode = "NORMAL";
          return true;
        }
        return false;
      }

      // NORMAL mode commands
      if (state.mode === "NORMAL") {
        switch (char) {
          case "i": state.mode = "INSERT"; return true;
          case "a": state.mode = "INSERT"; return true; // append
          case "v": state.mode = "VISUAL"; state.kind = "character"; return true;
          case "V": state.mode = "VISUAL LINE"; state.kind = "line"; return true;
          case "h": return true; // left
          case "j": return true; // down
          case "k": return true; // up
          case "l": return true; // right
          case "0": return true; // start of line
          case "$": return true; // end of line
          case "w": return true; // next word
          case "b": return true; // prev word
          case "x": return true; // delete char
          case "d": return true; // delete (pending motion)
          case "y": return true; // yank (pending motion)
          case "p": return true; // paste
          case "u": return true; // undo
          case "/": return true; // search
          default: return true; // swallow all keys in normal mode
        }
      }

      return false; // not handled
    },
    []
  );

  return {
    vimState: vimRef.current,
    setVimOffset,
    handleVimKey,
  };
}

// ============================================================
// Z#150 UGK — Keyboard Shortcuts Guide
// ============================================================

interface ShortcutDef {
  keys: string[];
  action: string;
}

const APP_SHORTCUTS: ShortcutDef[] = [
  { keys: ["Ctrl+O"], action: "Toggle transcript" },
  { keys: ["Ctrl+C"], action: "Exit" },
  { keys: ["Ctrl+D"], action: "Exit (EOF)" },
  { keys: ["Esc"], action: "Enter NORMAL mode" },
  { keys: ["Shift+Tab"], action: "Cycle permission mode" },
  { keys: ["Ctrl+X Ctrl+K"], action: "Kill agents" },
  { keys: ["Ctrl+X Ctrl+H"], action: "Hide/show agents" },
  { keys: ["Shift+H"], action: "Hide/show all agents" },
  { keys: ["Up/Down"], action: "Navigate history" },
  { keys: ["Enter"], action: "Send message / Confirm" },
  { keys: ["Tab"], action: "Cycle options" },
];

export function KeyboardShortcutsGuide(): React.ReactElement {
  return React.createElement(
    Box,
    { flexDirection: "column", padding: 1 },
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { bold: true }, "Keyboard Shortcuts")
    ),
    ...APP_SHORTCUTS.map((sc) =>
      React.createElement(
        Box,
        { key: sc.action },
        React.createElement(Text, { dimColor: true }, sc.keys.join(" / ").padEnd(20)),
        React.createElement(Text, null, sc.action)
      )
    )
  );
}

// ============================================================
// Z#114 VWK — Sandbox Violation Banner
// ============================================================

interface SandboxViolationBannerProps {
  violationCount: number;
  onDismiss?: () => void;
}

export function SandboxViolationBanner({ violationCount, onDismiss }: SandboxViolationBannerProps): React.ReactElement | null {
  if (violationCount === 0) return null;

  const label = violationCount === 1 ? "operation" : "operations";
  const shortcut = "Ctrl+O";

  return React.createElement(
    Box,
    { paddingX: 0, paddingY: 0 },
    React.createElement(
      Text,
      { color: "inactive" },
      `⧈ Sandbox blocked ${violationCount} ${label} · ${shortcut} for details · /sandbox to disable`
    )
  );
}

// ============================================================
// Z#079 cPK — Plan Mode Entry Dialog
// ============================================================

interface PlanModeDialogProps {
  onEnter: () => void;
  onCancel: () => void;
  workerBadge?: { name: string; color: string };
}

export function PlanModeEntryDialog({ onEnter, onCancel, workerBadge }: PlanModeDialogProps): React.ReactElement {
  const [selected, setSelected] = useState<"enter" | "cancel">("enter");

  // Handle keyboard
  useEffect(() => {
    const { stdin } = process;
    if (!stdin?.isTTY) return;

    const onData = (chunk: Buffer) => {
      const char = chunk.toString();
      if (char === "\r" || char === "\n") {
        selected === "enter" ? onEnter() : onCancel();
      }
      if (char === "\t") setSelected((s) => (s === "enter" ? "cancel" : "enter"));
      if (char === "\x1b") onCancel();
    };

    stdin.on("data", onData);
    return () => void stdin.removeListener("data", onData);
  }, [selected, onEnter, onCancel]);

  const worker = workerBadge?.name || "";

  return React.createElement(
    Box,
    { flexDirection: "column", padding: 1 },
    // Header
    worker && React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { color: "cyan" }, `[${worker}] `),
      React.createElement(Text, { bold: true, color: "planMode" as any }, "Enter Plan Mode?")
    ),

    // Description
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(
        Text,
        { dimColor: true },
        "No code changes will be made until the plan is approved. You'll be able to explore, research, and design your approach before any edits or tool calls are executed."
      )
    ),

    // Options
    React.createElement(
      Box,
      { flexDirection: "column", marginBottom: 1 },
      React.createElement(
        Box,
        null,
        React.createElement(
          Text,
          { color: selected === "enter" ? "green" : undefined },
          selected === "enter" ? "❯ " : "  "
        ),
        React.createElement(Text, null, "[Y] Enter plan mode")
      ),
      React.createElement(
        Box,
        null,
        React.createElement(
          Text,
          { color: selected === "cancel" ? "red" : undefined },
          selected === "cancel" ? "❯ " : "  "
        ),
        React.createElement(Text, null, "[N] No, skip planning")
      )
    ),

    React.createElement(
      Box,
      null,
      React.createElement(Text, { dimColor: true }, "Enter to confirm · Tab to toggle · Esc to cancel")
    )
  );
}

// ============================================================
// Z#047 _KH — Permission Result Display
// ============================================================

interface PermissionResultProps {
  permissionResult: {
    behavior: "allow" | "deny" | "ask";
    message?: string;
    decisionReason?: { type: string; reason?: string };
  };
  toolType?: string;
}

export function PermissionResultDisplay({ permissionResult, toolType }: PermissionResultProps): React.ReactElement {
  const { behavior, message, decisionReason } = permissionResult;

  const statusColor =
    behavior === "allow" ? "green" : behavior === "deny" ? "red" : "yellow";
  const statusIcon =
    behavior === "allow" ? "✓" : behavior === "deny" ? "✗" : "?";

  return React.createElement(
    Box,
    { marginBottom: 1 },
    React.createElement(
      Box,
      { flexDirection: "column" },
      React.createElement(
        Box,
        null,
        React.createElement(Text, { color: statusColor }, `${statusIcon} `),
        React.createElement(Text, { bold: true }, `${toolType || "Tool"} permission: ${behavior}`)
      ),
      message && React.createElement(
        Box,
        null,
        React.createElement(Text, { dimColor: true }, message)
      ),
      decisionReason && React.createElement(
        Box,
        null,
        React.createElement(
          Text,
          { dimColor: true },
          `Reason: ${decisionReason.type}${decisionReason.reason ? ` — ${decisionReason.reason}` : ""}`
        )
      )
    )
  );
}

// ============================================================
// Z#023 pfK — Team Lead Banner
// ============================================================

interface TeamLeadBannerProps {
  name?: string;
  color?: string;
}

export function TeamLeadBanner({ name, color }: TeamLeadBannerProps): React.ReactElement | null {
  if (!name || !color) return null;

  return React.createElement(
    Box,
    { marginBottom: 1 },
    React.createElement(Text, { color }, `[Team Lead: ${name}]`)
  );
}

// ============================================================
// Z#166 yRK — Session Color / Pride Gradient
// ============================================================

interface PrideGradient {
  colors: string[];
  text: string;
}

export function PrideGradientText({ gradient }: { gradient?: PrideGradient }): React.ReactElement | null {
  if (!gradient?.colors?.length) return null;

  return React.createElement(
    Box,
    null,
    ...gradient.text.split("").map((char, i) =>
      React.createElement(
        Text,
        {
          key: i,
          color: gradient.colors[i % gradient.colors.length] as any,
        },
        char
      )
    )
  );
}

// ============================================================
// Z#063 BnH — Tool Progress Indicator (kD6, w23, T23)
// ============================================================

interface ToolProgressProps {
  toolUseID: string;
  data?: {
    type: string;
    statusMessage?: string;
    hookEvent?: string;
  };
  completedCount?: number;
  totalCount?: number;
}

export function ToolProgressIndicator({ toolUseID, data, completedCount, totalCount }: ToolProgressProps): React.ReactElement | null {
  const isHookProgress = data?.type === "progress" && data?.hookEvent;
  const statusMsg = data?.statusMessage;

  // For hook progress (Stop/SubagentStop hooks)
  if (isHookProgress && statusMsg) {
    if (totalCount === 1) return React.createElement(Text, { dimColor: true }, `${statusMsg}…`);
    if (completedCount !== undefined && totalCount !== undefined) {
      return React.createElement(
        Text,
        { dimColor: true },
        `${statusMsg}… ${completedCount}/${totalCount}`
      );
    }
    return React.createElement(Text, { dimColor: true }, `${statusMsg}…`);
  }

  return null;
}
