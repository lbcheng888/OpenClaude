// 1:1 from binary - core runtime functions
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

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

// Session-scoped effort level storage for cross-session isolation
const effortBySession: Record<string, string | undefined> = {};
export function getSessionEffort(sessionId: string): string | undefined { return effortBySession[sessionId]; }
export function setSessionEffort(sessionId: string, effort: string | undefined): void { effortBySession[sessionId] = effort; }

// -- Platform detection --

export function isWSL(): boolean {
  if (process.platform !== "linux") return false;
  try {
    const release = readFileSync("/proc/sys/kernel/osrelease", "utf8").toLowerCase();
    return release.includes("microsoft") || release.includes("wsl");
  } catch {
    return false;
  }
}

export function getWslVersion(): string | null {
  if (process.platform !== "linux") return null;
  try {
    const release = readFileSync("/proc/sys/kernel/osrelease", "utf8").toLowerCase();
    if (!release.includes("microsoft") && !release.includes("wsl")) return null;
    const m = release.match(/wsl[-\s]?(\d+)/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

// -- Config directory (respects CLAUDE_CONFIG_DIR env var) --

export function getClaudeConfigDir(): string {
  return process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude");
}

// -- IDE shell-integration lock file path --

export function getShellIntegrationLockPath(): string {
  return join(getClaudeConfigDir(), "shell-integration.lock");
}

// -- PowerShell clipboard fallback for Windows/WSL image paste --

export async function readClipboardImageFromPowerShell(): Promise<Buffer | null> {
  if (process.platform !== "win32" && !isWSL()) return null;
  try {
    const { execFile } = await import("node:child_process");
    const { promisify } = await import("node:util");
    const execFileAsync = promisify(execFile);
    const { tmpdir } = await import("node:os");
    const { randomUUID } = await import("node:crypto");
    const { existsSync, readFileSync: rfs, unlinkSync } = await import("node:fs");

    const tempPath = join(tmpdir(), `claude-clipboard-${process.pid}-${randomUUID()}.png`);
    const escapedPath = tempPath.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

    const { stdout } = await execFileAsync(
      isWSL() ? "powershell.exe" : "powershell",
      [
        "-NoProfile",
        "-Command",
        [
          "Add-Type -AssemblyName System.Drawing;",
          "Add-Type -AssemblyName System.Windows.Forms;",
          `$img = [System.Windows.Forms.Clipboard]::GetImage();`,
          `if ($img -ne $null) { $img.Save("${escapedPath}", [System.Drawing.Imaging.ImageFormat]::Png); Write-Host OK } else { Write-Host NO_IMAGE }`,
        ].join(" "),
      ],
      { timeout: 5000 },
    );

    if (stdout.trim() !== "OK" || !existsSync(tempPath)) return null;

    const buffer = rfs(tempPath);
    try { unlinkSync(tempPath); } catch { /* best-effort cleanup */ }
    return buffer;
  } catch {
    return null;
  }
}
