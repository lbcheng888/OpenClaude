// @ts-nocheck
import {Td as JT,Cb as QP} from "../../vendor/m5036.ts";
import {enableDebugLogging as mH8,getDebugLogPath as g5H,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {getSettingsFilePathForSource as l$,br as N8} from "../config/0745_updateSettingsForSource.ts";
import {eCo as nTq,tCo as iTq} from "../permissions/4470_ISSUES_EXPLAINER.ts";
import {fPe as oRH,hPe as FAH} from "../../vendor/m4606.ts";
import {due as z1H,dne as So} from "../../vendor/m4605.ts";
import {nVt as cB_,XYn as LQ6} from "../../vendor/m5089.ts";
import {mne as k_H,CL as oV} from "../../vendor/m4609.ts";
import {V0 as wL,Pf as qA} from "./2591_level.ts";
import {pk as KG,ps as M9} from "../../vendor/m230.ts";
import {formatFileSize as f4,Xo as H9} from "../../vendor/m240.ts";
import {In as b6,Ce as GH,Ct as L_} from "../../vendor/m197.ts";
import {b as L} from "../../runtime.ts";
/*
 * agent/5446_name.ts - agent/background-task restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 */
function oB4(): any {
  JT({
    name: "debug",
    menuDescription: "Turn on debug logging and investigate problems",
    description: "Enable debug logging for this session and help diagnose issues",
    allowedTools: ["Read", "Grep", "Glob"],
    argumentHint: "[issue description]",
    disableModelInvocation: !0,
    userInvocable: !0,
    async getPromptForCommand(H: any): Promise<any> {
      let _ = mH8(),
        q = g5H(),
        [K, O] = await Promise.all([aB4(q), YWT()]);
      return [{
        type: "text",
        text: `# Debug Skill

Help the user debug an issue they're encountering in this current Claude Code session.
${_ ? "" : `
## Debug Logging Just Enabled

Debug logging was OFF for this session until now. Nothing prior to this /debug invocation was captured.

Tell the user that debug logging is now active at \`${q}\`, ask them to reproduce the issue, then re-read the log. If they can't reproduce, they can also restart with \`claude --debug\` to capture logs from startup.
`}
## Session Debug Log

The debug log for the current session is at: \`${q}\`

${K}

For additional context, grep for [ERROR] and [WARN] lines across the full file.

${O}

## Issue Description

${H || "The user did not describe a specific issue. Read the debug log and summarize any errors, warnings, or notable issues."}

## Settings

Remember that settings are in:
* user - ${l$("userSettings")}
* project - ${l$("projectSettings")}
* local - ${l$("localSettings")}

## Instructions

1. Review the user's issue description
2. The last ${Si6} lines show the debug file format. Look for [ERROR] and [WARN] entries, stack traces, and failure patterns across the file
3. Consider launching the ${nTq} subagent to understand the relevant Claude Code features
4. Explain what you found in plain language
5. Suggest concrete fixes or next steps
`
      }];
    }
  });
}
async function YWT(): Promise<any> {
  let H = oRH(),
    [_, q, K] = await Promise.all([rB4(z1H()), rB4(cB_()), aB4(H)]);
  if (_ === null && q === null) return `## Daemon

No daemon lock or status file found \u2014 the background daemon does not appear to be running. If the issue involves background sessions or \`claude agents\`, the daemon log (if any) is at \`${H}\`.`;
  return `## Daemon

The background daemon manages \`& <prompt>\` jobs and \`claude agents\`. If the issue involves background sessions, look here.

### daemon.lock
\`\`\`json
${_ ?? "(missing)"}
\`\`\`

### daemon.status.json
\`\`\`json
${q ?? "(missing)"}
\`\`\`

### Daemon log (\`${H}\`)
${K}

Other daemon state on disk (Read if relevant \u2014 roster contains user prompts and env vars):
- \`${k_H()}\` \u2014 live worker roster
- \`${wL()}/<short>/state.json\` \u2014 per-job state`;
}
async function aB4(H: any): Promise<any> {
  try {
    let {
        content: content,
        bytesTotal: bytesTotal
      } = await KG(H, zWT),
      K = content.split(`
`).slice(-Si6).join(`
`);
    return `Log size: ${f4(bytesTotal)}

### Last ${Si6} lines

\`\`\`
${K}
\`\`\``;
  } catch (_) {
    return b6(_) ? "No log file exists yet." : `Failed to read last ${Si6} lines: ${GH(_)}`;
  }
}
async function rB4(H: any): Promise<any> {
  try {
    return (await KG(H, $WT)).content;
  } catch (_) {
    return b6(_) ? null : `(read error: ${GH(_)})`;
  }
}
var Si6 = 20,
  zWT = 65536,
  $WT = 8192;
var sB4 = L((): any => {
  iTq();
  N8();
  oV();
  So();
  FAH();
  LQ6();
  qA();
  FH();
  L_();
  H9();
  M9();
  QP();
});
export {oB4 as Ptc,YWT as u4m,aB4 as Otc,rB4 as Dtc,Si6 as Gtr,zWT as l4m,$WT as c4m,sB4 as Ltc};
