// @ts-nocheck
import {bo,uo as configProtoStore} from "../../vendor/m2468.ts";
import {getIsRemoteMode,getChromeFlagOverride,lt} from "../session/0132_sent.ts";
import {getGlobalConfig,tr as Qn} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Ne as je} from "../../vendor/m583.ts";
import {shouldEnableClaudeInChrome,isChromeExtensionInstalled,kTe as rye} from "../permissions/4676_shouldSuppressChromeOffer.ts";
import {isClaudeAISubscriber,lo as Ao} from "./2036_withOAuthRefreshLock.ts";
import {bx as lD,lJ as EJ} from "../../vendor/m4620.ts";
import {rA as YC,dn as sn} from "./0137_namespace.ts";
import {Ie as De,vn as Rn} from "../session/0621_length.ts";
import {b,x as M} from "../../runtime.ts";
import {Ir as Lr} from "../../vendor/m584.ts";
import {et as Te} from "../../vendor/m2261.ts";
/** useEffect hook that auto-enables Chrome extension setup issue notification on mount */
function gec() {
  let dispatch = bo(),
    hasRunRef = CQn.useRef(!1);
  CQn.useEffect(() => {
    // Skip if remote mode or already ran
    if (getIsRemoteMode() || hasRunRef.current) return;
    hasRunRef.current = !0;
    let chromeFlagOverride = getChromeFlagOverride(),
      globalConfig = getGlobalConfig();
    // Bail if chrome-in-chrome not enabled via flag/env/config
    if (!(chromeFlagOverride === !0 || je.CLAUDE_CODE_ENABLE_CFC || globalConfig.claudeInChromeDefaultEnabled === !0) || !shouldEnableClaudeInChrome(chromeFlagOverride)) return;
    // Bail if already paired with a device
    if (globalConfig.chromeExtension?.pairedDeviceId) return;
    if (!isClaudeAISubscriber()) {
      lD("chrome", 1);
      return;
    }
    if (YC()) return;
    // Check if extension is installed; if not, increment setup issue count
    isChromeExtensionInstalled().then(isInstalled => {
      if (isInstalled) return;
      lD("chrome", 1), dispatch(prevState => {
        if (prevState.setupIssues.chromeExtensionIssueCount === 1) return prevState;
        return {
          ...prevState,
          setupIssues: {
            ...prevState.setupIssues,
            chromeExtensionIssueCount: 1
          }
        };
      });
    }).catch(De);
  }, [dispatch]);
}
var CQn;
var _ec = b(() => {
  lt();
  configProtoStore();
  Ao();
  rye();
  Qn();
  Lr();
  sn();
  Rn();
  EJ();
  CQn = M(Te(), 1);
});
export {gec as occ,CQn as vnr,_ec as scc};
