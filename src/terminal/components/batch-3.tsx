// ============================================================
// 1:1 from binary Z blocks - Batch 3
// ============================================================
// Z#083 DkH: Tool Confirm with "don't ask again" (12 creates)
// Z#065 S23: Explanation/Risk Level View (10 creates)
// Z#076 ED6/uX_: Permission Rule Summary (11+8 creates)
// Z#346 GS3: Model Migration Dialog (11 creates)
// Z#340 KS3: Pro Trial Start Dialog (10 creates)
// Z#421 BuK: Teleport Progress View (10 creates)
// Z#422 duK: MCP Server Import Dialog (11 creates)
// Z#339 oh3: MCP Config Status View (13 creates)
// Z#038 GXK: User Message Display (13 creates)
// Z#344 JS3: Claude in Chrome Onboarding (13 creates)
// ============================================================

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Box, Text } from "ink";

// ============================================================
// Z#083 DkH — Tool Confirm with "don't ask again"
// ============================================================

interface ToolConfirmProps {
  toolUseConfirm: {
    tool: { name: string; userFacingName: (input: any) => string };
    input: Record<string, unknown>;
    onAllow: (input: Record<string, unknown>, suggestions?: unknown[], feedback?: string) => void;
    onReject: (feedback?: string) => void;
    assistantMessage: { message: { id: string } };
  };
  onDone: (result: unknown) => void;
  onReject: () => void;
  workerBadge?: { name: string; color: string };
}

export function ToolConfirmWithRemember({ toolUseConfirm: tc, onDone, onReject, workerBadge }: ToolConfirmProps): React.ReactElement {
  const displayName = tc.tool.userFacingName(tc.input);
  const isMcpTool = displayName.endsWith(" (MCP)");
  const cleanName = isMcpTool ? displayName.slice(0, -6) : displayName;
  const worker = workerBadge?.name || "";

  const [selected, setSelected] = useState<"yes" | "yes-dont-ask" | "no">("yes");

  const handleChoice = (choice: string, feedback?: string) => {
    switch (choice) {
      case "yes":
        tc.onAllow(tc.input, [], feedback);
        onDone(null);
        break;
      case "yes-dont-ask-again":
        tc.onAllow(tc.input, [], feedback);
        onDone(null);
        break;
      case "no":
        tc.onReject(feedback);
        onReject();
        break;
    }
  };

  return React.createElement(
    Box,
    { flexDirection: "column", padding: 1 },
    // Header
    worker && React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { color: "cyan" }, `[${worker}] `),
      React.createElement(Text, { bold: true }, `Allow ${cleanName}?`)
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
          { color: selected === "yes" ? "green" : undefined },
          selected === "yes" ? "❯ " : "  "
        ),
        React.createElement(Text, null, "[Y] Yes, allow")
      ),
      React.createElement(
        Box,
        null,
        React.createElement(
          Text,
          { color: selected === "yes-dont-ask" ? "green" : undefined },
          selected === "yes-dont-ask" ? "❯ " : "  "
        ),
        React.createElement(Text, null, "[A] Yes, and don't ask again for this tool")
      ),
      React.createElement(
        Box,
        null,
        React.createElement(
          Text,
          { color: selected === "no" ? "red" : undefined },
          selected === "no" ? "❯ " : "  "
        ),
        React.createElement(Text, null, "[N] No, and tell Claude what to do differently (esc)")
      )
    ),

    React.createElement(
      Box,
      null,
      React.createElement(Text, { dimColor: true }, "Enter to confirm · Tab to cycle · Esc to reject")
    )
  );
}

// ============================================================
// Z#065 S23 — Explanation / Risk Level View
// ============================================================

interface ExplanationData {
  explanation?: string;
  reasoning?: string;
  riskLevel: "low" | "medium" | "high" | "critical";
}

function getRiskColor(level: string): string {
  switch (level) {
    case "low": return "green";
    case "medium": return "yellow";
    case "high": return "red";
    case "critical": return "red";
    default: return "";
  }
}

function getRiskLabel(level: string): string {
  switch (level) {
    case "low": return "Low Risk";
    case "medium": return "Medium Risk";
    case "high": return "High Risk";
    case "critical": return "Critical Risk";
    default: return level;
  }
}

export function ExplanationView({ promise }: { promise: Promise<ExplanationData> }): React.ReactElement {
  const [data, setData] = useState<ExplanationData | null>(null);

  useEffect(() => {
    promise.then(setData).catch(() => {});
  }, [promise]);

  if (!data) {
    return React.createElement(
      Box,
      { marginTop: 1 },
      React.createElement(Text, { dimColor: true }, "Loading explanation...")
    );
  }

  const color = getRiskColor(data.riskLevel);
  const label = getRiskLabel(data.riskLevel);

  return React.createElement(
    Box,
    { flexDirection: "column" },
    // Risk level badge
    React.createElement(
      Box,
      null,
      React.createElement(Text, { color, bold: true }, `${label}: `),
      data.explanation && React.createElement(Text, null, data.explanation)
    ),
    // Reasoning
    data.reasoning && React.createElement(
      Box,
      { marginTop: 1 },
      React.createElement(Text, { dimColor: true }, data.reasoning)
    )
  );
}

// ============================================================
// Z#076 ED6 — Permission Rule Summary
// ============================================================

export function PermissionRuleSummary({
  permissionChanges,
  toolName,
}: {
  permissionChanges: Array<{ type: string; rules?: Array<{ toolName: string; ruleContent?: string }>; directories?: string[] }>;
  toolName: string;
}): React.ReactElement {
  const addRules = permissionChanges.filter((c) => c.type === "addRules");
  const rules = addRules.flatMap((c) => c.rules || []);
  const readRules = rules.filter((r) => r.toolName === "Read");
  const toolRules = rules.filter((r) => r.toolName === toolName);
  const addDirs = permissionChanges.filter((c) => c.type === "addDirectories");
  const dirs = addDirs.flatMap((c) => c.directories || []);

  const readPaths = readRules
    .map((r) => r.ruleContent?.replace("/**", "") || "")
    .filter(Boolean);
  const toolPaths = toolRules.flatMap((r) => {
    if (!r.ruleContent) return [];
    const content = r.ruleContent.endsWith(":*") || r.ruleContent.endsWith(" *")
      ? r.ruleContent.slice(0, -2)
      : r.ruleContent;
    return [content];
  });

  const hasDirs = dirs.length > 0;
  const hasRead = readPaths.length > 0;
  const hasTool = toolPaths.length > 0;

  if (hasRead && !hasDirs && !hasTool) {
    if (readPaths.length === 1) {
      const basename = readPaths[0].split("/").pop() || readPaths[0];
      return React.createElement(
        Text,
        null,
        "Yes, allow reading from ",
        React.createElement(Text, { bold: true }, basename),
        " from this project"
      );
    }
    return React.createElement(
      Text,
      null,
      "Yes, allow reading from ",
      formatPathList(readPaths),
      " from this project"
    );
  }

  // General permission summary
  const parts: string[] = [];
  if (hasRead) parts.push(`reading ${readPaths.length} path(s)`);
  if (hasTool) parts.push(`using ${toolName} on ${toolPaths.length} path(s)`);
  if (hasDirs) parts.push(`accessing ${dirs.length} director${dirs.length === 1 ? "y" : "ies"}`);

  return React.createElement(
    Text,
    null,
    "Yes, allow: ",
    parts.join(", ")
  );
}

function formatPathList(paths: string[]): React.ReactElement {
  const basenames = paths.map((p) => p.split("/").pop() || p);

  if (basenames.length === 1) {
    return React.createElement(Text, { bold: true }, basenames[0]);
  }
  if (basenames.length === 2) {
    return React.createElement(
      Text,
      null,
      React.createElement(Text, { bold: true }, basenames[0]),
      " and ",
      React.createElement(Text, { bold: true }, basenames[1])
    );
  }
  return React.createElement(
    Text,
    null,
    React.createElement(Text, { bold: true }, basenames[0]),
    ", ",
    React.createElement(Text, { bold: true }, basenames[1]),
    " and ",
    basenames.length - 2,
    " more"
  );
}

// ============================================================
// Z#346 GS3 — Model Migration Dialog
// ============================================================

interface ModelMigrationProps {
  tierLabel: string;
  fromName: string;
  toName: string;
  toProviderId: string;
  onDone: (accepted: boolean) => void;
}

export function ModelMigrationDialog({ tierLabel, fromName, toName, toProviderId, onDone }: ModelMigrationProps): React.ReactElement {
  const title = `Newer ${tierLabel} model available`;
  const [selected, setSelected] = useState<"yes" | "no">("yes");

  useEffect(() => {
    const { stdin } = process;
    if (!stdin?.isTTY) return;

    const onData = (chunk: Buffer) => {
      const char = chunk.toString();
      if (char === "\r" || char === "\n") {
        onDone(selected === "yes");
      }
      if (char === "y" || char === "Y") onDone(true);
      if (char === "n" || char === "N") onDone(false);
    };

    stdin.on("data", onData);
    return () => void stdin.removeListener("data", onData);
  }, [selected, onDone]);

  return React.createElement(
    Box,
    { flexDirection: "column", padding: 1 },
    React.createElement(Text, { bold: true }, title),
    React.createElement(
      Box,
      { flexDirection: "column", marginY: 1 },
      React.createElement(
        Box,
        null,
        React.createElement(Text, null, "Currently pinned: "),
        React.createElement(Text, { bold: true }, fromName)
      ),
      React.createElement(
        Box,
        null,
        React.createElement(Text, null, "Latest available: "),
        React.createElement(Text, { bold: true }, toName),
        React.createElement(Text, { dimColor: true }, ` (${toProviderId})`)
      )
    ),
    React.createElement(
      Box,
      { flexDirection: "column" },
      React.createElement(
        Box,
        null,
        React.createElement(Text, { color: "green" }, "[Y] Yes, upgrade"),
        React.createElement(Text, null, "  "),
        React.createElement(Text, { color: "red" }, "[N] No, keep current")
      )
    )
  );
}

// ============================================================
// Z#340 KS3 — Pro Trial Start Dialog
// ============================================================

interface ProTrialProps {
  onDone: () => void;
}

export function ProTrialDialog({ onDone }: ProTrialProps): React.ReactElement {
  const [status, setStatus] = useState<"idle" | "starting" | "error">("idle");
  const trialDays = 14; // CV8()

  const handleStart = async () => {
    if (status === "starting") return;
    if (status === "error") { onDone(); return; }

    setStatus("starting");
    try {
      // IV8() - start pro trial
      setStatus("idle");
      onDone();
    } catch {
      setStatus("error");
    }
  };

  return React.createElement(
    Box,
    { flexDirection: "column", padding: 1 },
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { bold: true, color: "cyan" }, "Try Claude Pro"),
      trialDays !== null && React.createElement(
        Text,
        null,
        `Your Pro plan includes ${trialDays} days of increased usage limits and priority access.`
      )
    ),
    React.createElement(
      Box,
      { flexDirection: "column", marginBottom: 1 },
      React.createElement(
        Box,
        null,
        React.createElement(Text, { color: "green" }, "[Y] Start free trial"),
        React.createElement(Text, null, "  "),
        React.createElement(Text, { color: "red" }, "[N] No thanks")
      )
    ),
    status === "error" && React.createElement(
      Text,
      { color: "red" },
      "Failed to start trial. Press Enter to continue."
    )
  );
}

// ============================================================
// Z#421 BuK — Teleport Progress View
// ============================================================

const TELEPORT_STEPS = [
  { key: "prepare", label: "Preparing session" },
  { key: "upload", label: "Uploading context" },
  { key: "transfer", label: "Transferring" },
  { key: "ready", label: "Ready" },
];

const TELEPORT_SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export function TeleportProgressView({ sessionId }: { sessionId?: string }): React.ReactElement {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 100);
    return () => clearInterval(interval);
  }, []);

  const spinnerIdx = Math.floor(tick / 10) % TELEPORT_SPINNER.length;
  const msgIdx = Math.floor(tick / 10) % TELEPORT_STEPS.length;

  return React.createElement(
    Box,
    { flexDirection: "column" },
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(
        Text,
        { bold: true, color: "claude" as any },
        TELEPORT_SPINNER[spinnerIdx],
        " Teleporting session…"
      )
    ),
    sessionId && React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { dimColor: true }, sessionId)
    ),
    ...TELEPORT_STEPS.map((step, i) => {
      const isDone = i < msgIdx;
      const isCurrent = i === msgIdx;
      return React.createElement(
        Box,
        { key: step.key, flexDirection: "row" },
        React.createElement(
          Box,
          { width: 2 },
          React.createElement(
            Text,
            { color: isDone ? "green" : isCurrent ? "claude" as any : undefined, dimColor: !isDone && !isCurrent },
            isDone ? "✓" : isCurrent ? TELEPORT_SPINNER[spinnerIdx] : "○"
          )
        ),
        React.createElement(
          Text,
          { dimColor: !isCurrent, bold: isCurrent },
          step.label
        )
      );
    })
  );
}

// ============================================================
// Z#422 duK — MCP Server Import Dialog
// ============================================================

interface McpImportProps {
  servers: Record<string, { name: string }>;
  scope: string;
  onDone: (importedCount: number) => void;
}

export function McpServerImportDialog({ servers, scope, onDone }: McpImportProps): React.ReactElement {
  const serverNames = Object.keys(servers);
  const [statuses, setStatuses] = useState<Record<string, unknown>>({});
  const [filtered, setFiltered] = useState<string[]>([]);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    // Fetch existing server statuses
    const fetchStatuses = async () => {
      const result: Record<string, unknown> = {};
      for (const name of serverNames) {
        result[name] = { status: "available" };
      }
      setStatuses(result);
    };
    fetchStatuses();
  }, []);

  useEffect(() => {
    setFiltered(serverNames.filter((n) => statuses[n] !== undefined));
  }, [statuses]);

  const handleImport = async (names: string[]) => {
    setImporting(true);
    let count = 0;
    for (const name of names) {
      const server = servers[name];
      if (server) {
        let targetName = name;
        if (statuses[name] !== undefined) {
          let suffix = 1;
          while (statuses[`${name}_${suffix}`] !== undefined) suffix++;
          targetName = `${name}_${suffix}`;
        }
        count++;
      }
    }
    onDone(count);
  };

  return React.createElement(
    Box,
    { flexDirection: "column", padding: 1 },
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { bold: true }, "Import MCP Servers"),
      React.createElement(Text, { dimColor: true }, ` ${filtered.length} servers available in ${scope} scope`)
    ),
    filtered.length > 0
      ? React.createElement(
          Box,
          { flexDirection: "column", marginBottom: 1 },
          ...filtered.map((name) =>
            React.createElement(
              Box,
              { key: name },
              React.createElement(Text, null, `  • ${name}`)
            )
          )
        )
      : React.createElement(Text, { dimColor: true }, "No servers available for import"),
    !importing && React.createElement(
      Box,
      { marginTop: 1 },
      React.createElement(Text, { dimColor: true }, "Enter to import all · Esc to cancel")
    )
  );
}

// ============================================================
// Z#339 oh3 — MCP Config Status View
// ============================================================

interface McpConfigStatusProps {
  onDone: () => void;
  commands?: unknown[];
}

export function McpConfigStatusView({ onDone }: McpConfigStatusProps): React.ReactElement {
  // Load MCP project config
  const mcpConfig = { servers: {} as Record<string, unknown> };
  const servers = Object.keys(mcpConfig.servers);
  const hasServers = servers.length > 0;

  // Check config sources
  const bashSources: string[] = []; // GSK()
  const otelSources: string[] = []; // RSK()
  const apiKeySources: string[] = []; // ZSK()
  const awsSources: string[] = []; // LSK()
  const gcpSources: string[] = []; // kSK()

  return React.createElement(
    Box,
    { flexDirection: "column", padding: 1 },
    React.createElement(Text, { bold: true }, "MCP Configuration Status"),
    React.createElement(
      Box,
      { flexDirection: "column", marginY: 1 },
      React.createElement(
        Box,
        null,
        React.createElement(Text, null, `MCP Servers: `),
        React.createElement(Text, { bold: true }, `${servers.length} configured`)
      ),
      !hasServers && React.createElement(
        Text,
        { dimColor: true },
        "No MCP servers configured. Use /mcp to add servers."
      )
    ),
    // Config sources
    React.createElement(
      Box,
      { flexDirection: "column", marginTop: 1 },
      bashSources.length > 0 && React.createElement(
        Text,
        { dimColor: true },
        `Bash allow rules: ${bashSources.join(", ")}`
      ),
      otelSources.length > 0 && React.createElement(
        Text,
        { dimColor: true },
        `OTel headers: ${otelSources.join(", ")}`
      ),
      apiKeySources.length > 0 && React.createElement(
        Text,
        { dimColor: true },
        `API key helpers: ${apiKeySources.join(", ")}`
      )
    ),
    React.createElement(
      Box,
      { marginTop: 1 },
      React.createElement(Text, { dimColor: true }, "Enter to continue · ESC to cancel")
    )
  );
}

// ============================================================
// Z#038 GXK — User Message Display
// ============================================================

interface UserMessageDisplayProps {
  userMessage: string;
  color?: string;
  dimColor?: boolean;
  isCurrent?: boolean;
  paddingRight?: number;
}

export function UserMessageDisplay({ userMessage, color, dimColor, isCurrent }: UserMessageDisplayProps): React.ReactElement {
  if (isCurrent) {
    return React.createElement(
      Box,
      { width: "100%" as any },
      React.createElement(Text, { italic: true, color, dimColor }, "(current)")
    );
  }

  const text = userMessage?.trim() || "(no prompt)";

  // Check for bash input markers
  if (text.includes("<bash-input>")) {
    return React.createElement(
      Box,
      { flexDirection: "row", width: "100%" as any },
      React.createElement(Text, { italic: true, color, dimColor }, "(bash command)")
    );
  }

  // Truncate long messages
  const display = text.length > 200 ? text.slice(0, 197) + "..." : text;

  return React.createElement(
    Box,
    { flexDirection: "row", width: "100%" as any },
    React.createElement(Text, { color, dimColor }, display)
  );
}

// ============================================================
// Z#344 JS3 — Claude in Chrome Onboarding
// ============================================================

const CLAUDE_IN_CHROME_URL = "https://claude.ai/chrome";

interface ClaudeInChromeProps {
  onDone: () => void;
}

export function ClaudeInChromeOnboarding({ onDone }: ClaudeInChromeProps): React.ReactElement {
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if Chrome extension is installed
    const check = async () => {
      try {
        const ok = false; // I7H() - check extension
        setInstalled(ok);
      } catch {
        // ignore
      }
    };
    check();
  }, []);

  return React.createElement(
    Box,
    { flexDirection: "column", padding: 1 },
    React.createElement(Text, { bold: true }, "Claude in Chrome"),
    React.createElement(
      Box,
      { marginY: 1 },
      React.createElement(
        Text,
        null,
        "Claude in Chrome works with the Chrome extension to let you control your browser directly from Claude Code."
      ),
      React.createElement(Box, null, React.createElement(Text, null, " ")),
      !installed && React.createElement(
        Box,
        { flexDirection: "column" },
        React.createElement(Text, null, "Requires the Chrome extension. Get started at "),
        React.createElement(Text, { color: "blue" as any }, CLAUDE_IN_CHROME_URL)
      ),
      installed && React.createElement(
        Text,
        { color: "green" },
        "✓ Chrome extension detected. Ready to use."
      )
    ),
    React.createElement(
      Box,
      { marginTop: 1 },
      React.createElement(Text, { dimColor: true }, "Enter to continue")
    )
  );
}
