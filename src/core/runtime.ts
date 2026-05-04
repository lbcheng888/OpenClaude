// 1:1 from binary - core runtime functions
export function isTruthy(v: string | undefined | boolean): boolean {
  if (!v) return false;
  if (typeof v === "boolean") return v;
  return ["1", "true", "yes", "on"].includes(String(v).toLowerCase().trim());
}
export function toError(e: any): Error { return e instanceof Error ? e : Error(String(e)); }
export function getSessionId(): string { return sessionState.id; }
export function isInteractive(): boolean { return sessionState.interactive; }
export const sessionState = { id: `session_${Date.now().toString(36)}`, interactive: true };
export function emitTelemetry(event: string, data: Record<string, unknown> = {}): void {}
