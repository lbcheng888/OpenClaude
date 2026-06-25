// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {getRemoteUrl as Gl,ia as gK} from "../../vendor/m698.ts";
import {parseGitRemote as W8H,detectCurrentRepositoryWithHost as PI,_0 as Vh} from "../../vendor/m697.ts";
import {Zp as NT,d1 as Xv} from "../../vendor/m2705.ts";
import {TeamDeleteToolName as bH,tn as H6} from "../config/0230_encoding.ts";
import {M5e as WpH} from "../core/4293_children.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {isPolicyAllowed as Y7,Bu as i5} from "../../vendor/m2213.ts";
import {Td as JT,Cb as QP} from "../../vendor/m5036.ts";
import {isFirstPartyProvider as i1,Ps as V7} from "../api/1287_usesFirstPartyModelIds.ts";
import {isClaudeAISubscriber as Lq,hasStoredOAuthToken as LG,lo as Mq} from "../config/2036_withOAuthRefreshLock.ts";
import {nt as q_} from "../../vendor/m127.ts";
import {Bee as xHH,mat as iK_,nle as Z4H} from "../core/3336_environment_id.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {mga as mNK,bIe as JGH} from "../telemetry/3337_ignoreUntracked.ts";
import {dn as A6} from "../config/0137_namespace.ts";
/**
 * Semantic restoration for agent/5484_registerScheduleRemoteAgentsSkill.ts.
 * Cross-module bundled symbols and export names are intentionally preserved.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;
var RF4 = {};
j_(RF4, {
  registerScheduleRemoteAgentsSkill: (): any => registerScheduleRemoteAgentsSkill
});
/** Internal restored helper for agent/5484_registerScheduleRemoteAgentsSkill.ts; behavior is preserved. */
function decodeConnectorUuidFromServerId(H: any): any {
  if (!H.startsWith("mcpsrv_")) return null;
  let K = H.slice(7).slice(2),
    O = 0n;
  for (let z of K) {
    let $ = i0T.indexOf(z);
    if ($ === -1) return null;
    O = O * 58n + BigInt($);
  }
  let T = O.toString(16).padStart(32, "0");
  return `${T.slice(0, 8)}-${T.slice(8, 12)}-${T.slice(12, 16)}-${T.slice(16, 20)}-${T.slice(20, 32)}`;
}
/** Internal restored helper for agent/5484_registerScheduleRemoteAgentsSkill.ts; behavior is preserved. */
function collectClaudeAiProxyConnectors(H: any): any {
  let _ = [];
  for (let q of H) {
    if (q.type !== "connected") continue;
    if (q.config.type !== "claudeai-proxy") continue;
    let K = decodeConnectorUuidFromServerId(q.config.id);
    if (!K) continue;
    _.push({
      uuid: K,
      name: q.name,
      url: q.config.url
    });
  }
  return _;
}
/** Internal restored helper for agent/5484_registerScheduleRemoteAgentsSkill.ts; behavior is preserved. */
function sanitizeConnectorName(H: any): any {
  return H.replace(/^claude[.\s-]ai[.\s-]/i, "").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
/** Internal restored helper for agent/5484_registerScheduleRemoteAgentsSkill.ts; behavior is preserved. */
function formatConnectorsInfo(H: any): any {
  if (H.length === 0) return "No connected MCP connectors found. The user may need to connect servers at https://claude.ai/customize/connectors";
  let _ = ["Connected connectors (available for routines):"];
  for (let q of H) {
    let K = sanitizeConnectorName(q.name);
    _.push(`- ${q.name} (connector_uuid: ${q.uuid}, name: ${K}, url: ${q.url})`);
  }
  return _.join(`
`);
}
/** Internal restored helper for agent/5484_registerScheduleRemoteAgentsSkill.ts; behavior is preserved. */
function formatSetupWarnings(H: any): any {
  return `\u26A0 Heads-up:
${H.map((q: any): any => `- ${q}`).join(`
`)}`;
}
/** Internal restored helper for agent/5484_registerScheduleRemoteAgentsSkill.ts; behavior is preserved. */
async function getCurrentGitHubRepoUrl(): Promise<any> {
  let H = await Gl();
  if (!H) return null;
  let _ = W8H(H);
  if (!_) return null;
  return `https://${_.host}/${_.owner}/${_.name}`;
}
/** Internal restored helper for agent/5484_registerScheduleRemoteAgentsSkill.ts; behavior is preserved. */
function buildScheduleRemoteAgentsPrompt(H: any): any {
  let {
      userTimezone: _,
      nowUtcIso: q,
      nowLocal: K,
      oneOffEnabled: O,
      connectorsInfo: T,
      gitRepoUrl: z,
      environmentsInfo: $,
      createdEnvironment: Y,
      setupNotes: A,
      needsGitHubAccessReminder: w,
      userArgs: f
    } = H,
    j = f && A.length > 0 ? `
## Setup Notes

${formatSetupWarnings(A)}
` : "",
    J = A.length > 0 ? `${formatSetupWarnings(A)}

${ZF4}` : ZF4,
    D = f ? "The user has already told you what they want (see User Request at the bottom). Skip the initial question and go directly to the matching workflow." : `Your FIRST action must be a single ${NT} tool call (no preamble). Use this EXACT string for the \`question\` field \u2014 do not paraphrase or shorten it:

${bH(J)}

Set \`header: "Action"\` and offer the four actions (create/list/update/run) as options. After the user picks, follow the matching workflow below.`;
  return `# Schedule Cloud Agents

You are helping the user schedule, update, list, or run **cloud** Claude Code agents. These are NOT local cron jobs \u2014 each routine spawns a fully isolated cloud session (CCR) in Anthropic's cloud infrastructure${O ? ", either on a recurring cron schedule or once at a specific time" : " on a recurring cron schedule"}. The agent runs in a sandboxed environment with its own git checkout, tools, and optional MCP connections.

## First Step

${D}
${j}

## What You Can Do

Use the \`${WpH}\` tool (load it first with \`ToolSearch select:${WpH}\`; auth is handled in-process \u2014 do not use curl):

- \`{action: "list"}\` \u2014 list all routines
- \`{action: "get", trigger_id: "..."}\` \u2014 fetch one routine
- \`{action: "create", body: {...}}\` \u2014 create a routine
- \`{action: "update", trigger_id: "...", body: {...}}\` \u2014 partial update
- \`{action: "run", trigger_id: "..."}\` \u2014 run a routine now

(Note: the API uses \`trigger_id\` as the parameter name, but the user-facing term is "routine".)

You CANNOT delete routines. If the user asks to delete, direct them to: https://claude.ai/code/routines

## Create body shape

For a recurring schedule:

\`\`\`json
{
  "name": "AGENT_NAME",
  "cron_expression": "CRON_EXPR",
  "enabled": true,
  "job_config": {
    "ccr": {
      "environment_id": "ENVIRONMENT_ID",
      "session_context": {
        "model": "claude-sonnet-4-6",
        "sources": [
          {"git_repository": {"url": "${z || "https://github.com/ORG/REPO"}"}}
        ],
        "allowed_tools": ["Bash", "Read", "Write", "Edit", "Glob", "Grep"]
      },
      "events": [
        {"data": {
          "uuid": "<lowercase v4 uuid>",
          "session_id": "",
          "type": "user",
          "parent_tool_use_id": null,
          "message": {"content": "PROMPT_HERE", "role": "user"}
        }}
      ]
    }
  }
}
\`\`\`

${O ? 'For a one-time run, replace `"cron_expression": "CRON_EXPR"` with `"run_once_at": "YYYY-MM-DDTHH:MM:SSZ"` (RFC3339 UTC, must be in the future). Everything else is identical.\n\n' : ""}Generate a fresh lowercase UUID for \`events[].data.uuid\` yourself.

## Available MCP Connectors

These are the user's currently connected claude.ai MCP connectors:

${T}

When attaching connectors to a routine, use the \`connector_uuid\` and \`name\` shown above (the name is already sanitized to only contain letters, numbers, hyphens, and underscores), and the connector's URL. The \`name\` field in \`mcp_connections\` must only contain \`[a-zA-Z0-9_-]\` \u2014 dots and spaces are NOT allowed.

**Important:** Infer what services the agent needs from the user's description. For example, if they say "check Datadog and Slack me errors," the agent needs both Datadog and Slack connectors. Cross-reference against the list above and warn if any required service isn't connected. If a needed connector is missing, direct the user to https://claude.ai/customize/connectors to connect it first.

## Environments

Every routine requires an \`environment_id\` in the job config. This determines where the cloud agent runs. Ask the user which environment to use.

${$}

Use the \`id\` value as the \`environment_id\` in \`job_config.ccr.environment_id\`.
${Y ? `
**Note:** A new environment \`${Y.name}\` (id: \`${Y.environment_id}\`) was just created for the user because they had none. Use this id for \`job_config.ccr.environment_id\` and mention the creation when you confirm the routine config.
` : ""}

## API Field Reference

### Create Routine \u2014 Required Fields
- \`name\` (string) \u2014 A descriptive name
${O ? "- Exactly ONE of:\n  - `cron_expression` (string) \u2014 5-field cron in UTC. **Minimum interval is 1 hour.**\n  - `run_once_at` (string) \u2014 RFC3339 UTC timestamp. Must be in the future. Fires once, then auto-disables." : "- `cron_expression` (string) \u2014 5-field cron in UTC. **Minimum interval is 1 hour.**"}
- \`job_config\` (object) \u2014 Session configuration (see structure above)

### Create Routine \u2014 Optional Fields
- \`enabled\` (boolean, default: true)
- \`mcp_connections\` (array) \u2014 MCP servers to attach:
  \`\`\`json
  [{"connector_uuid": "uuid", "name": "server-name", "url": "https://..."}]
  \`\`\`

### Update Routine \u2014 Optional Fields
All fields optional (partial update):
- \`name\`, \`cron_expression\`${O ? ", `run_once_at`" : ""}, \`enabled\`, \`job_config\`
- \`mcp_connections\` \u2014 Replace MCP connections
- \`clear_mcp_connections\` (boolean) \u2014 Remove all MCP connections

### Cron Expression Examples

The user's local timezone is **${_}**. Cron expressions${O ? " and `run_once_at` timestamps" : ""} are always in UTC. When the user says a local time, convert it to UTC but confirm with them: "9am ${_} = Xam UTC, so the cron would be \`0 X * * 1-5\`."${O ? ' For one-time runs, the same conversion applies \u2014 "run this at 3pm" \u2192 `"run_once_at": "YYYY-MM-DDTHH:00:00Z"` with their 3pm converted to UTC.' : ""}

- \`0 9 * * 1-5\` \u2014 Every weekday at 9am **UTC**
- \`0 */2 * * *\` \u2014 Every 2 hours
- \`0 0 * * *\` \u2014 Daily at midnight **UTC**
- \`30 14 * * 1\` \u2014 Every Monday at 2:30pm **UTC**
- \`0 8 1 * *\` \u2014 First of every month at 8am **UTC**

Minimum interval is 1 hour. \`*/30 * * * *\` will be rejected.
${O ? `
### Current Time (for one-off runs)

When /schedule was invoked it was **${K}** (${_}) / **${q}** UTC. Treat this as an approximate anchor only \u2014 the conversation may have been running for a while since then.

**Before computing any \`run_once_at\` value, you MUST re-check the current time** by running \`date -u +%Y-%m-%dT%H:%M:%SZ\` via the Bash tool. Do not guess or infer today's date from conversation context. Resolve relative requests ("tomorrow at 9am", "in 3 hours", "next Monday") against the freshly fetched time, then echo the resolved local time AND the UTC timestamp back to the user for confirmation before creating the routine. If the resolved time is already in the past, ask the user to clarify rather than silently rolling forward.
` : ""}
## Workflow

### CREATE a new routine:

1. **Understand the goal** \u2014 Ask what they want the cloud agent to do. What repo(s)? What task? Remind them that the agent runs in the cloud \u2014 it won't have access to their local machine, local files, or local environment variables.
2. **Craft the prompt** \u2014 Help them write an effective agent prompt. Good prompts are:
   - Specific about what to do and what success looks like
   - Clear about which files/areas to focus on
   - Explicit about what actions to take (open PRs, commit, just analyze, etc.)
3. **Set the schedule** \u2014 Ask when and how often. The user's timezone is ${_}. When they say a time (e.g., "every morning at 9am"), assume they mean their local time and convert to UTC for the cron expression. Always confirm the conversion: "9am ${_} = Xam UTC."${O ? ' If they want a one-time run (e.g., "once at 3pm", "tomorrow morning", "remind me to check X later"), use `run_once_at` instead of `cron_expression` \u2014 same timezone conversion applies. **First re-check the current time with `date -u` via Bash** (the reference time above may be stale in a long conversation), resolve the relative phrase against that fresh value, and confirm the resulting absolute timestamp with the user.' : ""}
4. **Choose the model** \u2014 Default to \`claude-sonnet-4-6\`. Tell the user which model you're defaulting to and ask if they want a different one.
5. **Validate connections** \u2014 Infer what services the agent will need from the user's description. For example, if they say "check Datadog and Slack me errors," the agent needs both Datadog and Slack MCP connectors. Cross-reference with the connectors list above. If any are missing, warn the user and link them to https://claude.ai/customize/connectors to connect first.${z ? ` The default git repo is already set to \`${z}\`. Ask the user if this is the right repo or if they need a different one.` : " Ask which git repos the cloud agent needs cloned into its environment."}
6. **Review and confirm** \u2014 Show the full configuration before creating. Let them adjust.
7. **Create it** \u2014 Call \`${WpH}\` with \`action: "create"\` and show the result. The response includes the routine ID. Always output a link at the end: \`https://claude.ai/code/routines/{ROUTINE_ID}\`

### UPDATE a routine:

1. List routines first so they can pick one
2. Ask what they want to change
3. Show current vs proposed value
4. Confirm and update

### LIST routines:

1. Fetch and display in a readable format
2. Show: name, schedule (human-readable), enabled/disabled, next run, repo(s)

### RUN NOW:

1. List routines if they haven't specified which one
2. Confirm which routine
3. Execute and confirm

## Important Notes

- These are CLOUD agents \u2014 they run in Anthropic's cloud, not on the user's machine. They cannot access local files, local services, or local environment variables.
- Always convert cron to human-readable when displaying
${O ? '- When listing routines, `ended_reason: "run_once_fired"` means a one-shot already ran (shows as "Ran" in the web UI). The user can re-arm it by updating with a new `run_once_at`.\n' : ""}- Default to \`enabled: true\` unless user says otherwise
- Accept GitHub URLs in any format (https://github.com/org/repo, org/repo, etc.) and normalize to the full HTTPS URL (without .git suffix)
- The prompt is the most important part \u2014 spend time getting it right. The cloud agent starts with zero context, so the prompt must be self-contained.
- To delete a routine, direct users to https://claude.ai/code/routines
${w ? `- If the user's request seems to require GitHub repo access (e.g. cloning a repo, opening PRs, reading code), remind them that ${Y_("tengu_cobalt_lantern", !1) && Y7("allow_quick_web_setup") ? "they should run /web-setup to connect their GitHub account (or install the Claude GitHub App on the repo as an alternative) \u2014 otherwise the cloud agent won't be able to access it" : "they need the Claude GitHub App installed on the repo \u2014 otherwise the cloud agent won't be able to access it"}.` : ""}
${f ? `
## User Request

The user said: "${f}"

Start by understanding their intent and working through the appropriate workflow above.` : ""}`;
}
/** Exported registerScheduleRemoteAgentsSkill binding for agent/5484_registerScheduleRemoteAgentsSkill.ts; behavior is preserved. */
function registerScheduleRemoteAgentsSkill(): any {
  JT({
    name: "schedule",
    menuDescription: "Create and manage routines: cloud agents on a schedule",
    aliases: ["routines"],
    description: "Create, update, list, or run scheduled cloud agents (routines) that execute on a cron schedule.",
    whenToUse: (): any => {
      if (Y_("tengu_orchid_mantis", !1)) return 'When the user wants to schedule a recurring or one-time cloud agent ("run this every Monday", "open a cleanup PR for X in 2 weeks"), or to manage existing routines.';
      return `When the user wants to schedule a recurring cloud agent, set up automated tasks, create a cron job for Claude Code, or manage their scheduled agents/routines.${Y_("tengu_mocha_barista", !1) ? ' Also use when the user wants a one-time scheduled run ("run this once at 3pm", "remind me to check X tomorrow").' : ""}`;
    },
    userInvocable: !0,
    isEnabled: (): any => i1() && Lq() && !q_(process.env.CLAUDE_CODE_REMOTE) && Y_("tengu_surreal_dali", !1) && Y7("allow_remote_sessions"),
    allowedTools: [WpH, NT, "Bash(date *)"],
    async getPromptForCommand(H: any, _: any): Promise<any> {
      if (!LG()) return [{
        type: "text",
        text: "You need to authenticate with a claude.ai account first. API accounts are not supported. Run /login, then try /schedule again."
      }];
      let q;
      try {
        q = await xHH();
      } catch (Z) {
        return N(`[schedule] Failed to fetch environments: ${Z}`, {
          level: "warn"
        }), [{
          type: "text",
          text: "We're having trouble connecting with your remote claude.ai account to set up a scheduled task. Please try /schedule again in a few minutes."
        }];
      }
      let K = null;
      if (q.length === 0) try {
        K = await iK_(), q = [K];
      } catch (Z) {
        return N(`[schedule] Failed to create environment: ${Z}`, {
          level: "warn"
        }), [{
          type: "text",
          text: "No remote environments found, and we could not create one automatically. Visit https://claude.ai/code to set one up, then run /schedule again."
        }];
      }
      let O = [],
        T = !1,
        z = await PI();
      if (z === null) O.push("Not in a git repo \u2014 you'll need to specify a repo URL manually (or skip repos entirely).");else if (z.host === "github.com") {
        let {
          hasAccess: Z
        } = await mNK(z.owner, z.name);
        if (!Z) {
          T = !0;
          let G = Y_("tengu_cobalt_lantern", !1) && Y7("allow_quick_web_setup") ? `GitHub not connected for ${z.owner}/${z.name} \u2014 run /web-setup to sync your GitHub credentials, or install the Claude GitHub App at https://claude.ai/code/onboarding?magic=github-app-setup.` : `Claude GitHub App not installed on ${z.owner}/${z.name} \u2014 install at https://claude.ai/code/onboarding?magic=github-app-setup if your routine needs this repo.`;
          O.push(G);
        }
      }
      let $ = collectClaudeAiProxyConnectors(_.options.mcpClients);
      if ($.length === 0) O.push("No MCP connectors \u2014 connect at https://claude.ai/customize/connectors if needed.");
      let Y = Intl.DateTimeFormat().resolvedOptions().timeZone,
        A = new Date(),
        w = A.toISOString(),
        f = A.toLocaleString("en-US", {
          timeZone: Y,
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        j = Y_("tengu_mocha_barista", !1),
        J = formatConnectorsInfo($),
        D = await getCurrentGitHubRepoUrl(),
        M = ["Available environments:"];
      for (let Z of q) M.push(`- ${Z.name} (id: ${Z.environment_id}, kind: ${Z.kind})`);
      let X = M.join(`
`);
      return [{
        type: "text",
        text: buildScheduleRemoteAgentsPrompt({
          userTimezone: Y,
          nowUtcIso: w,
          nowLocal: f,
          oneOffEnabled: j,
          connectorsInfo: J,
          gitRepoUrl: D,
          environmentsInfo: X,
          createdEnvironment: K,
          setupNotes: O,
          needsGitHubAccessReminder: T,
          userArgs: H
        })
      }];
    }
  });
}
var i0T = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
  ZF4 = "What would you like to do with scheduled cloud agents?";
var LF4 = L((): any => {
  o6();
  i5();
  Xv();
  Mq();
  JGH();
  FH();
  Vh();
  A6();
  gK();
  V7();
  H6();
  Z4H();
  QP();
});
export {RF4 as arc,decodeConnectorUuidFromServerId as t6m,collectClaudeAiProxyConnectors as n6m,sanitizeConnectorName as r6m,formatConnectorsInfo as o6m,formatSetupWarnings as irc,getCurrentGitHubRepoUrl as s6m,buildScheduleRemoteAgentsPrompt as i6m,registerScheduleRemoteAgentsSkill,i0T as e6m,ZF4 as src,LF4 as lrc};
