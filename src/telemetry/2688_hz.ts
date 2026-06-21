// @ts-nocheck
import {wRe as XPH,V5 as gg,aee as xzH} from "../session/2687_aee.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b as L} from "../../runtime.ts";
/**
 * Monitor tool definition for the telemetry subsystem.
 *
 * Exports the Monitor tool name constant, its description string, and a
 * feature-flag helper for the `tengu_amber_sentinel` gate. The lazy
 * initializer `Ii` wires in the GrowthBook (`o6`) and push-notification
 * (`xzH`) dependencies.
 */

/**
 * Returns an additional system-prompt hint telling the model to send a
 * PushNotification when a monitor event arrives that the user would want to
 * act on immediately. Returns an empty string when push notifications are
 * disabled.
 */
function getMonitorPushNotificationHint(): string {
  return XPH() ? `

When an event lands that the user would want to act on now — an error appeared, the status they were waiting on flipped — send a ${gg}. Not every event is worth a push; the ones that change what they'd do next are.` : "";
}

/**
 * Returns the value of the `tengu_amber_sentinel` feature flag (default
 * `false`). Used to gate amber-sentinel monitor behaviour.
 */
function isAmberSentinelEnabled(): boolean {
  return Y_("tengu_amber_sentinel", !1);
}

/** Display name for the Monitor tool. */
var aM: string = "Monitor",
  /** Full description / instructions for the Monitor tool shown to the model. */
  monitorToolDescription: string = 'Start a background monitor that streams events from a long-running script. Each stdout line is an event — you keep working and notifications arrive in the chat. Events arrive on their own schedule and are not replies from the user, even if one lands while you\'re waiting for the user to answer a question.\n\nPick by how many notifications you need:\n- **One** ("tell me when the server is ready / the build finishes") → use **Bash with `run_in_background`** and a command that exits when the condition is true, e.g. `until grep -q "Ready in" dev.log; do sleep 0.5; done`. You get a single completion notification when it exits.\n- **One per occurrence, indefinitely** ("tell me every time an ERROR line appears") → Monitor with an unbounded command (`tail -f`, `inotifywait -m`, `while true`).\n- **One per occurrence, until a known end** ("emit each CI step result, stop when the run completes") → Monitor with a command that emits lines and then exits.\n\nYour script\'s stdout is the event stream. Each line becomes a notification. Exit ends the watch.\n\n  # Each matching log line is an event\n  tail -f /var/log/app.log | grep --line-buffered "ERROR"\n\n  # Each file change is an event\n  inotifywait -m --format \'%e %f\' /watched/dir\n\n  # Poll GitHub for new PR comments and emit one line per new comment\n  last=$(date -u +%Y-%m-%dT%H:%M:%SZ)\n  while true; do\n    now=$(date -u +%Y-%m-%dT%H:%M:%SZ)\n    gh api "repos/owner/repo/issues/123/comments?since=$last" --jq \'.[] | "\\(.user.login): \\(.body)"\'\n    last=$now; sleep 30\n  done\n\n  # Node script that emits events as they arrive (e.g. WebSocket listener)\n  node watch-for-events.js\n\n  # Per-occurrence with a natural end: emit each CI check as it lands, exit when the run completes\n  prev=""\n  while true; do\n    s=$(gh pr checks 123 --json name,bucket)\n    cur=$(jq -r \'.[] | select(.bucket!="pending") | "\\(.name): \\(.bucket)"\' <<<"$s" | sort)\n    comm -13 <(echo "$prev") <(echo "$cur")\n    prev=$cur\n    jq -e \'all(.bucket!="pending")\' <<<"$s" >/dev/null && break\n    sleep 30\n  done\n\n**Don\'t use an unbounded command for a single notification.** `tail -f`, `inotifywait -m`, and `while true` never exit on their own, so the monitor stays armed until timeout even after the event has fired. For "tell me when X is ready," use Bash `run_in_background` with an `until` loop instead (one notification, ends in seconds). Note that `tail -f log | grep -m 1 ...` does *not* fix this: if the log goes quiet after the match, `tail` never receives SIGPIPE and the pipeline hangs anyway.\n\n**Script quality:**\n- Every pipe stage must flush per line or matches sit in its buffer unseen: `grep` needs `--line-buffered`, `awk` needs `fflush()`. `head` cannot flush at all — `| head -N` delivers nothing until N matches accumulate, then ends the stream.\n- In poll loops, handle transient failures (`curl ... || true`) — one failed request shouldn\'t kill the monitor.\n- Poll intervals: 30s+ for remote APIs (rate limits), 0.5-1s for local checks.\n- Write a specific `description` — it appears in every notification ("errors in deploy.log" not "watching logs").\n- Only stdout is the event stream. Stderr goes to the output file (readable via Read) but does not trigger notifications — for a command you run directly (e.g. `python train.py 2>&1 | grep --line-buffered ...`), merge stderr with `2>&1` so its failures reach your filter. (No effect on `tail -f` of an existing log — that file only contains what its writer redirected.)\n\n**Coverage — silence is not success.** When watching a job or process for an outcome, your filter must match every terminal state, not just the happy path. A monitor that greps only for the success marker stays silent through a crashloop, a hung process, or an unexpected exit — and silence looks identical to "still running." Before arming, ask: *if this process crashed right now, would my filter emit anything?* If not, widen it.\n\n  # Wrong — silent on crash, hang, or any non-success exit\n  tail -f run.log | grep --line-buffered "elapsed_steps="\n\n  # Right — one alternation covering progress + the failure signatures you\'d act on\n  tail -f run.log | grep -E --line-buffered "elapsed_steps=|Traceback|Error|FAILED|assert|Killed|OOM"\n\nFor poll loops checking job state, emit on every terminal status (`succeeded|failed|cancelled|timeout`), not just success. If you cannot confidently enumerate the failure signatures, broaden the grep alternation rather than narrow it — some extra noise is better than missing a crashloop.\n\n**Output volume**: Every stdout line is a conversation message, so the filter should be selective — but selective means "the lines you\'d act on," not "only good news." Never pipe raw logs; filter to exactly the success and failure signals you care about. Monitors that produce too many events are automatically stopped; restart with a tighter filter if this happens.\n\nStdout lines within 200ms are batched into a single notification, so multiline output from a single event groups naturally.\n\nThe script runs in the same shell environment as Bash. Exit ends the watch (exit code is reported). Timeout → killed. Set `persistent: true` for session-length watches (PR monitoring, log tails) — the monitor runs until you call TaskStop or the session ends. Use TaskStop to cancel early.';

/** Lazy module initializer: registers GrowthBook and push-notification dependencies. */
var Ii = L(() => {
  o6();
  xzH();
});

export {getMonitorPushNotificationHint as Z6r,isAmberSentinelEnabled as sq,aM as TC,monitorToolDescription as ejr,Ii as hz};
