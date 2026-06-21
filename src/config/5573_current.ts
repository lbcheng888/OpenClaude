// @ts-nocheck
import {bo,configProtoStore} from "../../vendor/m2458.ts";
import {getIsRemoteMode,getChromeFlagOverride,lt} from "../session/0131_sent.ts";
import {getGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {je} from "../../vendor/m577.ts";
import {shouldEnableClaudeInChrome,isChromeExtensionInstalled,rye} from "../permissions/4648_shouldSuppressChromeOffer.ts";
import {isClaudeAISubscriber,Ao} from "./2031_withOAuthRefreshLock.ts";
import {lD,EJ} from "../../vendor/m4592.ts";
import {YC,sn} from "./0047_namespace.ts";
import {De,Rn} from "../session/0615_length.ts";
import {b,M} from "../../runtime.ts";
import {Lr} from "../../vendor/m578.ts";
import {Te} from "../../vendor/m2253.ts";
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
export {gec,CQn,_ec};
