import type { Usage } from "../api/client.js";

export type CostState = {
  startedAt: number;
  totalCostUSD: number;
  requests: number;
  totalApiDurationMs: number;
  totalLinesAdded: number;
  totalLinesRemoved: number;
  hasUnknownModelCost: boolean;
  byModel: Record<string, ModelUsageCost>;
};

export type ModelUsageCost = {
  inputTokens: number;
  outputTokens: number;
  cacheReadInputTokens: number;
  cacheCreationInputTokens: number;
  webSearchRequests: number;
  costUSD: number;
};

type ModelCost = {
  inputTokens: number;
  outputTokens: number;
  promptCacheWriteTokens: number;
  promptCacheReadTokens: number;
  webSearchRequests: number;
};

const COST_TIER_3_15: ModelCost = {
  inputTokens: 3,
  outputTokens: 15,
  promptCacheWriteTokens: 3.75,
  promptCacheReadTokens: 0.3,
  webSearchRequests: 0.01,
};
const COST_TIER_15_75: ModelCost = {
  inputTokens: 15,
  outputTokens: 75,
  promptCacheWriteTokens: 18.75,
  promptCacheReadTokens: 1.5,
  webSearchRequests: 0.01,
};
const COST_TIER_5_25: ModelCost = {
  inputTokens: 5,
  outputTokens: 25,
  promptCacheWriteTokens: 6.25,
  promptCacheReadTokens: 0.5,
  webSearchRequests: 0.01,
};
const COST_HAIKU_35: ModelCost = {
  inputTokens: 0.8,
  outputTokens: 4,
  promptCacheWriteTokens: 1,
  promptCacheReadTokens: 0.08,
  webSearchRequests: 0.01,
};
const COST_HAIKU_45: ModelCost = {
  inputTokens: 1,
  outputTokens: 5,
  promptCacheWriteTokens: 1.25,
  promptCacheReadTokens: 0.1,
  webSearchRequests: 0.01,
};
const DEFAULT_UNKNOWN_MODEL_COST = COST_TIER_5_25;

export function createEmptyCostState(): CostState {
  return {
    startedAt: Date.now(),
    totalCostUSD: 0,
    requests: 0,
    totalApiDurationMs: 0,
    totalLinesAdded: 0,
    totalLinesRemoved: 0,
    hasUnknownModelCost: false,
    byModel: {},
  };
}

export function addUsageToCostState(state: CostState, model: string, usage: Usage, apiDurationMs = 0): CostState {
  const { cost, unknown } = calculateUsageCost(model, usage);
  const key = canonicalModelName(model);
  const current = state.byModel[key] || createEmptyModelUsageCost();
  const nextModelUsage = {
    inputTokens: current.inputTokens + (usage.input_tokens || 0),
    outputTokens: current.outputTokens + (usage.output_tokens || 0),
    cacheReadInputTokens: current.cacheReadInputTokens + (usage.cache_read_input_tokens || 0),
    cacheCreationInputTokens: current.cacheCreationInputTokens + (usage.cache_creation_input_tokens || 0),
    webSearchRequests: current.webSearchRequests + (usage.server_tool_use?.web_search_requests || 0),
    costUSD: current.costUSD + cost,
  };

  return {
    ...state,
    totalCostUSD: state.totalCostUSD + cost,
    requests: state.requests + 1,
    totalApiDurationMs: state.totalApiDurationMs + Math.max(0, apiDurationMs),
    hasUnknownModelCost: state.hasUnknownModelCost || unknown,
    byModel: {
      ...state.byModel,
      [key]: nextModelUsage,
    },
  };
}

export function addCodeChangesToCostState(state: CostState, linesAdded: number, linesRemoved: number): CostState {
  return {
    ...state,
    totalLinesAdded: state.totalLinesAdded + Math.max(0, linesAdded),
    totalLinesRemoved: state.totalLinesRemoved + Math.max(0, linesRemoved),
  };
}

export function formatCostSummary(state: CostState, now = Date.now()): string {
  const costDisplay = `${formatCost(state.totalCostUSD)}${state.hasUnknownModelCost ? " (costs may be inaccurate due to usage of unknown models)" : ""}`;
  return [
    `Total cost:            ${costDisplay}`,
    `Total duration (API):  ${formatDurationMs(state.totalApiDurationMs)}`,
    `Total duration (wall): ${formatDurationMs(Math.max(0, now - state.startedAt))}`,
    `Total code changes:    ${formatNumber(state.totalLinesAdded)} ${state.totalLinesAdded === 1 ? "line" : "lines"} added, ${formatNumber(state.totalLinesRemoved)} ${state.totalLinesRemoved === 1 ? "line" : "lines"} removed`,
    formatModelUsage(state),
  ].join("\n");
}

export function calculateUsageCost(model: string, usage: Usage): { cost: number; unknown: boolean } {
  const { costs, unknown } = getModelCosts(model);
  return {
    unknown,
    cost:
      ((usage.input_tokens || 0) / 1_000_000) * costs.inputTokens
      + ((usage.output_tokens || 0) / 1_000_000) * costs.outputTokens
      + ((usage.cache_read_input_tokens || 0) / 1_000_000) * costs.promptCacheReadTokens
      + ((usage.cache_creation_input_tokens || 0) / 1_000_000) * costs.promptCacheWriteTokens
      + (usage.server_tool_use?.web_search_requests || 0) * costs.webSearchRequests,
  };
}

function createEmptyModelUsageCost(): ModelUsageCost {
  return {
    inputTokens: 0,
    outputTokens: 0,
    cacheReadInputTokens: 0,
    cacheCreationInputTokens: 0,
    webSearchRequests: 0,
    costUSD: 0,
  };
}

function formatModelUsage(state: CostState): string {
  const entries = Object.entries(state.byModel);
  if (entries.length === 0) {
    return "Usage:                 0 input, 0 output, 0 cache read, 0 cache write";
  }

  return entries.reduce((output, [model, usage]) => {
    const usageString = `  ${formatNumber(usage.inputTokens)} input, ${formatNumber(usage.outputTokens)} output, ${formatNumber(usage.cacheReadInputTokens)} cache read, ${formatNumber(usage.cacheCreationInputTokens)} cache write${usage.webSearchRequests > 0 ? `, ${formatNumber(usage.webSearchRequests)} web search` : ""} (${formatCost(usage.costUSD)})`;
    return `${output}\n${`${model}:`.padStart(21)}${usageString}`;
  }, "Usage by model:");
}

function getModelCosts(model: string): { costs: ModelCost; unknown: boolean } {
  const canonical = canonicalModelName(model);
  if (canonical.includes("haiku-4-5")) return { costs: COST_HAIKU_45, unknown: false };
  if (canonical.includes("haiku")) return { costs: COST_HAIKU_35, unknown: false };
  if (canonical.includes("opus-4-5") || canonical.includes("opus-4-6")) return { costs: COST_TIER_5_25, unknown: false };
  if (canonical.includes("opus")) return { costs: COST_TIER_15_75, unknown: false };
  if (canonical.includes("sonnet")) return { costs: COST_TIER_3_15, unknown: false };
  return { costs: DEFAULT_UNKNOWN_MODEL_COST, unknown: true };
}

function canonicalModelName(model: string): string {
  return model.trim().toLowerCase() || "unknown";
}

function formatCost(cost: number, maxDecimalPlaces = 4): string {
  return `$${cost > 0.5 ? round(cost, 100).toFixed(2) : cost.toFixed(maxDecimalPlaces)}`;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatDurationMs(value: number): string {
  if (value < 1000) return `${Math.max(0, Math.round(value))}ms`;
  const seconds = value / 1000;
  if (seconds < 60) return `${seconds % 1 === 0 ? seconds.toFixed(0) : seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.round(seconds % 60);
  return remainder ? `${minutes}m ${remainder}s` : `${minutes}m`;
}

function round(value: number, precision: number): number {
  return Math.round(value * precision) / precision;
}
