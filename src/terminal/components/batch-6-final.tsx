import React, { useState, useCallback } from "react";
// ============================================================
// 1:1 from binary Z blocks - Batch 6 (Final)
// Complete remaining components
// ============================================================
// Z#166 yRK: Session identity color
// Z#194 hx8: Pattern matching utilities
// Z#210 vLK: Task tracking map
// Z#216 TJ6: Background task scheduler
// Z#241 qvK: Background task toggle
// Z#246 XvK: Telemetry upload
// Z#264 MVK: Config validation
// Z#278 lVK: Time formatter (12h)
// Z#284 jNK: File watcher
// Z#291 INK: Array union/diff
// Z#302 WyK: Event emitter
// Z#320 VhK: Build path filter
// ============================================================

// ============================================================
// Z#166 yRK — Session Identity Color Helper
// ============================================================

export function getSessionIdentityColor(
  color?: string,
  prideGradient?: { colors: string[] }
): string | undefined {
  return color || (prideGradient?.colors?.[0]);
}

// ============================================================
// Z#278 lVK — 12-Hour Time Formatter
// ============================================================

export function formatTime12h(date: Date): { time: string; period: "am" | "pm" } {
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const period = hours < 12 ? "am" : "pm";
  const displayHours = hours % 12 || 12;
  return {
    time: `${displayHours}:${minutes}:${seconds}`,
    period,
  };
}

// ============================================================
// Z#194 hx8 — Pattern Matching Utilities
// ============================================================

export function matchGlobPattern(pattern: string, path: string): boolean {
  if (pattern.endsWith("/**")) {
    const prefix = pattern.slice(0, -3);
    return path.startsWith(prefix);
  }
  if (pattern.startsWith("/")) {
    return path.startsWith(pattern);
  }
  return path.includes(pattern);
}

export function normalizePathForGlob(path: string): string {
  if (path.startsWith("/")) return `/${path}/**`;
  return `${path}/**`;
}

// ============================================================
// Z#210 vLK — Task Tracking Map
// ============================================================

export class TaskTracker<K, V> {
  private map = new Map<K, V>();

  set(key: K, value: V): void {
    this.map.set(key, value);
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  delete(key: K): boolean {
    return this.map.delete(key);
  }

  get size(): number {
    return this.map.size;
  }

  entries(): IterableIterator<[K, V]> {
    return this.map.entries();
  }

  values(): IterableIterator<V> {
    return this.map.values();
  }
}

// ============================================================
// Z#216 TJ6 — Background Task Scheduler
// ============================================================

interface ScheduledTask {
  id: string;
  name: string;
  intervalMs: number;
  lastRun?: number;
  handler: () => Promise<void>;
}

export class BackgroundTaskScheduler {
  private tasks = new Map<string, ScheduledTask>();
  private timers = new Map<string, ReturnType<typeof setTimeout>>();
  private running = false;

  register(task: ScheduledTask): void {
    this.tasks.set(task.id, task);
    if (this.running) this.schedule(task);
  }

  unregister(id: string): void {
    const timer = this.timers.get(id);
    if (timer) clearTimeout(timer);
    this.timers.delete(id);
    this.tasks.delete(id);
  }

  start(): void {
    this.running = true;
    for (const task of this.tasks.values()) {
      this.schedule(task);
    }
  }

  stop(): void {
    this.running = false;
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    this.timers.clear();
  }

  private schedule(task: ScheduledTask): void {
    const run = async () => {
      try {
        await task.handler();
      } catch {
        // Silent catch
      }
      task.lastRun = Date.now();
      if (this.running && this.tasks.has(task.id)) {
        this.timers.set(
          task.id,
          setTimeout(run, task.intervalMs)
        );
      }
    };
    this.timers.set(task.id, setTimeout(run, task.intervalMs));
  }
}

// ============================================================
// Z#241 qvK — Background Task Toggle
// ============================================================

export function isBackgroundTasksEnabled(): boolean {
  const envValue = process.env.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS;
  if (envValue === "true" || envValue === "1") return false;
  return true;
}

// ============================================================
// Z#246 XvK — Telemetry Upload Helper
// ============================================================

interface TelemetryPayload {
  events: unknown[];
  headers?: Record<string, string>;
}

export async function uploadTelemetry(
  endpoint: string,
  payload: TelemetryPayload
): Promise<boolean> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": "claude-code/2.1.126",
      ...payload.headers,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ events: payload.events }),
    });

    return response.ok;
  } catch {
    return false;
  }
}

// ============================================================
// Z#264 MVK — Config Validation Helper
// ============================================================

interface ValidationError {
  path: string;
  message: string;
}

export function validateConfigValue(
  key: string,
  value: unknown,
  schema: { type: string; minimum?: number; maximum?: number; pattern?: string }
): ValidationError | null {
  const actualType = Array.isArray(value) ? "array" : typeof value;

  if (actualType !== schema.type && schema.type !== "any") {
    return {
      path: key,
      message: `Expected ${schema.type}, got ${actualType}`,
    };
  }

  if (schema.minimum !== undefined && typeof value === "number" && value < schema.minimum) {
    return {
      path: key,
      message: `Minimum value is ${schema.minimum}, got ${value}`,
    };
  }

  if (schema.maximum !== undefined && typeof value === "number" && value > schema.maximum) {
    return {
      path: key,
      message: `Maximum value is ${schema.maximum}, got ${value}`,
    };
  }

  if (schema.pattern && typeof value === "string" && !new RegExp(schema.pattern).test(value)) {
    return {
      path: key,
      message: `Value does not match pattern ${schema.pattern}`,
    };
  }

  return null;
}

// ============================================================
// Z#284 jNK — File Watcher (Debounced)
// ============================================================

type FileChangeCallback = (filePath: string, event: string) => void;

export class DebouncedFileWatcher {
  private callbacks = new Map<string, Set<FileChangeCallback>>();
  private pending = new Map<string, ReturnType<typeof setTimeout>>();
  private debounceMs: number;

  constructor(debounceMs: number = 300) {
    this.debounceMs = debounceMs;
  }

  watch(pattern: string, callback: FileChangeCallback): () => void {
    if (!this.callbacks.has(pattern)) {
      this.callbacks.set(pattern, new Set());
    }
    this.callbacks.get(pattern)!.add(callback);

    return () => {
      this.callbacks.get(pattern)?.delete(callback);
    };
  }

  notify(filePath: string, event: string): void {
    const key = `${filePath}:${event}`;
    const existing = this.pending.get(key);
    if (existing) clearTimeout(existing);

    this.pending.set(
      key,
      setTimeout(() => {
        this.pending.delete(key);
        for (const [pattern, cbs] of this.callbacks) {
          if (filePath.includes(pattern.replace(/\*/g, ""))) {
            for (const cb of cbs) cb(filePath, event);
          }
        }
      }, this.debounceMs)
    );
  }
}

// ============================================================
// Z#291 INK — Array Union/Diff Helpers
// ============================================================

export function arrayUnion<T>(a: T[], b: T[]): T[] {
  const set = new Set(a);
  for (const item of b) set.add(item);
  return [...set];
}

export function arrayDiff<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => !setB.has(item));
}

export function arrayIntersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item));
}

// ============================================================
// Z#302 WyK — Simple Event Emitter
// ============================================================

type EventHandler = (...args: unknown[]) => void;

export class TypedEventEmitter<Events extends Record<string, unknown[]>> {
  private handlers = new Map<keyof Events, Set<EventHandler>>();

  on<E extends keyof Events>(event: E, handler: (...args: Events[E]) => void): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler as EventHandler);

    return () => {
      this.handlers.get(event)?.delete(handler as EventHandler);
    };
  }

  emit<E extends keyof Events>(event: E, ...args: Events[E]): void {
    const handlers = this.handlers.get(event);
    if (handlers) {
      for (const handler of handlers) {
        try {
          handler(...args);
        } catch {
          // Silent catch
        }
      }
    }
  }

  removeAllListeners(): void {
    this.handlers.clear();
  }
}

// ============================================================
// Z#320 VhK — Build Path Filter
// ============================================================

const BUILD_PATH_PATTERNS = [
  "/build-ant/",
  "/build-external/",
  "/build-external-native/",
  "/build-ant-native/",
];

export function isBuildPath(filePath: string): boolean {
  return BUILD_PATH_PATTERNS.some((pattern) => filePath.includes(pattern));
}

export function filterBuildPaths(paths: string[]): string[] {
  return paths.filter((p) => !isBuildPath(p));
}

// ============================================================
// Z#215 mLK — File Watcher with Chokidar-like interface
// ============================================================

export interface FileWatcherOptions {
  reloadDebounce?: number;
  chokidarInterval?: number;
}

export class FileWatcher {
  private watchers = new Map<string, Set<() => void>>();
  private pending = new Set<string>();
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private reloadDebounce: number;
  private chokidarInterval: number;

  constructor(options: FileWatcherOptions = {}) {
    this.reloadDebounce = options.reloadDebounce ?? 300;
    this.chokidarInterval = options.chokidarInterval ?? 1000;
  }

  add(path: string, callback: () => void): void {
    if (!this.watchers.has(path)) {
      this.watchers.set(path, new Set());
    }
    this.watchers.get(path)!.add(callback);
  }

  remove(path: string, callback: () => void): void {
    this.watchers.get(path)?.delete(callback);
  }

  notify(path: string): void {
    this.pending.add(path);

    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      const paths = new Set(this.pending);
      this.pending.clear();

      for (const [watchPath, cbs] of this.watchers) {
        for (const changedPath of paths) {
          if (changedPath.startsWith(watchPath) || changedPath === watchPath) {
            for (const cb of cbs) cb();
            break;
          }
        }
      }
    }, this.reloadDebounce);
  }
}

// ============================================================
// Z#109 jWK — Update Spinner/Progress Helper
// ============================================================

export function getUpdateCommand(packageManager: string, packageName?: string): string {
  const pkg = packageName ?? "claude-code";
  switch (packageManager) {
    case "homebrew": return `brew upgrade ${pkg}`;
    case "winget": return "winget upgrade Anthropic.ClaudeCode";
    case "apk": return `apk upgrade ${pkg}`;
    case "npm": return `npm update -g ${pkg}`;
    default: return `npm update -g ${pkg}`;
  }
}

// ============================================================
// Z#139 d0K — Component Focus Manager
// ============================================================

export function useFocusManager(initialFocus: string | null = null): {
  focusedId: string | null;
  setFocus: (id: string | null) => void;
  isFocused: (id: string) => boolean;
} {
  const [focusedId, setFocusedId] = useState<string | null>(initialFocus);

  const setFocus = useCallback((id: string | null) => {
    setFocusedId(id);
  }, []);

  const isFocused = useCallback(
    (id: string) => focusedId === id,
    [focusedId]
  );

  return { focusedId, setFocus, isFocused };
}

// ============================================================
// Z#152 lGK — File State Watcher
// ============================================================

export function watchFile(
  filePath: string,
  onChange: (filePath: string, event: string) => void
): () => void {
  // In Node.js, use fs.watch
  try {
    const fs = require("fs");
    const watcher = fs.watch(filePath, (event: string) => {
      onChange(filePath, event);
    });
    return () => watcher.close();
  } catch {
    return () => {};
  }
}

// ============================================================
// Z#270 yVK — Timeout Wrapper with Cleanup
// ============================================================

export function createSafeTimeout(
  callback: () => void,
  ms: number,
  ref: { current: boolean }
): () => void {
  const timer = setTimeout(() => {
    if (ref.current) return;
    callback();
  }, ms);

  return () => clearTimeout(timer);
}

// ============================================================
// Z#379 JbK — Callback Port Parser
// ============================================================

export function parseCallbackPort(
  port?: string,
  clientId?: string
): { port: number; clientId?: string } | undefined {
  if (!port && !clientId) return undefined;

  const parsedPort = port ? parseInt(port, 10) : undefined;
  if (parsedPort && isNaN(parsedPort)) return undefined;

  return {
    port: parsedPort || 0,
    ...(clientId ? { clientId } : parsedPort ? { port: parsedPort } : {}),
  };
}

// ============================================================
// Z#406 im8 — Request ID Extractor
// ============================================================

export function extractRequestId(headers: Record<string, string>): string | undefined {
  return headers["x-last-request-id"];
}

// ============================================================
// Z#436 Pp8 — File Descriptor Parser
// ============================================================

export function parseFileDescriptor(fd?: { fd?: number }): number {
  return typeof fd?.fd === "number" ? fd.fd : -1;
}

// ============================================================
// Z#440 tmK — Package Version Checker
// ============================================================

export function checkVersion(
  current: string,
  latest: string
): { needsUpdate: boolean; isBreaking: boolean } {
  const [cMaj, cMin] = current.split(".").map(Number);
  const [lMaj, lMin] = latest.split(".").map(Number);

  return {
    needsUpdate: cMaj < lMaj || (cMaj === lMaj && cMin < lMin),
    isBreaking: cMaj < lMaj,
  };
}
