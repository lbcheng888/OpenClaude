// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {NR as RW,Lfe as sDH} from "../api/2195_updateSessionTitle.ts";
import {lo as Mq,initD2 as nI} from "../config/2036_withOAuthRefreshLock.ts";
import {F2o as qLq,opc as kr4} from "../../vendor/m5663.ts";
import {Mm as nT,HIo as Ejq} from "../tools/5174_toSlashCommands.ts";
import {gIe as f0H,Ufa as DHK} from "../../vendor/m3317.ts";
import {qe as FH,gWo as _Sq,logForDebugging as N} from "../config/0236_setHasFormattedOutput.ts";
import {Ce as GH,Ct as L_} from "../../vendor/m197.ts";
import {getSessionId as v_,getCwdState as pd,getIsRemoteMode as VK,setIsRemoteMode as VkH,switchSession as GM,setCwdState as v6H,lt as w_} from "./0132_sent.ts";
import {FT as hj,xS as ZM} from "../../vendor/m122.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Ve as O_} from "../../vendor/m5.ts";
import {gT as oj} from "../core/2809_toInfraSessionId.ts";
import {lu as QT,zf as $w} from "../../vendor/m133.ts";
import {wc as M5,po as zq} from "../tools/5224_userPromptCount.ts";
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
export {fH1 as CTc,attachRemote,jH1 as ATc};
