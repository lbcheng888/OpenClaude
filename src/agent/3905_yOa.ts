// @ts-nocheck
import {HOOK_EVENTS as Uy} from "../../vendor/m718.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
import {sQ as Ds} from "../../vendor/m721.ts";
/**
 * Registers hooks declared in a skill/agent frontmatter block into the
 * session-scoped hooks registry for the given session.
 *
 * When called from a subagent context the "Stop" event is automatically
 * remapped to "SubagentStop" because subagents fire the SubagentStop event,
 * not the top-level Stop event.
 *
 * @param hookRegistry   - The session hooks registry (has `.add(sessionId, event, matcher, hook)`)
 * @param sessionId      - ID of the session to register hooks under
 * @param hooksConfig    - Frontmatter hooks config keyed by hook event name
 * @param source         - Human-readable label for the source (used in log messages)
 * @param isSubagent     - When true, converts "Stop" hooks to "SubagentStop"
 */
function l6K(
  hookRegistry: { add: (sessionId: string, event: string, matcher: string, hook: unknown) => void },
  sessionId: string,
  hooksConfig: Record<string, Array<{ matcher?: string; hooks: unknown[] }>> | null | undefined,
  source: string,
  isSubagent: boolean = !1
): void {
  if (!hooksConfig || Object.keys(hooksConfig).length === 0) return;
  let registeredCount = 0;
  for (let hookEvent of Uy) {
    let hookEntries = hooksConfig[hookEvent];
    if (!hookEntries || hookEntries.length === 0) continue;
    let resolvedEvent = hookEvent;
    if (isSubagent && hookEvent === "Stop") resolvedEvent = "SubagentStop", N(`Converting Stop hook to SubagentStop for ${source} (subagents trigger SubagentStop)`);
    for (let entry of hookEntries) {
      let matcher = entry.matcher ?? "",
        hooks = entry.hooks;
      if (!hooks || hooks.length === 0) continue;
      for (let hook of hooks) hookRegistry.add(sessionId, resolvedEvent, matcher, hook), registeredCount++;
    }
  }
  if (registeredCount > 0) N(`Registered ${registeredCount} frontmatter hook(s) from ${source} for session ${sessionId}`);
}

/** Module lazy-init: depends on Ds (session hooks registry) and FH (config/logging). */
var n6K = L(() => {
  Ds();
  FH();
});

export {l6K as _Oa,n6K as yOa};
