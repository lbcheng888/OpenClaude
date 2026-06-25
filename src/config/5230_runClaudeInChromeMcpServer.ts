// @ts-nocheck
import {ft as pt,b} from "../../runtime.ts";
import {nt as rt} from "../../vendor/m127.ts";
import {getSecureSocketPath as U0t,getAllSocketPaths as K9r,bO as zO} from "../mcp/2592_trackClaudeInChromeTabId.ts";
import {saveGlobalConfig as un,getGlobalConfig as vt,enableConfigs as Ehe,tr as nr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Zp as Gm,d1 as j1} from "../../vendor/m2705.ts";
import {getAPIProvider as Hr,Ps as si} from "../api/1287_usesFirstPartyModelIds.ts";
import {checkAndRefreshOAuthTokenIfNeeded as wh,getClaudeAIOAuthTokens as di,lo as mo} from "./2036_withOAuthRefreshLock.ts";
import {qdn as hln,BNe as C1e} from "../../vendor/m1291.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Ne as Ge} from "../../vendor/m583.ts";
import {woe as _oe,zK as l7} from "./0751_bytes.ts";
import {getWebSocketProxyUrl as iQ,ey as Z_} from "./1026_shouldBypassProxyWithCidr.ts";
import {Tl as Fl,mn as cn} from "../telemetry/0600_feature_name.ts";
import {initializeAnalyticsSink as k$e,Jge as bhe} from "../telemetry/3235_createLinkedTransportPair.ts";
import {createClaudeForChromeMcpServer as SQt} from "../../vendor/m430.ts";
import {t1e as jLe,Ktn as CQt} from "../../vendor/m433.ts";
import {shutdown1PEventLogging as dfe,GM as S1} from "../session/2203_shutdown1PEventLogging.ts";
import {shutdownDatadog as yfe,Q7 as JQ} from "../permissions/5229_trackDatadogEvent.ts";
import {logForDebugging as v,qe as je} from "./0236_setHasFormattedOutput.ts";
import {jhr as Dur} from "../../vendor/m431.ts";
import {Ir as Or} from "../../vendor/m584.ts";
import {dn as an} from "./0137_namespace.ts";
import {cxe as LHe} from "../api/3982_model.ts";
// @ts-nocheck
var un8 = {};
pt(un8, {
  runClaudeInChromeMcpServer: () => runClaudeInChromeMcpServer,
  createChromeContext: () => createChromeContext
});
function AfT(mode) {
  return rv4.some(validMode => validMode === mode);
}
function ffT() {
  if (rt(process.env.USE_LOCAL_OAUTH) || rt(process.env.LOCAL_BRIDGE)) return "ws://localhost:8765";
  if (rt(process.env.USE_STAGING_OAUTH)) return "wss://bridge-staging.claudeusercontent.com";
  return "wss://bridge.claudeusercontent.com";
}
function jfT() {
  return rt(process.env.USE_LOCAL_OAUTH) || rt(process.env.LOCAL_BRIDGE);
}
function createChromeContext(envOverrides) {
  let logger = new av4(),
    bridgeUrl = ffT();
  logger.info(`Bridge URL: ${bridgeUrl}`);
  let cachedAccountInfo,
    isAccountMismatched = false,
    permissionModeEnv = envOverrides?.CLAUDE_CHROME_PERMISSION_MODE ?? process.env.CLAUDE_CHROME_PERMISSION_MODE,
    initialPermissionMode;
  if (permissionModeEnv) if (AfT(permissionModeEnv)) initialPermissionMode = permissionModeEnv;else logger.warn(`Invalid CLAUDE_CHROME_PERMISSION_MODE "${permissionModeEnv}". Valid values: ${rv4.join(", ")}`);
  return {
    serverName: "Claude in Chrome",
    logger: logger,
    socketPath: U0t(),
    getSocketPaths: K9r,
    clientTypeId: "claude-code",
    onAuthenticationError: () => {
      logger.warn("Authentication error occurred. Please ensure you are logged into the Claude browser extension with the same claude.ai account as Claude Code.");
    },
    onToolCallDisconnected: () => {
      if (isAccountMismatched) return `Browser extension is not connected: the OAuth token Claude Code is using belongs to a different claude.ai account than the one Claude Code is logged in as. If CLAUDE_CODE_OAUTH_TOKEN is set in your shell or CI profile, unset it (or re-mint it for this account), then run /logout and /login in Claude Code and make sure the browser extension is signed into the same claude.ai account. If you continue to experience issues, please report a bug: ${iv4}`;
      return `Browser extension is not connected. Please ensure the Claude browser extension is installed and running (${YfT}), and that you are logged into claude.ai with the same account as Claude Code. If this is your first time connecting to Chrome, you may need to restart Chrome for the installation to take effect. If you continue to experience issues, please report a bug: ${iv4}`;
    },
    onExtensionPaired: (deviceId, deviceName) => {
      un(w => {
        if (w.chromeExtension?.pairedDeviceId === deviceId && w.chromeExtension?.pairedDeviceName === deviceName) return w;
        return {
          ...w,
          chromeExtension: {
            pairedDeviceId: deviceId,
            pairedDeviceName: deviceName
          }
        };
      }), logger.info(`Paired with "${deviceName}" (${deviceId.slice(0, 8)})`);
    },
    getPersistedDeviceId: () => vt().chromeExtension?.pairedDeviceId,
    askUserToolName: Gm,
    bridgeConfig: {
      url: bridgeUrl,
      getUserId: async () => {
        let persistedUuid = vt().oauthAccount?.accountUuid || process.env.CLAUDE_CODE_ACCOUNT_UUID;
        if (Hr() !== "firstParty") return isAccountMismatched = false, persistedUuid;
        await wh().catch(() => {});
        let accessToken = di()?.accessToken;
        if (!accessToken) return isAccountMismatched = false, persistedUuid;
        if (cachedAccountInfo?.token !== accessToken) {
          let decoded = await hln(accessToken).catch(() => {
            return;
          });
          if (!decoded?.account_uuid) return isAccountMismatched = false, persistedUuid;
          cachedAccountInfo = {
            token: accessToken,
            accountUuid: decoded.account_uuid.toLowerCase()
          };
        }
        let tokenAccountUuid = cachedAccountInfo.accountUuid,
          hasMismatch = persistedUuid !== undefined && persistedUuid.toLowerCase() !== tokenAccountUuid;
        if (hasMismatch && !isAccountMismatched) j("tengu_chrome_bridge_account_mismatch", {
          has_env_token: Boolean(Ge.CLAUDE_CODE_OAUTH_TOKEN),
          persisted_from_config: Boolean(vt().oauthAccount?.accountUuid)
        }), logger.warn("The OAuth token in use resolves to a different claude.ai account than the persisted Claude Code login. Using the token-derived account for the browser bridge. If CLAUDE_CODE_OAUTH_TOKEN is set, unset it or re-mint it for this account, then /logout and /login.");
        return isAccountMismatched = hasMismatch, tokenAccountUuid;
      },
      getOAuthToken: async () => (await wh().catch(() => {}), di()?.accessToken ?? ""),
      getWsOptions: () => {
        let mtlsOpts = _oe(),
          proxyUrl = iQ(bridgeUrl);
        if (!mtlsOpts && !proxyUrl) return;
        return {
          ...mtlsOpts,
          ...(proxyUrl && {
            proxy: proxyUrl
          })
        };
      },
      ...(jfT() && {
        devUserId: "dev_user_local"
      })
    },
    ...(initialPermissionMode && {
      initialPermissionMode: initialPermissionMode
    }),
    ...false,
    trackEvent: ($, Y) => {
      let w = {};
      if (Y) for (let [A, f] of Object.entries(Y)) {
        let j = A === "status" ? "bridge_status" : A;
        if (typeof f === "boolean" || typeof f === "number") w[j] = f;else if (typeof f === "string" && wfT.has(j)) w[j] = f;
      }
      j($, w);
    }
  };
}
async function runClaudeInChromeMcpServer() {
  return Fl("chrome_mcp_server_start", async () => {
    Ehe(), k$e();
    let H = createChromeContext(),
      ctx = SQt(H),
      mcpServer = new jLe(),
      transport = false,
      shutdownCalled = async () => {
        if (transport) return;
        transport = true, await dfe(), await yfe(), process.exit(0);
      };
    process.stdin.on("end", () => void shutdownCalled()), process.stdin.on("error", () => void shutdownCalled()), v("[Claude in Chrome] Starting MCP server"), await ctx.connect(mcpServer), v("[Claude in Chrome] MCP server started");
  });
}
class av4 {
  silly(msg, ...args) {
    v($z_.format(msg, ...args), {
      level: "debug"
    });
  }
  debug(msg, ...args) {
    v($z_.format(msg, ...args), {
      level: "debug"
    });
  }
  info(msg, ...args) {
    v($z_.format(msg, ...args), {
      level: "info"
    });
  }
  warn(msg, ...args) {
    v($z_.format(msg, ...args), {
      level: "warn"
    });
  }
  error(msg, ...args) {
    v($z_.format(msg, ...args), {
      level: "error"
    });
  }
}
var $z_,
  YfT = "https://claude.ai/chrome",
  iv4 = "https://github.com/anthropics/claude-code/issues/new?labels=bug,claude-in-chrome",
  wfT,
  rv4;
var mn8 = b(() => {
  Dur();
  CQt();
  JQ();
  cn();
  S1();
  Ct();
  bhe();
  C1e();
  j1();
  mo();
  nr();
  je();
  Or();
  an();
  si();
  l7();
  Z_();
  LHe();
  zO();
  $z_ = require("util"), wfT = new Set(["bridge_status", "error_type", "tool_name"]), rv4 = ["ask", "skip_all_permission_checks", "follow_a_plan"];
});
export {un8 as gZr,AfT as oDm,ffT as sDm,jfT as iDm,createChromeContext,runClaudeInChromeMcpServer,av4 as D5l,$z_ as M_t,YfT as nDm,iv4 as H5l,wfT as rDm,rv4 as I5l,mn8 as _Zr};
