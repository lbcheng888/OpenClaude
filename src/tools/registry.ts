// Tool registry and execution engine
import type { ToolDef } from "../api/client.js";
import { execSync, exec } from "child_process";
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from "fs";
import { resolve, relative } from "path";

export interface ToolResult {
  content: string;
  isError?: boolean;
}

export interface Tool {
  name: string;
  description: string;
  input_schema: ToolDef["input_schema"];
  execute: (input: Record<string, unknown>) => Promise<ToolResult>;
  requiresPermission?: boolean;
}

// ============================================================
// Built-in Tools (1:1 from binary)
// ============================================================

export const BUILTIN_TOOLS: Tool[] = [
  {
    name: "Bash",
    description: "Execute a shell command in the current working directory",
    input_schema: {
      type: "object",
      properties: {
        command: { type: "string", description: "The shell command to execute" },
        description: { type: "string", description: "Description of what the command does" },
      },
      required: ["command"],
    },
    requiresPermission: true,
    async execute(input) {
      const cmd = input.command as string;
      try {
        const result = execSync(cmd, {
          cwd: process.cwd(),
          timeout: 120000,
          maxBuffer: 10 * 1024 * 1024,
          encoding: "utf-8",
        });
        return { content: result || "(no output)" };
      } catch (e: any) {
        return { content: e.stderr || e.message || "Command failed", isError: true };
      }
    },
  },
  {
    name: "Read",
    description: "Read a file from the local filesystem",
    input_schema: {
      type: "object",
      properties: {
        file_path: { type: "string", description: "Path to the file to read" },
        offset: { type: "number", description: "Line number to start reading from" },
        limit: { type: "number", description: "Number of lines to read" },
      },
      required: ["file_path"],
    },
    requiresPermission: true,
    async execute(input) {
      const fp = resolve(input.file_path as string);
      if (!existsSync(fp)) return { content: `Error: File not found: ${fp}`, isError: true };
      try {
        const content = readFileSync(fp, "utf-8");
        const lines = content.split("\n");
        const offset = (input.offset as number) || 0;
        const limit = (input.limit as number) || lines.length;
        return { content: lines.slice(offset, offset + limit).join("\n") };
      } catch (e: any) {
        return { content: `Error reading file: ${e.message}`, isError: true };
      }
    },
  },
  {
    name: "Write",
    description: "Write a file to the local filesystem",
    input_schema: {
      type: "object",
      properties: {
        file_path: { type: "string", description: "Path to write the file to" },
        content: { type: "string", description: "Content to write" },
      },
      required: ["file_path", "content"],
    },
    requiresPermission: true,
    async execute(input) {
      const fp = resolve(input.file_path as string);
      try {
        writeFileSync(fp, input.content as string, "utf-8");
        return { content: `File written: ${relative(process.cwd(), fp)}` };
      } catch (e: any) {
        return { content: `Error writing file: ${e.message}`, isError: true };
      }
    },
  },
  {
    name: "Edit",
    description: "Make precise edits to an existing file",
    input_schema: {
      type: "object",
      properties: {
        file_path: { type: "string", description: "Path to the file to edit" },
        old_string: { type: "string", description: "Text to replace" },
        new_string: { type: "string", description: "Replacement text" },
        replace_all: { type: "boolean", description: "Replace all occurrences" },
      },
      required: ["file_path", "old_string", "new_string"],
    },
    requiresPermission: true,
    async execute(input) {
      const fp = resolve(input.file_path as string);
      if (!existsSync(fp)) return { content: `Error: File not found: ${fp}`, isError: true };
      try {
        let content = readFileSync(fp, "utf-8");
        const oldS = input.old_string as string;
        const newS = input.new_string as string;
        const replaceAll = input.replace_all as boolean;

        if (replaceAll) {
          content = content.split(oldS).join(newS);
        } else {
          const idx = content.indexOf(oldS);
          if (idx === -1) return { content: `Error: old_string not found in file`, isError: true };
          content = content.slice(0, idx) + newS + content.slice(idx + oldS.length);
        }

        writeFileSync(fp, content, "utf-8");
        return { content: `File edited: ${relative(process.cwd(), fp)}` };
      } catch (e: any) {
        return { content: `Error editing file: ${e.message}`, isError: true };
      }
    },
  },
  {
    name: "Glob",
    description: "Find files matching a glob pattern",
    input_schema: {
      type: "object",
      properties: {
        pattern: { type: "string", description: "Glob pattern to match (e.g. *.ts)" },
        path: { type: "string", description: "Directory to search in" },
      },
      required: ["pattern"],
    },
    async execute(input) {
      const dir = resolve((input.path as string) || ".");
      const pattern = input.pattern as string;
      try {
        const regex = new RegExp(
          "^" + pattern.replace(/\./g, "\\.").replace(/\*/g, ".*").replace(/\?/g, ".") + "$"
        );
        const files = readdirSync(dir, { recursive: true } as any)
          .filter((f) => regex.test(f))
          .slice(0, 100);
        return { content: files.join("\n") || "(no matches)" };
      } catch (e: any) {
        return { content: `Error: ${e.message}`, isError: true };
      }
    },
  },
  {
    name: "Grep",
    description: "Search file contents using regex",
    input_schema: {
      type: "object",
      properties: {
        pattern: { type: "string", description: "Regex pattern to search for" },
        path: { type: "string", description: "Directory or file to search in" },
        include: { type: "string", description: "File pattern to include (e.g. *.ts)" },
      },
      required: ["pattern"],
    },
    async execute(input) {
      const dir = resolve((input.path as string) || ".");
      const pattern = input.pattern as string;
      const include = (input.include as string) || "*";
      try {
        const regex = new RegExp(pattern, "gi");
        const incRegex = new RegExp(
          "^" + include.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$"
        );
        const results: string[] = [];
        const files = existsSync(dir) && statSync(dir).isFile()
          ? [dir]
          : readdirSync(dir, { recursive: true } as any).filter((f) => incRegex.test(f));
        for (const f of files.slice(0, 50)) {
          const fp = statSync(dir).isFile() ? dir : resolve(dir, f);
          try {
            const content = readFileSync(fp, "utf-8");
            const lines = content.split("\n");
            for (let i = 0; i < lines.length; i++) {
              if (regex.test(lines[i])) {
                results.push(`${f}:${i + 1}: ${lines[i].trim().slice(0, 200)}`);
                if (results.length >= 200) break;
              }
            }
          } catch {}
          if (results.length >= 200) break;
        }
        return { content: results.join("\n") || "(no matches)" };
      } catch (e: any) {
        return { content: `Error: ${e.message}`, isError: true };
      }
    },
  },
];

export function getToolDefs(): ToolDef[] {
  return BUILTIN_TOOLS.map((t) => ({
    name: t.name,
    description: t.description,
    input_schema: t.input_schema,
  }));
}

export async function executeTool(
  name: string,
  input: Record<string, unknown>
): Promise<ToolResult> {
  const tool = BUILTIN_TOOLS.find((t) => t.name === name);
  if (!tool) return { content: `Error: Unknown tool: ${name}`, isError: true };
  return tool.execute(input);
}
