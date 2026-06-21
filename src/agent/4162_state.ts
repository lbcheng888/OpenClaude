// @ts-nocheck
import {Wn as Gn} from "../api/0459_getOauthConfig.ts";
import {qt as Wt,Xt} from "../config/0228_encoding.ts";
import {b} from "../../runtime.ts";
import {iv as dw} from "../../vendor/m454.ts";
import {we as Re} from "../../vendor/m455.ts";
import {hn as Tn} from "../../vendor/m251.ts";
// @ts-nocheck
function isTerminalState(state) {
  return TERMINAL_STATES.has(state);
}
function jA(text, maxLength) {
  if (text.length <= maxLength) return text;
  let cut = maxLength - 1;
  if (isHighSurrogate(text.charCodeAt(cut - 1))) cut--;
  return text.slice(0, cut) + "\u2026";
}
function isHighSurrogate(code) {
  return code >= 55296 && code <= 56319;
}
function isInsideCodeFence(text, offset) {
  let openFenceChar = null,
    openFenceLen = 0,
    cursor = 0;
  while (cursor < offset) {
    let backtickIdx = text.indexOf("```", cursor),
      tildeIdx = text.indexOf("~~~", cursor),
      fenceIdx = backtickIdx === -1 ? tildeIdx : tildeIdx === -1 ? backtickIdx : Math.min(backtickIdx, tildeIdx);
    if (fenceIdx === -1 || fenceIdx >= offset) break;
    let fenceChar = text[fenceIdx],
      precedingIdx = fenceIdx - 1,
      leadingSpaces = 0;
    while (precedingIdx >= 0 && text[precedingIdx] === " " && leadingSpaces < 3) precedingIdx--, leadingSpaces++;
    let atLineStart = precedingIdx < 0 || text[precedingIdx] === `
`,
      fenceLen = 3;
    cursor = fenceIdx + 3;
    while (text[cursor] === fenceChar) cursor++, fenceLen++;
    if (!atLineStart) continue;
    if (openFenceChar === null) openFenceChar = fenceChar, openFenceLen = fenceLen;else if (openFenceChar === fenceChar && fenceLen >= openFenceLen) openFenceChar = null, openFenceLen = 0;
  }
  return openFenceChar !== null;
}
function ukK(errorCode, detail = "") {
  switch (errorCode) {
    case "authentication_failed":
      return {
        state: "blocked",
        needs: "login required \u2014 run /login"
      };
    case "oauth_org_not_allowed":
      return {
        state: "blocked",
        needs: "org disabled OAuth \u2014 use API key or ask admin"
      };
    case "billing_error":
      return {
        state: "blocked",
        needs: "usage limit reached \u2014 check plan"
      };
    case "rate_limit":
      return {
        state: "blocked",
        needs: "rate limited \u2014 wait and retry"
      };
    case "overloaded":
      return {
        state: "blocked",
        needs: "API overloaded \u2014 wait and retry"
      };
    case "server_error":
      return {
        state: "blocked",
        needs: "API unavailable \u2014 retry"
      };
    case "invalid_request":
      return /\b(too long|too large|exceeds|token limit|prompt is too long)\b/i.test(detail) ? {
        state: "blocked",
        needs: "request too large \u2014 /compact or trim"
      } : {
        state: "blocked",
        needs: "invalid API request \u2014 see detail"
      };
    case "max_output_tokens":
      return null;
    case undefined:
      return {
        state: "blocked",
        needs: "API error \u2014 see detail"
      };
    case "unknown":
    default:
      return {
        state: "failed",
        needs: "API error"
      };
  }
}
function findStatusMarker(fullText, searchText, baseOffset) {
  let best;
  for (let [markerState, markerRe] of [["failed", FAILED_MARKER_RE], ["blocked", NEEDS_INPUT_MARKER_RE], ["blocked", BLOCKED_MARKER_RE], ["blocked", IM_BLOCKED_MARKER_RE]]) for (let match of searchText.matchAll(markerRe)) {
    if (isInsideCodeFence(fullText, baseOffset + match.index)) continue;
    if (!best || match.index > best.index) best = {
      state: markerState,
      capture: match[1].trim(),
      index: match.index,
      end: match.index + match[0].length
    };
  }
  return best;
}
function mkK(message) {
  let text = message.trim();
  if (!text) return "empty";
  if (isInsideCodeFence(text, text.length)) return "code-fence";
  let tail = text.slice(-800),
    tailOffset = text.length - tail.length;
  for (let match of tail.matchAll(/(?:^|\n)\s*result:\s*\S/gi)) if (!isInsideCodeFence(text, tailOffset + match.index)) return "result-line";
  for (let match of tail.matchAll(/(?:^|\n)\s*failed:\s*\S/gi)) if (!isInsideCodeFence(text, tailOffset + match.index)) return "failed-line";
  if (/[?\uFF1F]\s*$/.test(text)) return "trailing-q";
  let lastChunk = text.slice(-200);
  if (/(?:^|\n)\s*(?:[-*\u2022]|\d+\.|[|])\s/.test(lastChunk)) return "list-or-table";
  return "declarative";
}
function pkK(message) {
  let text = message.trim();
  if (!text) return null;
  let tail = text.slice(-800),
    resultMatch;
  for (let match of tail.matchAll(/(?:^|\n)\s*result:\s*(.+?)\s*(?:\n|$)/gi)) if (!isInsideCodeFence(text, text.length - tail.length + match.index)) resultMatch = match;
  let afterResult = tail,
    afterResultOffset = text.length - tail.length;
  if (resultMatch) {
    let resultEnd = resultMatch.index + resultMatch[0].length;
    afterResult = tail.slice(resultEnd), afterResultOffset = text.length - tail.length + resultEnd;
  }
  let marker = findStatusMarker(text, afterResult, afterResultOffset);
  if (resultMatch && !marker) {
    let resultText = jA(resultMatch[1], vf);
    if ([...afterResult.matchAll(/(?:^|\n)\s*next:\s*\S/gi)].some(m => !isInsideCodeFence(text, afterResultOffset + m.index))) return {
      branch: "result-then-next",
      state: "working",
      tempo: "idle",
      detail: resultText,
      output: {
        result: resultText
      }
    };
    return {
      branch: "result-marker",
      state: "done",
      tempo: "idle",
      detail: resultText,
      output: {
        result: resultText
      }
    };
  }
  if (marker?.state === "failed") return {
    branch: "failed-marker",
    state: "failed",
    tempo: "idle",
    detail: jA(marker.capture, vf),
    output: {}
  };
  if (marker?.state === "blocked") {
    let afterMarker = afterResult.slice(marker.end);
    if (Gn(afterMarker.split(/\n\s*\n/), para => para.trim().length > 0) >= 3) return null;
    if (!/\bnothing (?:needed|required) from you\b|\bno(?: user)? action (?:needed|required)\b/i.test(afterResult)) {
      let needs = jA(marker.capture, vf);
      return {
        branch: "blocked-marker",
        state: "blocked",
        tempo: "blocked",
        needs: needs,
        detail: needs
      };
    }
    if (resultMatch) {
      let resultText = jA(resultMatch[1], vf);
      return {
        branch: "blocked-disclaimed",
        state: "done",
        tempo: "idle",
        detail: resultText,
        output: {
          result: resultText
        }
      };
    }
    return null;
  }
  if (/[?\uFF1F]\s*$/.test(tail) && tail.replace(/[?\uFF1F\s]+$/, "").length >= 4) {
    let sentenceStart = Math.max(tail.lastIndexOf(`
`), tail.lastIndexOf(". "), tail.lastIndexOf("! "), tail.lastIndexOf("? ", tail.length - 2));
    if (!isInsideCodeFence(text, text.length - tail.length + sentenceStart)) {
      let question = jA(tail.slice(sentenceStart + 1).trim(), vf);
      if (OPTIONAL_OFFER_RE.test(question)) return null;
      return {
        branch: "trailing-q",
        state: "blocked",
        tempo: "blocked",
        needs: question,
        detail: question
      };
    }
  }
  let lastSentenceStart = Math.max(0, tail.lastIndexOf(". "), tail.lastIndexOf("! "), tail.lastIndexOf("? "), tail.lastIndexOf(`
`)),
    lastSentence = tail.slice(lastSentenceStart).replace(/^[.!?\s]+/, ""),
    inFence = isInsideCodeFence(text, text.length - tail.length + lastSentenceStart),
    externalWaitMatch = /\b(?:waiting (?:for|on)|pending)\s+(?:the\s+)?(?:CI|build|tests?|reviewer|deploy(?:ment)?|workflow|checks?|rollout|merge queue)\b/i.exec(lastSentence);
  if (externalWaitMatch && !inFence) return {
    branch: "wait-external",
    state: "working",
    tempo: "idle",
    detail: jA(externalWaitMatch[0], vf),
    output: {}
  };
  let awaitingUserMatch = /\b(?:awaiting|waiting (?:for|on)|pending)\s+(?:your\s+(?:feedback|input|decision|response|approval|direction|guidance|go-ahead)|you\b|the user\b)/i.exec(lastSentence);
  if (awaitingUserMatch && !inFence) {
    let needs = jA(lastSentence.slice(awaitingUserMatch.index).trim(), vf);
    return {
      branch: "awaiting-user",
      state: "blocked",
      tempo: "blocked",
      needs: needs,
      detail: needs
    };
  }
  let askVerbMatch = /\b(please (?:run|provide|confirm|clarify|choose|let me know)|let me know (?:which|what|how|when)|which (?:option|approach|one)|should I (?:proceed|continue|use))\b/i.exec(lastSentence);
  if (askVerbMatch && !inFence) {
    let needs = jA(lastSentence.slice(askVerbMatch.index).trim(), vf);
    return {
      branch: "ask-verb",
      state: "blocked",
      tempo: "blocked",
      needs: needs,
      detail: needs
    };
  }
  if (!inFence && /\b(not logged in|please run \/login|authentication failed|invalid api key|oauth token (?:expired|revoked)|credit balance (?:is )?too low|usage limit reached|mcp (?:server )?(?:authentication|auth|authorization|unauthorized)|mcp (?:server )?(?:credential|token) (?:missing|expired|invalid)|401 unauthorized|403 forbidden|token (?:has )?expired|bad credentials|gh auth login|gcloud auth login|aws (?:sso )?login)\b/i.test(lastSentence)) return {
    branch: "auth-prose",
    state: "blocked",
    tempo: "blocked",
    needs: jA(lastSentence, vf),
    detail: "authentication required"
  };
  if (!inFence && FORWARD_INTENT_RE.test(lastSentence) && !CONDITIONAL_WAIT_RE.test(lastSentence)) return {
    branch: "working-verb",
    state: "working",
    tempo: "active",
    detail: jA(lastSentence, vf),
    output: {}
  };
  if (!inFence && AGENTS_IN_FLIGHT_RE.test(lastSentence)) return {
    branch: "agents-status",
    state: "working",
    tempo: "idle",
    detail: jA(lastSentence, vf)
  };
  if (!inFence && WILL_CHECK_BACK_RE.test(lastSentence)) return {
    branch: "will-check-back",
    state: "working",
    tempo: "idle",
    detail: jA(lastSentence, vf)
  };
  if (!inFence && CANT_PROCEED_RE.test(lastSentence)) {
    let detail = jA(lastSentence, vf);
    return {
      branch: "cant-proceed",
      state: "blocked",
      tempo: "blocked",
      detail: detail,
      needs: detail
    };
  }
  if (!inFence && GIVING_UP_RE.test(lastSentence)) return {
    branch: "giving-up",
    state: "failed",
    tempo: "idle",
    detail: jA(lastSentence, vf)
  };
  if (!inFence && PUSHED_COMMITTED_RE.test(lastSentence)) {
    let detail = jA(lastSentence, vf);
    return {
      branch: "pushed-committed",
      state: "done",
      tempo: "idle",
      detail: detail,
      output: {
        result: detail
      }
    };
  }
  if (!inFence && READY_FOR_RE.test(lastSentence)) return {
    branch: "ready-for",
    state: "done",
    tempo: "idle",
    detail: jA(lastSentence, vf)
  };
  if (!inFence && VERDICT_RE.test(lastSentence)) {
    let detail = jA(lastSentence, vf);
    return {
      branch: "verdict-marker",
      state: "done",
      tempo: "idle",
      detail: detail,
      output: {
        result: detail
      }
    };
  }
  if (!inFence && PLEASE_DO_RE.test(lastSentence)) {
    let detail = jA(lastSentence, vf);
    return {
      branch: "please-do-x",
      state: "blocked",
      tempo: "blocked",
      detail: detail,
      needs: detail
    };
  }
  if (!inFence && STOPPING_HERE_RE.test(lastSentence)) {
    let detail = jA(lastSentence, vf);
    return {
      branch: "stopping-here",
      state: "blocked",
      tempo: "blocked",
      detail: detail,
      needs: detail
    };
  }
  return null;
}
function S8q(message) {
  let lastLine = message.split(`
`).map(line => line.trim()).findLast(Boolean);
  return {
    branch: "heuristic",
    state: "working",
    tempo: "idle",
    detail: lastLine ? jA(lastLine, vf) : "\u2014"
  };
}
function UkK(input) {
  let {
    tail: tail,
    prev: prev,
    latestAsk: latestAsk,
    toolSummary: toolSummary,
    minsInState: minsInState
  } = input;
  return `Current state: ${prev} (for ${minsInState}m)
Tool calls so far: ${toolSummary || "none"}${latestAsk ? `
User's most recent ask: "${latestAsk}"` : ""}

Assistant message tail (last ${tail.length} chars):
${tail}`;
}
function FkK(reply) {
  let stripped = reply.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, ""),
    openBrace = stripped.indexOf("{"),
    closeBrace = stripped.lastIndexOf("}");
  if (openBrace < 0 || closeBrace < 0) return null;
  let parsed;
  try {
    parsed = Wt(stripped.slice(openBrace, closeBrace + 1));
  } catch {
    return null;
  }
  let validated = getResponseSchema().safeParse(parsed);
  return validated.success ? validated.data : null;
}
function nonEmptyString(value) {
  return typeof value === "string" && value ? value : undefined;
}
function eC_(raw, defaultState, prev) {
  let rawState = nonEmptyString(raw.state),
    state = rawState && Object.hasOwn(STATE_DESCRIPTIONS, rawState) ? rawState : prev?.state ?? defaultState,
    rawTempo = nonEmptyString(raw.tempo),
    tempo = isTerminalState(state) ? "idle" : rawTempo === "active" || rawTempo === "idle" || rawTempo === "blocked" ? rawTempo : prev?.tempo ?? "active",
    output = {},
    rawOutput = raw.output ?? prev?.output;
  if (rawOutput && typeof rawOutput === "object") for (let [field, fieldValue] of Object.entries(rawOutput)) {
    let str = nonEmptyString(fieldValue);
    if (str && Object.hasOwn(OUTPUT_FIELD_DESCRIPTIONS, field)) output[field] = jA(str, vf);
  }
  let needs = nonEmptyString(raw.needs) ?? (tempo === "blocked" ? prev?.needs : undefined);
  return {
    state: state,
    detail: nonEmptyString(raw.detail) ?? prev?.detail ?? "",
    tempo: tempo,
    needs: needs,
    output: output,
    branch: prev?.branch
  };
}
var getResponseSchema,
  STATE_DESCRIPTIONS,
  OUTPUT_FIELD_DESCRIPTIONS,
  vf = 800,
  xkK = 2000,
  TERMINAL_STATES,
  FAILED_MARKER_RE,
  NEEDS_INPUT_MARKER_RE,
  BLOCKED_MARKER_RE,
  IM_BLOCKED_MARKER_RE,
  OPTIONAL_OFFER_RE,
  FORWARD_INTENT_RE,
  CONDITIONAL_WAIT_RE,
  AGENTS_IN_FLIGHT_RE,
  WILL_CHECK_BACK_RE,
  CANT_PROCEED_RE,
  GIVING_UP_RE,
  PUSHED_COMMITTED_RE,
  READY_FOR_RE,
  VERDICT_RE,
  PLEASE_DO_RE,
  STOPPING_HERE_RE,
  BkK = `A user kicked off a Claude Code agent to do a coding task and walked away. Read the tail of what the agent just said and decide which of four states it's in, so the system knows whether to notify the user.

The classification drives a phone notification: "blocked" pings the user to come back; everything else doesn't. So the question you're really answering is: does the user need to come back right now, and if not, is the work finished or still going? A false "blocked" is an annoying interruption for nothing. A false "done" or "working" when the agent is actually stuck waiting on the user means the work sits idle until they happen to check.

THE FOUR STATES

  "done" \u2014 the agent answered the ask or delivered the thing, and isn't planning to do anything else unprompted. This is the most common end-of-turn state in interactive sessions. There doesn't have to be a PR, commit, or file \u2014 if the user asked a question and the tail is the answer (not a plan to find one), that's done. Explanations, analyses, recommendations, "here's what I found", "the cause is X", "no change needed", and "files at <path>" closings are all done.

  "working" \u2014 the agent intends to keep going without being asked: it said "now let me\u2026", "next I'll\u2026", "running\u2026", "checking\u2026", or it's waiting on something it kicked off (CI, build, subagent, deploy, timer). Look for explicit forward intent or a named external wait.

  "blocked" \u2014 the agent cannot continue without the user. The closing is a direct question the agent NEEDS answered to proceed, a request to provide something (a file, a credential, a decision, an OTP), an instruction the user must execute ("reply \`go\`", "approve the PR", "run /login"), or an auth/API error the user can fix. Test: would the user replying or acting unblock it?

  "failed" \u2014 the agent gave up because the task is structurally impossible as framed: wrong repo, the feature doesn't exist, the premise is false, every approach exhausted with nothing the user could hand over to unblock it. Rare. If the agent names a specific missing resource, that's "blocked", not "failed" \u2014 the user CAN unblock it.

THE HARD BOUNDARIES

Done vs working: a closing that explains, summarizes, reports findings, or shows what was changed \u2014 without saying it's about to do more \u2014 is "done". Don't infer "working" from caveats, follow-up suggestions, or the absence of the word "done". Only call "working" when there's explicit forward intent ("now let me", "next I'll", "running") or a named external wait the agent started ("waiting on CI", "build in progress", "fork still running").

Done vs blocked \u2014 optional offers vs gates: after delivering, agents often close with an offer to do more: "let me know if you want X", "if you'd like, I can also Y", "ping me and I'll Z", "say the word and I'll update", "want me to dig into that?", "tell me the IDs and I'll re-home", "happy to do the latter if you want", "shall I also\u2026?". These are "done" \u2014 the deliverable shipped; the offer is extra. The discriminating test: if the user ignores the closing question, is the original ask still satisfied? Yes \u2192 done. No \u2192 blocked.

The exception is when the question is about WHETHER or HOW to ship the work the user asked for \u2014 which PR to put it in, apply it or not, push or hold, which approach to take. Then the deliverable isn't landed without the answer, so that's "blocked". "Found the fix. Want me to add it to this PR or open a new one?" \u2192 blocked (delivery isn't decided). "Fixed it in this PR. Want me to also clean up the old helper while I'm here?" \u2192 done (delivery is complete; the extra is tangential).

Working vs done vs blocked \u2014 when the closing mentions waiting on something: the discriminator is whether the AGENT ITSELF will do more.
  \u2022 Agent says it will act ("I'll report when X lands", "next check in 5 min", "shepherding CI", "will re-poll", "checking back", "N agents in flight \u2014 I'll consolidate") \u2192 "working". The agent owns the next step, regardless of what it's waiting on.
  \u2022 Agent won't act, and there's a user-addressed gate with no re-poll ("reply \`go\` to merge", "awaiting your approval", "which approach do you want?") \u2192 "blocked". Only the user can move it forward.
  \u2022 Agent won't act, and the wait is on a third party or passive trigger ("auto-merge armed, awaiting stamp", "posted to #stamps", "CI will run") \u2192 "done". The agent's part is over; whatever happens next happens without it.
A closing with both ("Awaiting your \`go\`. Next check in 20m") is "working" \u2014 the agent will re-check on its own; \`go\` is an optional accelerator, not a hard gate.

Stickiness: you're told the previous state. Don't move done\u2192working or failed\u2192working unless the agent explicitly restarted. Moving working\u2192done is the normal end-of-turn outcome \u2014 lean "done" when the closing is declarative with no future-tense plan.

EXPLICIT MARKERS \u2014 these are unambiguous, treat them as ground truth:
  \u2022 "No response requested." / "No action needed." / "Nothing needed from you." \u2192 done
  \u2022 "result: <text>" on its own line \u2192 done (and <text> is output.result)
  \u2022 "Next check in <time>" / "Shepherding CI" / "I'll report when X lands" / "checking back" \u2192 working
  \u2022 "Reply \`go\` to <verb>" / "Awaiting your \`go\`" (with no re-poll mentioned) \u2192 blocked
  \u2022 "Giving up." / "The task is not actionable." \u2192 failed
  \u2022 "blocked: <reason>" / "I'm blocked: <reason>" on its own line \u2192 blocked

API/AUTH/INFRA ERRORS \u2192 always "blocked" (transient or user-fixable), never "failed". Set needs to the fix. Covers:
  \u2022 Anthropic API: "401", "Invalid API key", "Please run /login", "rate limited", "overloaded", "529", "credit balance too low", "usage limit reached"
  \u2022 MCP servers: "OAuth token expired/revoked", "vault credential missing", "MCP authentication failed", "MCP unauthorized"
  \u2022 External services: "gh auth login", "gcloud auth login", "aws sso login", "bad credentials", "token expired", GitLab/GitHub PAT errors, Stripe/Slack 401
  \u2022 Any prose naming a specific re-auth or re-login step

OTHER DISAMBIGUATION:
  \u2022 Agent hit an error but is retrying or investigating ("let me try again", "checking the logs") \u2192 "working"
  \u2022 Agent stopped and names a SPECIFIC missing thing the user could supply (file, env var, credential, OTP, path, decision) \u2192 "blocked", even if phrased as "can't proceed" or "stopping here"
  \u2022 Scope notes, caveats, or FYIs after a delivered finding ("note: Y is untested", "out of scope but worth flagging") \u2192 "done"
  \u2022 A summary of options or a recommendation ("B is the right call", "I'd take option 1") with no question \u2192 "done" (the recommendation IS the deliverable)
  \u2022 Imperative to the user that's a recommendation, not a gate ("Ship the seek + scale.", "Run the migration when ready.") \u2192 "done" \u2014 the agent isn't waiting on it

EXAMPLES (tail \u2192 classification)

"Reading config files to understand the setup."
\u2192 {"state":"working","detail":"reading config files to map the setup","tempo":"active","output":{}}

"Found it in auth.ts:88. Now let me check if the same pattern appears elsewhere."
\u2192 {"state":"working","detail":"found pattern at auth.ts:88; scanning for other occurrences","tempo":"active","output":{}}

"Waiting for CI to finish (~8 min)."
\u2192 {"state":"working","detail":"waiting on CI (~8 min)","tempo":"idle","output":{}}

"CI green on PR #31030. Reply \`go\` to merge."
\u2192 {"state":"blocked","detail":"PR #31030 CI green; awaiting user go-ahead to merge","tempo":"blocked","needs":"reply \`go\` to merge","output":{}}
  (no agent re-poll; only the user's \`go\` moves it forward \u2192 blocked)

"Awaiting your \`go\`. Next check in 20m."
\u2192 {"state":"working","detail":"PR awaiting go-ahead; agent re-checking in 20m","tempo":"idle","output":{}}
  (agent will re-poll on its own; \`go\` is an optional accelerator \u2192 working)

"Auto-merge armed on PR #4821. Posted to #stamps. Awaiting stamp."
\u2192 {"state":"done","detail":"PR #4821 auto-merge armed; posted to #stamps","tempo":"idle","output":{"result":"PR #4821 ready, auto-merge armed"}}
  (GitHub merges, not the agent; agent's part is over \u2192 done)

"Babysit tick \u2014 PR #40689. All CI green, threads resolved. Awaiting human approval. Next check via cron in ~5 min."
\u2192 {"state":"working","detail":"PR #40689 green, awaiting approval; next cron check ~5 min","tempo":"idle","output":{}}
  ("next check via cron" = agent will re-poll \u2192 working)

"Here's how the auth flow works: the token is validated in middleware.ts:42 before each request."
\u2192 {"state":"done","detail":"auth flow: token validated in middleware.ts:42 per request","tempo":"idle","output":{"result":"token validated in middleware.ts:42"}}
  (answered a question \u2014 no PR/commit/file required for "done")

"Indentation is now consistent at all four call sites (RepoPicker, both EnvironmentPicker sites, BranchPicker, SessionView). CI's swift-format should find nothing left to reflow."
\u2192 {"state":"done","detail":"indentation fixed at 4 call sites; swift-format clean","tempo":"idle","output":{"result":"indentation consistent across RepoPicker/EnvironmentPicker/BranchPicker/SessionView"}}

"At 30-40k rows there's no hint that gets you there without a new index \u2014 and at that point the column is strictly cheaper than a (session_uuid, source, sequence_num DESC) index."
\u2192 {"state":"done","detail":"analysis: dedicated column cheaper than composite index at 30-40k rows","tempo":"idle","output":{"result":"recommend dedicated column over composite index"}}
  (pure analysis closing, no question, no forward intent \u2014 done)

"No response requested."
\u2192 {"state":"done","detail":"completed; no response requested","tempo":"idle","output":{}}

"Both PRs remain bot-clean. Continue your e2e test on the restarted localhost:4000 (now pointed at local CCR)."
\u2192 {"state":"done","detail":"both PRs bot-clean; localhost:4000 restarted pointing at local CCR","tempo":"idle","output":{}}
  ("Continue your test" is advice TO the user, not the agent's plan \u2192 done)

"Both subagents updated to use \`ack_seq\`. They're still running \u2014 I'll report PR URLs when each completes."
\u2192 {"state":"working","detail":"2 subagents running with ack_seq rename; will report PR URLs","tempo":"idle","output":{}}
  ("I'll report when each completes" = agent will act on results \u2192 working)

"Searching internal knowledge for the org ID \u2014 I'll report back when the search completes."
\u2192 {"state":"working","detail":"searching internal KB for org ID","tempo":"active","output":{}}

"Wrote the chart to plots/venn.png; script is at scripts/venn.R."
\u2192 {"state":"done","detail":"venn chart written to plots/venn.png (script: scripts/venn.R)","tempo":"idle","output":{"result":"plots/venn.png + scripts/venn.R"}}

"Fixed the regex; tests pass. If you want, I can also open a follow-up PR to clean up the old helper."
\u2192 {"state":"done","detail":"regex fixed in parser.ts, all tests green","tempo":"idle","output":{"result":"regex fixed, tests pass"}}
  (deliverable shipped; offer is tangential extra \u2192 done)

"Throughput drop confirmed \u2014 ~16K/min notifications being dropped from pod capacity. Ship the seek + scale. Want me to dig into the upstream volume change too?"
\u2192 {"state":"done","detail":"confirmed ~16K/min notif drop from pod capacity; recommend seek+scale","tempo":"idle","output":{"result":"~16K/min drop, pod capacity \u2014 ship seek+scale"}}
  (finding + recommendation delivered; trailing question is optional extra \u2192 done)

"Not applied \u2014 say the word and I'll update both widgets."
\u2192 {"state":"done","detail":"widget query change drafted; not applied pending go-ahead","tempo":"idle","output":{}}
  ("say the word and I'll" = optional offer \u2192 done)

"B is the right call \u2014 it lands in the table the chart already reads, and avoids the migration."
\u2192 {"state":"done","detail":"recommend option B (reuses existing table, avoids migration)","tempo":"idle","output":{"result":"recommendation: option B"}}

"PR opened: https://github.com/acme/repo/pull/123\\nresult: fixed auth race in auth.ts, PR #123"
\u2192 {"state":"done","detail":"opened PR #123: fixed auth race","tempo":"idle","output":{"result":"fixed auth race in auth.ts, PR #123"}}

"I found the bug in auth.ts:42. Want me to fix it or just report?"
\u2192 {"state":"blocked","detail":"found null-check bug at auth.ts:42; awaiting fix-vs-report","tempo":"blocked","needs":"fix it or just report?","output":{}}
  (agent has NOT delivered the fix; can't proceed without the answer \u2192 blocked)

"Found the fix \u2014 it's a 3-line change to the retry handler. Want me to add it to this PR or open a new one?"
\u2192 {"state":"blocked","detail":"3-line retry-handler fix ready; awaiting which PR","tempo":"blocked","needs":"add to this PR or open a new one?","output":{}}
  (question is about HOW to ship the asked-for work \u2192 blocked)

"Added the analytics enum + conditional at the .withScreenAnalyticsLogging call site. Want me to also add the missing screen tag for the empty-state view while I'm here? It's a ~5-line change."
\u2192 {"state":"done","detail":"analytics enum + conditional added at .withScreenAnalyticsLogging","tempo":"idle","output":{"result":"analytics logging wired at SessionView"}}
  (asked-for work delivered; the "while I'm here" extra is tangential \u2192 done)

"I can't proceed \u2014 the repo requires GITHUB_TOKEN and it's not set."
\u2192 {"state":"blocked","detail":"missing GITHUB_TOKEN; cannot clone","tempo":"blocked","needs":"set GITHUB_TOKEN env var","output":{}}

"Can't run the tests \u2014 needs the openapi.yaml file which isn't in this checkout. Stopping here."
\u2192 {"state":"blocked","detail":"missing openapi.yaml; cannot run tests","tempo":"blocked","needs":"provide config/openapi.yaml","output":{}}
  ("stopping" + names a specific missing resource \u2192 blocked, not failed)

"API Error: 401 Invalid API key \xB7 Please run /login"
\u2192 {"state":"blocked","detail":"API auth failed (401)","tempo":"blocked","needs":"run /login","output":{}}

"The build is broken on main and I can't reproduce locally. Giving up."
\u2192 {"state":"failed","detail":"cannot reproduce build failure; logs uninformative","tempo":"idle","output":{}}
  (no specific resource would unblock; exhausted approaches \u2192 failed)

CONTRASTIVE PAIRS \u2014 same surface shape, different state

  "Tests pass. Let me know if you also want the docs updated."  \u2192 done
  "Tests written but I haven't run them. Let me know which env to use."  \u2192 blocked
  (first: deliverable shipped, offer is extra. second: deliverable not verified, needs the env to proceed)

  "Waiting for CI (~8 min)."  \u2192 working
  "CI green. Awaiting your \`go\` to merge."  \u2192 blocked
  (first: only external wait. second: user gate)

  "Want me to also clean up the old helper?"  \u2192 done
  "Want me to apply this fix or just report it?"  \u2192 blocked
  (first: tangential extra after delivery. second: how to deliver the asked-for work)

  "I'll re-pull metrics when the timer fires and confirm it drained."  \u2192 working
  "I'll re-pull metrics once you confirm the timer fired."  \u2192 blocked
  (first: agent owns the next step. second: user owns it)

OUTPUT \u2014 respond with ONLY this JSON, no code fences:
{"state":"<working|blocked|done|failed>","detail":"<one line>","tempo":"<active|idle|blocked>","needs":"<when blocked: the exact ask; omit otherwise>","output":{"result":"<one-sentence deliverable headline, \u2264180 chars; omit when working>"}}

"detail" is what shows on the user's phone lock screen \u2014 write it like a colleague's Slack message: name the concrete thing (file, function, error, number, finding) and what happened to it. "fixed auth race in middleware.ts, tests green" not "completed task"; "waiting on CI for #4821" not "working"; "confirmed 16K/min drop from pod capacity" not "investigated issue".

"tempo": "active" = computing; "idle" = waiting on external (CI, timer, reviewer); "blocked" = waiting on user.

"needs": when blocked, the exact action the user should take, copied as closely as possible from the tail \u2014 they'll act on this text without reading the transcript. Omit otherwise.

"output.result": one-sentence headline naming a finished deliverable (direct answer, URL/path the agent produced, command the user should run). If the tail has \`result:\` on its own line, that line IS the result. Omit ({}) when still working, or when it would just restate the state.
`;
var YGH = b(() => {
  dw();
  Xt();
  getResponseSchema = Re(() => Tn.object({
    state: Tn.string().nullish(),
    detail: Tn.string().nullish(),
    tempo: Tn.string().nullish(),
    needs: Tn.string().nullish(),
    output: Tn.record(Tn.string(), Tn.unknown()).nullish()
  })), STATE_DESCRIPTIONS = {
    working: "actively progressing on the task \u2014 narrating plans, calling tools, or writing code; no pending question for the user",
    blocked: 'the last message ends on a direct question or explicit request for the user ("want me to\u2026?", "which do you prefer?", "approve this?", "needs input: \u2026") \u2014 nothing will happen until the user replies',
    done: 'the task the user asked for is fully delivered and there is no further work the agent plans to do \u2014 not just a progress update, not "almost done", not "let me know what you think"',
    failed: "the agent has given up or hit something unrecoverable \u2014 missing credential, broken build it cannot fix, wrong repo, task impossible as framed; distinct from blocked (user can unblock) and done (succeeded)"
  }, OUTPUT_FIELD_DESCRIPTIONS = {
    result: "one short sentence naming the finished deliverable \u2014 no sub-clauses or bullet summaries"
  }, TERMINAL_STATES = new Set(["done", "failed", "stopped"]);
  FAILED_MARKER_RE = /(?:^|\n)\s*failed\s*[:\u2014\u2013-]\s*(.{3,200}?)(?=\n|$)/gi, NEEDS_INPUT_MARKER_RE = /(?:^|\n)\s*needs input\s*[:\u2014\u2013-]\s*(.{3,200}?)(?=\n|$)/gi, BLOCKED_MARKER_RE = /(?:^|\n)\s*blocked\s*[:\u2014\u2013-]\s*(.{3,200}?)(?=\n|$)/gi, IM_BLOCKED_MARKER_RE = /\bI'?m blocked\s*[:\u2014\u2013-]\s*(.{3,200}?)(?=\n|$)/gi;
  OPTIONAL_OFFER_RE = /\b(?:want|like) me to\b|\b(?:shall|should) I also\b/i, FORWARD_INTENT_RE = /^(?:(?:Now|Next|Then|Alright|OK|Okay|Right|Good|First|Also),?\s+)?(?:Let me (?!know\b)|(?:I(?:'?ll| will) |I'?m going to |Going to )(?!need\b|require\b|wait\b|leave\b|hold\b|skip\b|stop\b)|Proceeding |Moving (?:on|to)\b|Continuing |Starting |Trying |Checking |Looking |Searching |Reading |Investigating |Running |Re-?running |Building |Rebuilding |Installing |Fetching |Applying |Fixing |Patching |Updating |Adding |Removing |Deleting |Importing |Refactoring |Rewriting |Writing |Grepping |Scanning |Wrapping |Switching |Testing |Verifying |Regenerating |Pushing |Pulling |Reviewing |Examining |Loading |Compiling |Parsing |Analyzing |Tracing |Exploring )/i, CONDITIONAL_WAIT_RE = /\b(?:once |when |after |until |as soon as )(?:you|it|the|that|this|they)\b|\bagain in\b|\bcheck back\b|\bin ~?\d+\s*(?:s(?:ec(?:ond)?s?)?|m(?:in(?:ute)?s?)?|h(?:ours?|rs?)?)\b|\bthen\.?\s*$|\bwhichever you\b|\bhold(?:ing)? for your\b|\b(?:to|and) wait for\b|\bgive it (?:more |some )?time\b|\bif (?:you(?:'d| want| prefer| need|'re)?|that(?:'s| helps| works)?|useful|needed|helpful|desired)\b|\b(?:isn'?t|not|won'?t) going to work\b/i, AGENTS_IN_FLIGHT_RE = /^(?:(?:\*\*)?[1-9]\d* (?:agent|cron|task|fork|job|worker|PR|check)s? (?:in flight|remaining|active|still (?:running|working)|pending|running|launched)\b|(?:Continuous )?(?:[Ll]oop|[Cc]rons?|[Bb]abysit) (?:active|healthy|continuing|running|will keep|continues)\b|Waiting for (?:the )?(?:agent|cron|task|fork|worker|job|remaining|them)s?\b|Agents? will report back\b|Waiting\.?$)/, WILL_CHECK_BACK_RE = /^(?:I will|I'll|Will) (?:check back|re-?check|poll|look again|retry|re-?run|try again) (?:(?:when|once|after|until) (?!your?\b)|in\b|again\b)/i, CANT_PROCEED_RE = /^I (?:can(?:'?t|not)|am unable to) (?:proceed|continue|make (?:any )?progress|complete|fix this)\b/i, GIVING_UP_RE = /^(?:Giving up|I(?:'m| am) giving up|The task is not actionable)\b/i, PUSHED_COMMITTED_RE = /^(?:Pushed (?:to `|`[0-9a-f]{7,})|Committed as `?[0-9a-f]{7,}\b|Commit: `?[0-9a-f]{7,}\b|(?:Opened|Created) PR #?\d)/, READY_FOR_RE = /^Ready (?:for review|to (?:upload|merge|ship|land))\b/, VERDICT_RE = /^VERDICT: (?:PASS|FAIL)\b/, PLEASE_DO_RE = /^Please (?:start|run|provide|grant|export|add|install|configure|give me|paste|point me|set (?:the |up |`?[A-Z][A-Z0-9_]+\b))/, STOPPING_HERE_RE = /^(?:Stopping here|I've stopped here|Parked (?:the|this) branch|Paused here)(?:\.|$| \u2014| -| until| pending| since| because)/i;
});

export {isTerminalState as SIp,jA as Uh,isHighSurrogate as bIp,isInsideCodeFence as GIe,ukK as Mqa,findStatusMarker as RIp,mkK as Nqa,pkK as Bqa,S8q as Juo,UkK as Uqa,FkK as $qa,nonEmptyString as I9t,eC_ as D9t,getResponseSchema as gIp,STATE_DESCRIPTIONS as _Ip,OUTPUT_FIELD_DESCRIPTIONS as yIp,vf as fy,xkK as Lqa,TERMINAL_STATES as TIp,FAILED_MARKER_RE as EIp,NEEDS_INPUT_MARKER_RE as CIp,BLOCKED_MARKER_RE as vIp,IM_BLOCKED_MARKER_RE as wIp,OPTIONAL_OFFER_RE as xIp,FORWARD_INTENT_RE as kIp,CONDITIONAL_WAIT_RE as HIp,AGENTS_IN_FLIGHT_RE as IIp,WILL_CHECK_BACK_RE as DIp,CANT_PROCEED_RE as PIp,GIVING_UP_RE as OIp,PUSHED_COMMITTED_RE as LIp,READY_FOR_RE as MIp,VERDICT_RE as NIp,PLEASE_DO_RE as BIp,STOPPING_HERE_RE as FIp,BkK as Fqa,YGH as VIe};
