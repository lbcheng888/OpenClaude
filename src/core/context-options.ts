import { getConfiguredLanguagePreference } from "./language.js";
import { getConfiguredOutputStyle } from "./output-style.js";
import { discoverSkills } from "./skills.js";

export function buildRuntimeOfficialContextOptions(
  model: string | undefined,
  cwd = process.cwd(),
  additionalWorkingDirectories: string[] = [],
) {
  return {
    model,
    cwd,
    additionalWorkingDirectories,
    languagePreference: getConfiguredLanguagePreference(),
    outputStyle: getConfiguredOutputStyle(cwd, additionalWorkingDirectories),
    mcpInstructions: getConfiguredMcpInstructions(),
    skills: discoverSkills(cwd, additionalWorkingDirectories),
  };
}

function getConfiguredMcpInstructions(): Array<{ name: string; instructions?: string | null }> {
  const raw = process.env.CLAUDE_CODE_MCP_INSTRUCTIONS_JSON;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(item => {
        if (!item || typeof item !== "object") return null;
        const name = typeof item.name === "string" ? item.name.trim() : "";
        const instructions = typeof item.instructions === "string" ? item.instructions.trim() : "";
        if (!name || !instructions) return null;
        return { name, instructions };
      })
      .filter((item): item is { name: string; instructions: string } => Boolean(item));
  } catch {
    return [];
  }
}
