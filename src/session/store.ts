// Session persistence (1:1 from binary y_/ZX6 functions)
import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";
import { homedir } from "os";

const SESSION_DIR = join(homedir(), ".claude", "sessions");

interface SessionData {
  id: string;
  title?: string;
  messages: Array<{ role: string; content: string; timestamp: number }>;
  createdAt: number;
  updatedAt: number;
  permissionMode: string;
}

export function saveSession(session: SessionData): void {
  try {
    if (!existsSync(SESSION_DIR)) mkdirSync(SESSION_DIR, { recursive: true });
    session.updatedAt = Date.now();
    writeFileSync(join(SESSION_DIR, `${session.id}.json`), JSON.stringify(session, null, 2));
  } catch {}
}

export function loadSession(id: string): SessionData | null {
  try {
    const path = join(SESSION_DIR, `${id}.json`);
    if (!existsSync(path)) return null;
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch { return null; }
}

export function listSessions(): Array<{ id: string; title?: string; createdAt: number; messageCount: number }> {
  try {
    if (!existsSync(SESSION_DIR)) return [];
    const fs = { readdirSync };
    return fs.readdirSync(SESSION_DIR)
      .filter((f: string) => f.endsWith(".json"))
      .map((f: string) => {
        const data = JSON.parse(readFileSync(join(SESSION_DIR, f), "utf-8"));
        return { id: data.id, title: data.title, createdAt: data.createdAt, messageCount: data.messages?.length || 0 };
      })
      .sort((a: any, b: any) => b.createdAt - a.createdAt);
  } catch { return []; }
}

export function createSession(title?: string): SessionData {
  return {
    id: `session_${Date.now().toString(36)}`,
    title,
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    permissionMode: "default",
  };
}
