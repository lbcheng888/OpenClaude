import { appendFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import type { AssistantContentBlock, ToolResultContentBlock } from "../api/client.js";
import type { TenguLoopEvent } from "./tengu.js";

export type WorkflowPhase =
  | "idle"
  | "api_requesting"
  | "assistant_streaming"
  | "assistant_completed"
  | "tools_running"
  | "ready_for_next_request";

export type WorkflowTraceOptions = {
  persistPath?: string;
  persist?: boolean;
};

export type WorkflowTraceEntry = {
  seq: number;
  timestamp: string;
  phaseBefore: WorkflowPhase;
  phaseAfter: WorkflowPhase;
  event: TenguLoopEvent;
};

export type WorkflowTraceSnapshot = {
  phase: WorkflowPhase;
  activeAssistantId: string | null;
  pendingToolUseIds: string[];
  startedToolUseIds: string[];
  completedToolUseIds: string[];
  entries: WorkflowTraceEntry[];
  persistPath?: string;
};

type AssistantWorkflow = {
  id: string;
  turn: number;
  completed: boolean;
  pendingToolUseIds: Set<string>;
  startedToolUseIds: Set<string>;
  completedToolUseIds: Set<string>;
  toolResultsFlushed: boolean;
};

export class WorkflowTrace {
  private phase: WorkflowPhase = "idle";
  private seq = 0;
  private entries: WorkflowTraceEntry[] = [];
  private activeAssistant: AssistantWorkflow | null = null;
  private allStartedToolUseIds = new Set<string>();
  private allCompletedToolUseIds = new Set<string>();
  private readonly persistPath?: string;

  constructor(options?: WorkflowTraceOptions | boolean) {
    if (options === true || (typeof options === "object" && options.persist && !options.persistPath)) {
      this.persistPath = defaultTracePath();
    } else if (options && typeof options === "object" && options.persistPath) {
      this.persistPath = options.persistPath;
    } else if (isTruthy(process.env.CLAUDE_CODE_WORKFLOW_TRACE)) {
      this.persistPath = process.env.CLAUDE_CODE_WORKFLOW_TRACE_PATH
        || (process.env.CLAUDE_CODE_WORKFLOW_TRACE_DIR
          ? join(process.env.CLAUDE_CODE_WORKFLOW_TRACE_DIR, `claude-code-workflow-${process.pid}.jsonl`)
          : defaultTracePath());
    }

    if (this.persistPath) {
      mkdirSync(dirname(this.persistPath), { recursive: true });
    }
  }

  reset(): void {
    this.phase = "idle";
    this.seq = 0;
    this.entries = [];
    this.activeAssistant = null;
    this.allStartedToolUseIds.clear();
    this.allCompletedToolUseIds.clear();
  }

  record(event: TenguLoopEvent): void {
    const phaseBefore = this.phase;
    this.apply(event);
    const entry = {
      seq: ++this.seq,
      timestamp: new Date().toISOString(),
      phaseBefore,
      phaseAfter: this.phase,
      event: cloneEvent(event),
    };
    this.entries.push(entry);
    if (this.persistPath) {
      appendFileSync(this.persistPath, `${JSON.stringify(entry)}\n`, "utf8");
    }
  }

  snapshot(): WorkflowTraceSnapshot {
    return {
      phase: this.phase,
      activeAssistantId: this.activeAssistant?.id ?? null,
      pendingToolUseIds: [...(this.activeAssistant?.pendingToolUseIds ?? [])],
      startedToolUseIds: [...this.allStartedToolUseIds],
      completedToolUseIds: [...this.allCompletedToolUseIds],
      entries: this.entries.map(entry => ({
        ...entry,
        event: cloneEvent(entry.event),
      })),
      ...(this.persistPath ? { persistPath: this.persistPath } : {}),
    };
  }

  private apply(event: TenguLoopEvent): void {
    switch (event.type) {
      case "api_request":
        this.assertNoPendingToolResults("api_request");
        this.phase = "api_requesting";
        return;

      case "assistant_start":
        if (this.phase !== "api_requesting" && this.phase !== "idle" && this.phase !== "ready_for_next_request") {
          this.fail(event, `assistant_start cannot follow ${this.phase}`);
        }
        this.activeAssistant = {
          id: event.assistantId,
          turn: event.turn,
          completed: false,
          pendingToolUseIds: new Set(),
          startedToolUseIds: new Set(),
          completedToolUseIds: new Set(),
          toolResultsFlushed: false,
        };
        this.phase = "assistant_streaming";
        return;

      case "assistant_text_delta":
      case "tool_input_start":
      case "tool_input_delta":
        this.assertActiveAssistant(event.assistantId, event.type);
        if (this.activeAssistant?.completed) {
          this.fail(event, `${event.type} arrived after assistant_complete`);
        }
        this.phase = "assistant_streaming";
        return;

      case "assistant_complete":
        this.assertActiveAssistant(event.assistantId, event.type);
        this.activeAssistant!.completed = true;
        this.activeAssistant!.pendingToolUseIds = collectToolUseIds(event.content);
        this.activeAssistant!.toolResultsFlushed = this.activeAssistant!.pendingToolUseIds.size === 0;
        this.phase = this.activeAssistant!.pendingToolUseIds.size > 0
          ? "assistant_completed"
          : "ready_for_next_request";
        return;

      case "tool_start":
        this.assertActiveAssistant(event.assistantId, event.type);
        if (!this.activeAssistant!.completed) {
          this.activeAssistant!.pendingToolUseIds.add(event.tool.id);
        } else {
          this.assertKnownPendingTool(event.tool.id, event);
        }
        this.activeAssistant!.startedToolUseIds.add(event.tool.id);
        this.allStartedToolUseIds.add(event.tool.id);
        this.phase = "tools_running";
        return;

      case "tool_progress":
        this.assertActiveAssistant(event.assistantId, event.type);
        this.assertStartedTool(event.tool.id, event);
        this.phase = "tools_running";
        return;

      case "tool_result":
        this.assertActiveAssistant(event.assistantId, event.type);
        this.assertStartedTool(event.tool.id, event);
        this.activeAssistant!.completedToolUseIds.add(event.tool.id);
        this.allCompletedToolUseIds.add(event.tool.id);
        this.phase = "tools_running";
        return;

      case "tool_results_message":
        this.assertToolResultsMessage(event.results);
        this.activeAssistant!.pendingToolUseIds.clear();
        this.activeAssistant!.toolResultsFlushed = true;
        this.phase = "ready_for_next_request";
        return;

      case "stream_mode":
      case "notification":
        return;
    }
  }

  private assertActiveAssistant(assistantId: string, eventName: string): void {
    if (!this.activeAssistant) {
      throw new Error(`Workflow invariant failed: ${eventName} without assistant_start`);
    }
    if (this.activeAssistant.id !== assistantId) {
      throw new Error(`Workflow invariant failed: ${eventName} for ${assistantId} while ${this.activeAssistant.id} is active`);
    }
  }

  private assertKnownPendingTool(toolUseId: string, event: TenguLoopEvent): void {
    if (!this.activeAssistant?.completed) {
      if (this.activeAssistant?.pendingToolUseIds.has(toolUseId)) return;
      this.fail(event, `tool ${toolUseId} produced output before it was declared`);
    }
    if (!this.activeAssistant.pendingToolUseIds.has(toolUseId)) {
      this.fail(event, `tool ${toolUseId} was not declared by assistant content`);
    }
  }

  private assertStartedTool(toolUseId: string, event: TenguLoopEvent): void {
    this.assertKnownPendingTool(toolUseId, event);
    if (!this.activeAssistant!.startedToolUseIds.has(toolUseId)) {
      this.fail(event, `tool ${toolUseId} produced output before tool_start`);
    }
  }

  private assertToolResultsMessage(results: ToolResultContentBlock[]): void {
    if (!this.activeAssistant) {
      throw new Error("Workflow invariant failed: tool_results_message without assistant_start");
    }
    const expected = this.activeAssistant.pendingToolUseIds;
    const actual = new Set(results.map(result => result.tool_use_id));
    assertSameSet(expected, actual, "tool_results_message");

    for (const toolUseId of expected) {
      if (!this.activeAssistant.completedToolUseIds.has(toolUseId)) {
        throw new Error(`Workflow invariant failed: tool_results_message included ${toolUseId} before visible tool_result`);
      }
    }
  }

  private assertNoPendingToolResults(eventName: string): void {
    if (!this.activeAssistant) return;
    if (this.activeAssistant.pendingToolUseIds.size > 0 && !this.activeAssistant.toolResultsFlushed) {
      const pendingResults = [...this.activeAssistant.pendingToolUseIds]
        .filter(id => !this.activeAssistant!.completedToolUseIds.has(id));
      if (pendingResults.length > 0) {
        throw new Error(`Workflow invariant failed: ${eventName} before tool_result for ${pendingResults.join(", ")}`);
      }
      throw new Error(`Workflow invariant failed: ${eventName} before tool_results_message`);
    }
  }

  private fail(event: TenguLoopEvent, message: string): never {
    throw new Error(`Workflow invariant failed: ${message} at event ${event.type}`);
  }
}

function collectToolUseIds(content: AssistantContentBlock[]): Set<string> {
  const ids = new Set<string>();
  for (const block of content) {
    if (block.type !== "tool_use") continue;
    if (ids.has(block.id)) {
      throw new Error(`Workflow invariant failed: duplicate tool_use id ${block.id}`);
    }
    ids.add(block.id);
  }
  return ids;
}

function assertSameSet(expected: Set<string>, actual: Set<string>, label: string): void {
  const missing = [...expected].filter(value => !actual.has(value));
  const extra = [...actual].filter(value => !expected.has(value));
  if (missing.length || extra.length) {
    throw new Error(
      `Workflow invariant failed: ${label} mismatch`
      + `${missing.length ? `, missing ${missing.join(", ")}` : ""}`
      + `${extra.length ? `, extra ${extra.join(", ")}` : ""}`,
    );
  }
}

function cloneEvent(event: TenguLoopEvent): TenguLoopEvent {
  return JSON.parse(JSON.stringify(event));
}

function defaultTracePath(): string {
  return join(tmpdir(), `claude-code-workflow-${process.pid}.jsonl`);
}

function isTruthy(value: string | undefined): boolean {
  if (!value) return false;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase().trim());
}
