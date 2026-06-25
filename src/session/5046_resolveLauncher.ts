// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {Rm,tI} from "../../vendor/m465.ts";
import {RB,Y_e} from "../../vendor/m3873.ts";
import {Ws,vd} from "./1465_promise.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {eb,Ewe,Pf} from "../agent/2591_level.ts";
import {getMaterializedSessionFile as px,isChainParticipant as Fue,isLoggableMessage as One,persistLeafCheckpoint as GGt,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {Cg,D_} from "../agent/2784_withFileTypes.ts";
import {zIo,jPe,xGt} from "../config/4924_cmd.ts";
import {getSessionId as It,lt} from "./0132_sent.ts";
import {Ie,vn} from "./0621_length.ts";
import {isTeammate as um,Op} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {yS,WB} from "../../vendor/m4274.ts";
import {ZMl,WGt} from "./5045_request_id.ts";
import {withTimeout as Oc} from "../telemetry/1488_withTimeout.ts";
import {NRe,y8} from "../telemetry/2039_CLAUDE_AX_SCREEN_READER.ts";
import {Qjn,jIo} from "../../vendor/m4924.ts";
import {Mr,Kh,xl} from "../../vendor/m4427.ts";
import {bt,Gc} from "../../vendor/m588.ts";
var t1l = {};
ft(t1l, {
  resolveLauncher: () => resolveLauncher,
  call: () => call
});

// Resolve the launcher command: prefer the "claude" binary found on PATH, else fall back to RB()
async function resolveLauncher() {
  let resolvedPath = await Rm("claude");
  if (resolvedPath) return {
    cmd: resolvedPath,
    prefixArgs: []
  };
  return RB();
}
var e1l: any,
  // Handler for the /update slash command — restarts Claude Code on the latest build
  call = async (commandInput: any, toolCtx: any) => {
    // Refuse to update inside a background (agent) session
    if (Ws()) return W("tengu_update_refused", {
      bg_session: !0
    }), {
      type: "text",
      value: `This is a background session — press ← to detach, then run \`claude respawn ${eb()}\` to restart it on the latest build.`
    };

    // Refuse if any background tasks are still running or pending
    let activeTasks = toolCtx.taskRegistry.all();
    if (Object.values(activeTasks).some((taskEntry: any) => taskEntry.status === "running" || taskEntry.status === "pending")) return W("tengu_update_refused", {
      active_tasks: !0
    }), {
      type: "text",
      value: "Cannot /update while work is running in the background — wait for it to finish, then try again."
    };

    // Detect transcript path drift: session was resumed from a different project dir
    let materializedFile = px(),
      expectedTranscriptPath = e1l.join(Cg(zIo()), `${It()}.jsonl`);
    if (materializedFile && materializedFile !== expectedTranscriptPath) return W("tengu_update_refused", {
      transcript_path_drift: !0
    }), {
      type: "text",
      value: "Cannot /update — this session was resumed from a different project directory. Restart manually with --resume to continue on the latest version."
    };

    // Persist a leaf checkpoint for the last loggable chain message before restarting
    let lastChainMsgUuid = toolCtx.messages.findLast((msg: any) => Fue(msg) && One(msg))?.uuid;
    if (lastChainMsgUuid) try {
      await GGt(lastChainMsgUuid);
    } catch (persistErr: any) {
      Ie(persistErr);
    }

    // Collect team name if running as a teammate
    let teamName = um() ? void 0 : toolCtx.getAppState().teamContext?.teamName,
      // Collect bridge session info (for REPL bridge reconnect after respawn)
      bridgeSession = yS(),
      bridgeSessionId = bridgeSession?.bridgeSessionId,
      lastSeqNum = bridgeSession?.getLastSequenceNum(),
      outboundOnly = bridgeSession?.outboundOnly;
    if (bridgeSessionId)
      // Signal to skip archive on next REPL bridge cycle, flush pending messages, then tear down
      toolCtx.setAppState((appState: any) => appState.replBridgeSkipNextArchive ? appState : {
      ...appState,
      replBridgeSkipNextArchive: !0
    }), bridgeSession.writeSdkMessages([ZMl("Switching to latest Claude Code… reconnecting", It())]), await Oc(bridgeSession.flush(), 2000, "bridge flush").catch(() => {}), await bridgeSession.teardown({
      skipArchive: !0
    });

    // Build extra env vars: team name + screen reader env + bridge reconnect env
    let extraEnv: any = {};
    if (teamName) extraEnv.CLAUDE_INTERNAL_ASSISTANT_TEAM_NAME = teamName;
    return Object.assign(extraEnv, NRe()), Object.assign(extraEnv, Ewe(bridgeSessionId, lastSeqNum, outboundOnly) ?? {}), jPe({
      launcher: await resolveLauncher(),
      freshIfNoTranscript: !0,
      extraArgs: Qjn(Mr(toolCtx), Kh(toolCtx)),
      env: Object.keys(extraEnv).length > 0 ? extraEnv : void 0,
      preSpawn: () => process.stdout.write(bt.dim(`
Switching from ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION} to latest… conversation will continue

`))
    });
  };

// Module initializer: load path module and other lazy deps
var Z0o = b(() => {
  Gc();
  lt();
  WGt();
  WB();
  Pf();
  kt();
  vd();
  xl();
  vn();
  xGt();
  y8();
  Y_e();
  jIo();
  D_();
  _a();
  Op();
  tI();
  e1l = require("path");
});

export {t1l,resolveLauncher,e1l,call as Jym,Z0o};
