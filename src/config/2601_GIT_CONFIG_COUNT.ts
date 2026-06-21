// @ts-nocheck
import {st as q_} from "../../vendor/m5.ts";
import {b as L} from "../../runtime.ts";
import {sn as A6} from "./0047_namespace.ts";
/**
 * Git non-interactive environment helpers.
 *
 * Provides utilities for running git in fully non-interactive mode:
 * - `Q2H` detects whether the process is running in a remote/plugin-HTTPS context.
 * - `pg` builds a patched copy of `process.env` that suppresses every credential
 *   prompt git (and GCM) might emit, by appending a `GIT_CONFIG_*` entry that
 *   sets `credential.interactive=false`.
 * - `s73` / `Ke` are the base non-interactive env vars and SSH batch-mode args.
 */

/** Returns true when running in a remote or plugin-HTTPS context. */
function Q2H(): boolean {
  return q_(process.env.CLAUDE_CODE_REMOTE) || q_(process.env.CLAUDE_CODE_PLUGIN_PREFER_HTTPS);
}

/**
 * Returns a copy of the given environment object with git credential prompts
 * disabled. Appends a new `GIT_CONFIG_KEY_N` / `GIT_CONFIG_VALUE_N` pair that
 * sets `credential.interactive=false`, incrementing `GIT_CONFIG_COUNT`
 * accordingly.
 *
 * @param env - Source environment; defaults to `process.env`.
 */
function pg(env: NodeJS.ProcessEnv = process.env): NodeJS.ProcessEnv {
  let existingCount = Number(env.GIT_CONFIG_COUNT),
    configIndex = Number.isInteger(existingCount) && existingCount > 0 ? existingCount : 0;
  return {
    ...env,
    ...s73,
    GIT_CONFIG_COUNT: String(configIndex + 1),
    [`GIT_CONFIG_KEY_${configIndex}`]: "credential.interactive",
    [`GIT_CONFIG_VALUE_${configIndex}`]: "false"
  };
}

/** Base git non-interactive environment overrides. */
var s73: Record<string, string>, Ke: string[];

/** Lazy module initializer — sets `s73` and `Ke`. */
var FtH = L(() => {
  A6();
  s73 = {
    GIT_TERMINAL_PROMPT: "0",
    GIT_ASKPASS: "",
    GCM_INTERACTIVE: "never"
  };
  Ke = ["-c", "core.sshCommand=ssh -o BatchMode=yes -o StrictHostKeyChecking=yes"];
});

export {Q2H as Jwe,pg as isBashAvailable,s73 as xhd,Ke as XZ,FtH as qet};
