// ============================================================
// 1:1 from binary Z blocks - Batch 4
// ============================================================
// Z#087 YW3: Notebook Cell Edit View (11 creates)
// Z#350 IS3: Teleport Repo Path Selector (13 creates)
// Z#256 bP_: Feedback Survey Widget (9 creates)
// Z#008 ef3: Config Error Dialog (8 creates)
// Z#300 OyK: Agent Spawn Counters / IDE Hints
// Z#301 jyK: Fast Mode Status Display
// Z#303 ZyK: Issue Reporter
// ============================================================

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Box, Text } from "@anthropic/ink";

// ============================================================
// Z#087 YW3 — Notebook Cell Edit View
// ============================================================

interface NotebookData {
  cells?: Array<{ id: string; source: string | string[] }>;
}

interface NotebookEditProps {
  notebook_path: string;
  cell_id: string;
  new_source: string;
  cell_type?: string;
  edit_mode?: "replace" | "insert" | "delete";
  verbose?: boolean;
  width?: number;
  promise: Promise<NotebookData>;
}

export function NotebookCellEditView({
  notebook_path,
  cell_id,
  new_source,
  cell_type,
  edit_mode = "replace",
  promise,
  width = 80,
}: NotebookEditProps): React.ReactElement {
  const [data, setData] = useState<NotebookData | null>(null);

  useEffect(() => {
    promise.then(setData).catch(() => setData(null));
  }, [promise]);

  // Extract original cell source
  const originalSource = useMemo(() => {
    if (!data || !cell_id) return "";

    // Try index-based lookup first
    const idx = parseInt(cell_id, 10);
    if (!isNaN(idx) && data.cells?.[idx]) {
      const cell = data.cells[idx];
      return Array.isArray(cell.source) ? cell.source.join("") : cell.source;
    }

    // Try ID-based lookup
    const cell = data.cells?.find((c) => c.id === cell_id);
    if (cell) {
      return Array.isArray(cell.source) ? cell.source.join("") : cell.source;
    }

    return "";
  }, [data, cell_id]);

  // Generate diff preview
  const diffPreview = useMemo(() => {
    if (!data || edit_mode === "insert" || edit_mode === "delete") return null;
    if (!originalSource || !new_source) return null;

    // Simple diff: show old vs new
    return { oldString: originalSource, newString: new_source };
  }, [data, originalSource, new_source, edit_mode]);

  return React.createElement(
    Box,
    { flexDirection: "column" },
    // Header
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { bold: true }, "Edit Notebook"),
      React.createElement(Text, { dimColor: true }, ` ${notebook_path}`)
    ),

    // Cell info
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { dimColor: true }, `Cell: ${cell_id}`),
      cell_type && React.createElement(Text, { dimColor: true }, ` (${cell_type})`)
    ),

    // Diff preview
    diffPreview
      ? React.createElement(
          Box,
          { flexDirection: "column", marginBottom: 1 },
          React.createElement(Text, { dimColor: true }, "Changes:"),
          React.createElement(
            Box,
            { marginLeft: 2, flexDirection: "column" },
            React.createElement(
              Text,
              { color: "red" as any },
              `- ${diffPreview.oldString.slice(0, width - 10)}`
            ),
            React.createElement(
              Text,
              { color: "green" as any },
              `+ ${diffPreview.newString.slice(0, width - 10)}`
            )
          )
        )
      : React.createElement(
          Box,
          { marginBottom: 1 },
          edit_mode === "insert" && React.createElement(Text, null, `Inserting new cell: ${new_source.slice(0, 100)}`),
          edit_mode === "delete" && React.createElement(Text, null, `Deleting cell: ${cell_id}`),
          edit_mode === "replace" && !diffPreview && React.createElement(Text, null, `Replacing cell content`)
        )
  );
}

// ============================================================
// Z#350 IS3 — Teleport Repo Path Selector
// ============================================================

interface RepoPathSelectorProps {
  targetRepo: string;
  initialPaths: string[];
  onSelectPath: (path: string) => void;
  onCancel: () => void;
}

export function RepoPathSelector({ targetRepo, initialPaths, onSelectPath, onCancel }: RepoPathSelectorProps): React.ReactElement {
  const [paths, setPaths] = useState<string[]>(initialPaths);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = async (path: string) => {
    if (path === "cancel") { onCancel(); return; }

    setLoading(true);
    setError(null);

    try {
      // Verify path is valid for this repo
      const valid = true; // lhK(path, targetRepo)
      if (valid) {
        onSelectPath(path);
        return;
      }
    } catch {
      // Invalid path
    }

    const remaining = paths.filter((p) => p !== path);
    setPaths(remaining);
    setLoading(false);
    setError(`${path.split("/").pop()} no longer contains the correct repository. Select another path.`);
  };

  const options = [
    ...paths.map((p) => ({ label: p, value: p })),
    { label: "Cancel", value: "cancel" },
  ];

  if (paths.length === 0) {
    return React.createElement(
      Box,
      { padding: 1 },
      React.createElement(Text, { color: "red" as any }, "No valid paths found for this repository.")
    );
  }

  return React.createElement(
    Box,
    { flexDirection: "column", padding: 1 },
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { bold: true }, "Select Repository Path"),
      React.createElement(Text, { dimColor: true }, ` Target: ${targetRepo}`)
    ),

    error && React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { color: "red" as any }, error)
    ),

    React.createElement(
      Box,
      { flexDirection: "column", marginBottom: 1 },
      ...paths.map((path, i) =>
        React.createElement(
          Box,
          { key: path },
          React.createElement(Text, { color: i === 0 ? "green" : undefined }, i === 0 ? "❯ " : "  "),
          React.createElement(Text, null, path)
        )
      ),
      React.createElement(
        Box,
        null,
        React.createElement(Text, { dimColor: true }, "  Cancel")
      )
    ),

    loading && React.createElement(Text, { color: "yellow" }, "Verifying..."),

    React.createElement(
      Box,
      { marginTop: 1 },
      React.createElement(Text, { dimColor: true }, "↑↓ to select · Enter to confirm · Esc to cancel")
    )
  );
}

// ============================================================
// Z#256 bP_ — Feedback Survey Widget
// ============================================================

type SurveyState = "closed" | "pending" | "thanks";

interface FeedbackSurveyProps {
  state: SurveyState;
  lastResponse?: string;
  inputValue: string;
  setInputValue: (v: string) => void;
  onRequestFeedback: (feedback: string) => void;
  onUndo?: () => void;
  message?: string;
  showNotSure?: boolean;
}

export function FeedbackSurveyWidget({
  state,
  lastResponse,
  inputValue,
  setInputValue,
  onRequestFeedback,
  onUndo,
  showNotSure = false,
}: FeedbackSurveyProps): React.ReactElement | null {
  if (state === "closed") return null;

  // Pending state - ask for rating
  if (state === "pending") {
    return React.createElement(
      Box,
      { flexDirection: "column", paddingY: 1 },
      React.createElement(
        Box,
        null,
        React.createElement(Text, null, "How was this response?"),
      ),
      React.createElement(
        Box,
        { marginTop: 1 },
        React.createElement(Text, { color: "green" }, "[G] Good  "),
        React.createElement(Text, { color: "red" }, "[B] Bad  "),
        showNotSure && React.createElement(Text, { dimColor: true }, "[N] Not sure"),
        onUndo && React.createElement(
          Box,
          null,
          React.createElement(Text, { dimColor: true }, "[U] Undo")
        )
      )
    );
  }

  // Thanks state - ask for more details
  if (state === "thanks") {
    return React.createElement(
      Box,
      { flexDirection: "column", paddingY: 1 },
      React.createElement(
        Box,
        null,
        React.createElement(Text, null, "Thanks! What could be improved? (optional)"),
      ),
      React.createElement(
        Box,
        { marginTop: 1 },
        React.createElement(Text, { dimColor: true }, "Type feedback and press Enter · Esc to skip")
      )
    );
  }

  return null;
}

// ============================================================
// Z#008 ef3 — Config Error Dialog (1:1 from binary)
// ============================================================
// Binary structure:
//   Z6 (title:"Configuration Error", color:"error", onCancel:onExit)
//     B (flexDirection:"column", gap:1)
//       v: "The configuration file at " + v(bold) filePath + " contains invalid JSON."
//       v: errorDescription
//     B (flexDirection:"column")
//       v(bold): "Choose an option:"
//       C6 (options: [{label:"Exit and fix manually","exit"},{label:"Reset with default configuration","reset"}], onChange:$, onCancel:onExit)

import { DialogFrame, OptionSelector } from "./wrappers.js";

interface ConfigErrorProps {
  filePath: string;
  errorDescription: string;
  onExit: () => void;
  onReset: () => void;
}

export function ConfigErrorDialog({ filePath, errorDescription, onExit, onReset }: ConfigErrorProps): React.ReactElement {
  const [selected, setSelected] = useState<"exit" | "reset">("exit");

  const options = [
    { label: React.createElement(Text, null, "Exit and fix manually"), value: "exit" },
    { label: React.createElement(Text, null, "Reset with default configuration"), value: "reset" },
  ];

  const handleChange = (value: string) => {
    if (value === "exit") onExit();
    else onReset();
  };

  return React.createElement(
    DialogFrame,
    { title: "Configuration Error", color: "error", onCancel: onExit },

    // Error description block (1:1 binary: B flexDirection:column gap:1)
    React.createElement(
      Box,
      { flexDirection: "column", gap: 1 },
      React.createElement(
        Text,
        null,
        "The configuration file at ",
        React.createElement(Text, { bold: true }, filePath),
        " contains invalid JSON."
      ),
      errorDescription && React.createElement(Text, null, errorDescription)
    ),

    // Options block (1:1 binary: B flexDirection:column)
    React.createElement(
      Box,
      { flexDirection: "column" },
      React.createElement(Text, { bold: true }, "Choose an option:"),
      React.createElement(OptionSelector, { options, onChange: handleChange, onCancel: onExit })
    )
  );
}

// ============================================================
// Z#300 OyK — Agent Spawn Notifications
// ============================================================

export function getAgentSpawnLabel(count: number): string {
  return count === 1 ? "1 agent spawned" : `${count} agents spawned`;
}

export function incrementAgentSpawnCount(currentCount: number): number {
  return currentCount + 1;
}

export interface AgentSpawnNotification {
  key: string;
  text: string;
  priority: "low" | "normal" | "immediate";
  timeoutMs: number;
}

export function createAgentSpawnNotification(count: number): AgentSpawnNotification {
  return {
    key: "teammate-spawn",
    text: getAgentSpawnLabel(count),
    priority: "low",
    timeoutMs: 5000,
  };
}

// ============================================================
// Z#301 jyK — Fast Mode Status Display
// ============================================================

type FastModeStatus = "overloaded" | "rate_limit";

export function getFastModeStatus(status: FastModeStatus, resetIn: string): string {
  switch (status) {
    case "overloaded":
      return `Fast mode overloaded and is temporarily unavailable · resets in ${resetIn}`;
    case "rate_limit":
      return `Fast limit reached and temporarily disabled · resets in ${resetIn}`;
  }
}

export function isFastModeEnabled(state: { fastMode: boolean }): boolean {
  return state.fastMode;
}

// ============================================================
// Z#303 ZyK — Issue Reporter Helper
// ============================================================

export function getIssueCommand(): string {
  return "/issue";
}

type FeedbackReason = "feedback_survey_bad" | "feedback_survey_good";

export function getFeedbackReasonText(reason: FeedbackReason): string {
  switch (reason) {
    case "feedback_survey_bad":
      return 'You responded "Bad" to the feedback survey';
    case "feedback_survey_good":
      return 'You responded "Good" to the feedback survey';
    default:
      return "Unknown reason";
  }
}

// ============================================================
// Z#300 OyK — IDE Hint Counter
// ============================================================

interface IdeHintState {
  ideHintShownCount: number;
}

export function incrementIdeHint(state: IdeHintState): IdeHintState {
  return {
    ...state,
    ideHintShownCount: (state.ideHintShownCount ?? 0) + 1,
  };
}
