// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Ph as KA,Cs as G9} from "../../vendor/m2224.ts";
import {sn as A6,Bl as C4,KE as RM} from "../config/0047_namespace.ts";
/**
 * Semantic restoration for agent/5023_type.ts.
 * Cross-module bundled symbols and export names are intentionally preserved.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;

var p6T, nX4;
var iX4 = L((): any => {
  KA();
  A6();
  p6T = {
    type: "prompt",
    description: "Set up Claude Code's status line UI",
    contentLength: 0,
    aliases: [],
    name: "statusline",
    progressMessage: "setting up statusLine",
    allowedTools: [G9, "Read(~/**)", "Edit(~/.claude/settings.json)"],
    source: "builtin",
    disableNonInteractive: !0,
    disableModelInvocation: !0,
    requires: {
      workspace: !0
    },
    async getPromptForCommand(H: any): Promise<any> {
      if (C4()) return [{
        type: "text",
        text: `Tell the user: /statusline is unavailable in safe mode. The setup flow saves the status line to ~/.claude/settings.json, but safe mode only displays the managed (policy) status line, so the result would never render. To set up a status line, ${RM()} and run /statusline again.

Do not run the statusline-setup agent and do not edit any settings files. Simply inform the user.`
      }];
      let _ = H.trim() || "Configure my statusLine from my shell PS1 configuration";
      return [{
        type: "text",
        text: `Create an ${G9} with subagent_type "statusline-setup" and the prompt "${_}"`
      }];
    }
  }, nX4 = p6T;
});

export {p6T as kum,nX4 as NHl,iX4 as BHl};
