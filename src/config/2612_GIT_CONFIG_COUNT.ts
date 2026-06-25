// @ts-nocheck
import {nt} from "../../vendor/m127.ts";
import {b} from "../../runtime.ts";
import {dn} from "./0137_namespace.ts";
/**
 * Git non-interactive environment helpers.
 *
 * Provides utilities for running git in fully non-interactive mode:
 * - `Pwe` detects whether the process is running in a remote/plugin-HTTPS context.
 * - `nW` builds a patched copy of `process.env` that suppresses every credential
 *   prompt git (and GCM) might emit, by appending `GIT_CONFIG_*` entries that
 *   set `credential.interactive=false`.
 * - `B8r` is the low-level helper that appends a list of `GIT_CONFIG_KEY_N` /
 *   `GIT_CONFIG_VALUE_N` pairs and bumps `GIT_CONFIG_COUNT` accordingly.
 * - `QOt` / `jZ` are the base non-interactive env vars and SSH batch-mode args.
 */

/** Returns true when running in a remote or plugin-HTTPS context. */
function Pwe(): boolean {
  return nt(process.env.CLAUDE_CODE_REMOTE) || nt(process.env.CLAUDE_CODE_PLUGIN_PREFER_HTTPS);
}

/**
 * Returns a copy of the given environment object with git credential prompts
 * disabled, by appending a `credential.interactive=false` config entry.
 *
 * @param env - Source environment; defaults to `process.env`.
 */
function nW(env: NodeJS.ProcessEnv = process.env): NodeJS.ProcessEnv {
  return {
    ...env,
    ...QOt,
    ...B8r(env.GIT_CONFIG_COUNT, [["credential.interactive", "false"]])
  };
}

/**
 * Builds the `GIT_CONFIG_*` overrides that append the given key/value config
 * entries on top of any pre-existing count. Returns a partial env containing
 * the bumped `GIT_CONFIG_COUNT` plus one `GIT_CONFIG_KEY_N` / `GIT_CONFIG_VALUE_N`
 * pair per entry.
 *
 * @param existingCountRaw - Raw current `GIT_CONFIG_COUNT` value (may be undefined).
 * @param entries - Key/value config pairs to append.
 */
function B8r(existingCountRaw: string | undefined, entries: Array<[string, string]>): Record<string, string> {
  let existingCount = Number(existingCountRaw),
    baseIndex = Number.isInteger(existingCount) && existingCount > 0 ? existingCount : 0,
    result: Record<string, string> = {
      GIT_CONFIG_COUNT: String(baseIndex + entries.length)
    };
  return entries.forEach(([key, value], offset) => {
    result[`GIT_CONFIG_KEY_${baseIndex + offset}`] = key, result[`GIT_CONFIG_VALUE_${baseIndex + offset}`] = value;
  }), result;
}

/** Base git non-interactive environment overrides; SSH batch-mode args. */
var QOt: Record<string, string>, jZ: string[];

/** Lazy module initializer — sets `QOt` and `jZ`. */
var Z2e = b(() => {
  dn();
  QOt = {
    GIT_TERMINAL_PROMPT: "0",
    GIT_ASKPASS: "",
    GCM_INTERACTIVE: "never"
  };
  jZ = ["-c", "core.sshCommand=ssh -o BatchMode=yes -o StrictHostKeyChecking=yes"];
});

export {Pwe,nW,B8r,QOt,jZ,Z2e};
