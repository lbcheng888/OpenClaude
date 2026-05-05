import { describe, expect, test } from "bun:test";
import { runSettingsHooks } from "./runner.js";

describe("settings hook runner", () => {
  test("command hooks receive official JSON input and can block with exit code 2", async () => {
    const outcome = await runSettingsHooks(
      {
        hooks: {
          PreToolUse: [
            {
              matcher: "Bash(npm *)",
              hooks: [
                {
                  type: "command",
                  command:
                    "node -e \"let s='';process.stdin.on('data',d=>s+=d);process.stdin.on('end',()=>{const x=JSON.parse(s);process.stderr.write('blocked '+x.tool_input.command);process.exit(2)})\"",
                },
              ],
            },
          ],
        },
      },
      "PreToolUse",
      {
        tool_name: "Bash",
        tool_input: { command: "npm test" },
        tool_use_id: "toolu_1",
      },
    );

    expect(outcome.blocked).toBe(true);
    expect(outcome.message).toBe("blocked npm test");
  });

  test("non-matching hooks do not run", async () => {
    const outcome = await runSettingsHooks(
      {
        hooks: {
          PreToolUse: [
            {
              matcher: "Read",
              hooks: [{ type: "command", command: "node -e \"process.exit(2)\"" }],
            },
          ],
        },
      },
      "PreToolUse",
      {
        tool_name: "Bash",
        tool_input: { command: "npm test" },
      },
    );

    expect(outcome.blocked).toBe(false);
  });

  test("parses PreToolUse hookSpecificOutput decisions and updated input", async () => {
    const outcome = await runSettingsHooks(
      {
        hooks: {
          PreToolUse: [
            {
              matcher: "Bash",
              hooks: [
                {
                  type: "command",
                  command:
                    "node -e \"process.stdout.write(JSON.stringify({hookSpecificOutput:{hookEventName:'PreToolUse',permissionDecision:'allow',permissionDecisionReason:'ok',updatedInput:{command:'pwd'},additionalContext:'context'}}))\"",
                },
              ],
            },
          ],
        },
      },
      "PreToolUse",
      {
        tool_name: "Bash",
        tool_input: { command: "pwd" },
      },
    );

    expect(outcome.blocked).toBe(false);
    expect(outcome.permissionBehavior).toBe("allow");
    expect(outcome.permissionDecisionReason).toBe("ok");
    expect(outcome.updatedInput).toEqual({ command: "pwd" });
    expect(outcome.additionalContext).toEqual(["context"]);
  });

  test("parses PermissionRequest hook decisions", async () => {
    const outcome = await runSettingsHooks(
      {
        hooks: {
          PermissionRequest: [
            {
              matcher: "Bash",
              hooks: [
                {
                  type: "command",
                  command:
                    "node -e \"process.stdout.write(JSON.stringify({hookSpecificOutput:{hookEventName:'PermissionRequest',decision:{behavior:'deny',message:'nope'}}}))\"",
                },
              ],
            },
          ],
        },
      },
      "PermissionRequest",
      {
        tool_name: "Bash",
        tool_input: { command: "npm test" },
      },
    );

    expect(outcome.permissionDecision).toEqual({ behavior: "deny", message: "nope" });
  });
});
