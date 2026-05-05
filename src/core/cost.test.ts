import { describe, expect, test } from "bun:test";
import {
  addCodeChangesToCostState,
  addUsageToCostState,
  calculateUsageCost,
  createEmptyCostState,
  formatCostSummary,
} from "./cost.js";

describe("session cost tracking", () => {
  test("calculates Sonnet token and cache cost using official pricing shape", () => {
    const result = calculateUsageCost("claude-sonnet-4-6", {
      input_tokens: 1_000_000,
      output_tokens: 1_000_000,
      cache_read_input_tokens: 1_000_000,
      cache_creation_input_tokens: 1_000_000,
      server_tool_use: { web_search_requests: 2 },
    });

    expect(result.unknown).toBe(false);
    expect(result.cost).toBeCloseTo(22.07, 5);
  });

  test("formats zero usage like official /cost output", () => {
    expect(formatCostSummary(createEmptyCostState())).toContain("Usage:                 0 input, 0 output, 0 cache read, 0 cache write");
  });

  test("accumulates usage by model and marks unknown pricing", () => {
    const state = addUsageToCostState(
      addUsageToCostState(createEmptyCostState(), "claude-haiku-4-5", { input_tokens: 1_000, output_tokens: 500 }),
      "deepseek-v4-pro[1m]",
      { input_tokens: 100, output_tokens: 50 },
    );
    const summary = formatCostSummary(state);

    expect(state.requests).toBe(2);
    expect(state.hasUnknownModelCost).toBe(true);
    expect(summary).toContain("claude-haiku-4-5:");
    expect(summary).toContain("deepseek-v4-pro[1m]:");
    expect(summary).toContain("costs may be inaccurate");
  });

  test("formats API duration, wall duration, and code changes from live state", () => {
    const initial = { ...createEmptyCostState(), startedAt: 1_000 };
    const withUsage = addUsageToCostState(
      initial,
      "claude-sonnet-4-6",
      { input_tokens: 1_000, output_tokens: 2_000 },
      12_345,
    );
    const withChanges = addCodeChangesToCostState(withUsage, 3, 1);
    const summary = formatCostSummary(withChanges, 66_000);

    expect(summary).toContain("Total duration (API):  12.3s");
    expect(summary).toContain("Total duration (wall): 1m 5s");
    expect(summary).toContain("Total code changes:    3 lines added, 1 line removed");
  });
});
