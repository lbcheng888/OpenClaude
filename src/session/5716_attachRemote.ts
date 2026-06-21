// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {Dw as RW,vfe as sDH} from "../api/2190_updateSessionTitle.ts";
import {Ao as Mq,c$ as nI} from "../config/2031_withOAuthRefreshLock.ts";
import {A1o as qLq,hrc as kr4} from "../../vendor/m5626.ts";
import {Sf as nT,mvo as Ejq} from "../tools/5142_toSlashCommands.ts";
import {kke as f0H,Haa as DHK} from "../../vendor/m3301.ts";
import {qe as FH,S3o as _Sq,logForDebugging as N} from "../config/0234_setHasFormattedOutput.ts";
import {Se as GH,bt as L_} from "../../vendor/m195.ts";
import {getSessionId as v_,getCwdState as pd,getIsRemoteMode as VK,setIsRemoteMode as VkH,switchSession as GM,setCwdState as v6H,lt as w_} from "./0131_sent.ts";
import {qT as hj,zE as ZM} from "../../vendor/m125.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Qe as O_} from "../../vendor/m5.ts";
import {bT as oj} from "../core/2797_toInfraSessionId.ts";
import {yd as QT,ng as $w} from "../../vendor/m132.ts";
import {nu as M5,lo as zq} from "../tools/5190_userPromptCount.ts";
/*
 * session/5671_attachRemote.ts - Session, transcript, and worktree restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal names are retained where local usage does not verify a safer semantic name.
 */
var fH1 = {};
j_(fH1, {
  attachRemote: (): any => attachRemote
});
// Restored export attachRemote; runtime behavior is unchanged.
async function attachRemote(H: any, _: any, q: any): Promise<any> {
  let [{
      prepareApiRequest: K,
      fetchSession: O
    }, {
      getClaudeAIOAuthTokens: T,
      handleOAuth401Error: z
    }, {
      launchRepl: $
    }, {
      getCommands: Y,
      filterCommandsForRemoteMode: A
    }, {
      getDefaultAppState: w
    }, {
      isDebugMode: f
    }] = await Promise.all([Promise.resolve().then((): any => (RW(), sDH)), Promise.resolve().then((): any => (Mq(), nI)), Promise.resolve().then((): any => (qLq(), kr4)), Promise.resolve().then((): any => (nT(), Ejq)), Promise.resolve().then((): any => (f0H(), DHK)), Promise.resolve().then((): any => (FH(), _Sq))]),
    j = await K().catch((X: any): any => {
      throw Error(`auth setup failed: ${GH(X)}`);
    }),
    J = (): any => T()?.accessToken ?? j.accessToken,
    D = {
      sessionId: v_(),
      cwd: pd(),
      isRemoteMode: VK()
    },
    M = !1;
  try {
    VkH(!0), GM(hj(_), "remote_attach");
    let X = O(_, j).then((h: any): any => {
      if (h.session_status === "archived") throw c("tengu_remote_attach_session_rejected", {
        reason: O_("archived")
      }), Error(`Cloud session ${_} is archived and cannot accept new messages.
View it at ${oj(_, void 0, {
        from: "cli",
        m: "0"
      })}`);
      if (h.session_context.cwd && !M) if (QT(h.session_context.cwd)) N("[attachRemote] session reported a UNC cwd \u2014 not adopting", {
        level: "warn"
      });else v6H(h.session_context.cwd);
    }, (h: any): any => {
      N(`[attachRemote] preflight fetchSession failed (continuing via WS): ${GH(h)}`);
    });
    X.catch((): any => {});
    let P = {
        sessionId: _,
        getAccessToken: J,
        orgUuid: j.orgUUID,
        viewerOnly: q?.viewerOnly ?? !1,
        isAttachToExisting: !0,
        preflightCheck: X,
        onAuth401: z
      },
      Z = oj(_, void 0, {
        from: "cli",
        m: "0"
      }),
      W = M5(`Attached to cloud session \xB7 code here or at ${Z}`, "info"),
      G = {
        ...w(),
        ...q?.initialStateOverride,
        remoteSessionUrl: Z,
        replBridgeEnabled: !1,
        replBridgeOutboundOnly: !1,
        replBridgeExplicit: !1
      },
      R = A(await Y(D.cwd));
    await $(H, {
      getFpsMetrics: (): any => {
        return;
      },
      initialState: G
    }, {
      debug: f(),
      commands: R,
      initialTools: [],
      initialMessages: [W],
      mcpClients: [],
      remoteSessionConfig: P,
      autoConnectIdeFlag: q?.autoConnectIdeFlag,
      disableSlashCommands: q?.disableSlashCommands,
      onDetachToCaller: (): any => H.unmount(),
      thinkingConfig: {
        type: "adaptive"
      }
    }, async (h: any, y: any): Promise<any> => {
      h.render(y), await h.waitUntilExit();
    });
  } finally {
    M = !0, VkH(D.isRemoteMode), v6H(D.cwd), GM(D.sessionId, "remote_attach");
  }
}
var jH1 = L((): any => {
  w_();
  y_();
  ZM();
  $w();
  FH();
  L_();
  zq();
});
export {fH1 as hcc,attachRemote,jH1 as gcc};
