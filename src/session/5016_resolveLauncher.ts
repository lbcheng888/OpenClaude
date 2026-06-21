// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {yA,XI} from "../../vendor/m459.ts";
import {sU,Pge} from "../../vendor/m3855.ts";
import {_i,hp} from "./1460_promise.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {AC,Bwe,mg} from "../agent/2580_level.ts";
import {getMaterializedSessionFile,isChainParticipant,isLoggableMessage,persistLeafCheckpoint,ja} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {_g,ry} from "../agent/2772_withFileTypes.ts";
import {Hvo,zDe,c8t} from "../config/4894_cmd.ts";
import {getSessionId,lt} from "./0131_sent.ts";
import {De,Rn} from "./0615_length.ts";
import {isTeammate,Am} from "../agent/1459_waitForTeammatesToBecomeIdle.ts";
import {ES,EU} from "../../vendor/m4256.ts";
import {Dkl,E8t} from "./5015_is_repl.ts";
import {withTimeout} from "../telemetry/1483_withTimeout.ts";
import {eve,r5} from "../telemetry/2034_CLAUDE_AX_SCREEN_READER.ts";
import {uVn,Ivo} from "../../vendor/m4894.ts";
import {Fr,Fh,Ql} from "../../vendor/m4405.ts";
import {_t,cu} from "../../vendor/m582.ts";
var Okl = {};
isFullscreenWithTTY(Okl, {
  resolveLauncher: () => resolveLauncher,
  call: () => Bcm
});

// Resolve the launcher command: prefer the "claude" binary found on PATH, else fall back to sU()
async function resolveLauncher() {
  let resolvedPath = await yA("claude");
  if (resolvedPath) return {
    cmd: resolvedPath,
    prefixArgs: []
  };
  return sU();
}
var Pkl: any,
  // Handler for the /update slash command — restarts Claude Code on the latest build
  Bcm = async (commandInput: any, toolCtx: any) => {
    // Refuse to update inside a background (agent) session
    if (_i()) return logEvent("tengu_update_refused", {
      bg_session: !0
    }), {
      type: "text",
      value: `This is a background session \u2014 press \u2190 to detach, then run \`claude respawn ${AC()}\` to restart it on the latest build.`
    };

    // Refuse if any background tasks are still running or pending
    let activeTasks = toolCtx.taskRegistry.all();
    if (Object.values(activeTasks).some((taskEntry: any) => taskEntry.status === "running" || taskEntry.status === "pending")) return logEvent("tengu_update_refused", {
      active_tasks: !0
    }), {
      type: "text",
      value: "Cannot /update while work is running in the background \u2014 wait for it to finish, then try again."
    };

    // Detect transcript path drift: session was resumed from a different project dir
    let materializedFile = getMaterializedSessionFile(),
      expectedTranscriptPath = Pkl.join(_g(Hvo()), `${getSessionId()}.jsonl`);
    if (materializedFile && materializedFile !== expectedTranscriptPath) return logEvent("tengu_update_refused", {
      transcript_path_drift: !0
    }), {
      type: "text",
      value: "Cannot /update \u2014 this session was resumed from a different project directory. Restart manually with --resume to continue on the latest version."
    };

    // Persist a leaf checkpoint for the last loggable chain message before restarting
    let lastChainMsgUuid = toolCtx.messages.findLast((msg: any) => isChainParticipant(msg) && isLoggableMessage(msg))?.uuid;
    if (lastChainMsgUuid) try {
      await persistLeafCheckpoint(lastChainMsgUuid);
    } catch (persistErr: any) {
      De(persistErr);
    }

    // Collect team name if running as a teammate
    let teamName = isTeammate() ? void 0 : toolCtx.getAppState().teamContext?.teamName;

    // Collect bridge session info (for REPL bridge reconnect after respawn)
    let bridgeSession = ES(),
      bridgeSessionId = bridgeSession?.bridgeSessionId,
      lastSeqNum = bridgeSession?.getLastSequenceNum(),
      outboundOnly = bridgeSession?.outboundOnly;
    if (bridgeSessionId)
      // Signal to skip archive on next REPL bridge cycle, flush pending messages, then tear down
      toolCtx.setAppState((appState: any) => appState.replBridgeSkipNextArchive ? appState : {
        ...appState,
        replBridgeSkipNextArchive: !0
      }), bridgeSession.writeSdkMessages([Dkl("Switching to latest Claude Code\u2026 reconnecting", getSessionId())]), await withTimeout(bridgeSession.flush(), 2000, "bridge flush").catch(() => {}), await bridgeSession.teardown({
        skipArchive: !0
      });

    // Build extra env vars: team name + screen reader env + bridge reconnect env
    let extraEnv: any = {};
    if (teamName) extraEnv.CLAUDE_INTERNAL_ASSISTANT_TEAM_NAME = teamName;
    return Object.assign(extraEnv, eve()), Object.assign(extraEnv, Bwe(bridgeSessionId, lastSeqNum, outboundOnly) ?? {}), zDe({
      launcher: await resolveLauncher(),
      freshIfNoTranscript: !0,
      extraArgs: uVn(Fr(toolCtx), Fh(toolCtx)),
      env: Object.keys(extraEnv).length > 0 ? extraEnv : void 0,
      preSpawn: () => process.stdout.write(_t.dim(`
Switching from ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION} to latest\u2026 conversation will continue

`))
    });
  };

// Module initializer: load path module and other lazy deps
var $wo = b(() => {
  cu();
  lt();
  E8t();
  EU();
  mg();
  Ct();
  hp();
  Ql();
  Rn();
  c8t();
  r5();
  Pge();
  Ivo();
  ry();
  ja();
  Am();
  XI();
  Pkl = require("path");
});
export {Okl,resolveLauncher,Pkl,Bcm,$wo};
