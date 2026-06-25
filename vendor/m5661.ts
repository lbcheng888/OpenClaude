// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {isAutoModeFromFallback,bte} from "./m3960.ts";
import {isAutoModeGateEnabled,cy} from "../src/permissions/5219_verifyAutoModeGateAccess.ts";
var jdc={};
ft(jdc,{shouldShowAutoDefaultNotice:()=>shouldShowAutoDefaultNotice,AUTO_DEFAULT_NOTICE_TEXT:()=>AUTO_DEFAULT_NOTICE_TEXT});
function shouldShowAutoDefaultNotice(e){{let t=getGlobalConfig();return isAutoModeFromFallback()&&e==="auto"&&isAutoModeGateEnabled()&&t.hasCompletedOnboarding===!0&&!t.hasSeenAutoDefaultNotice}return!1}
var AUTO_DEFAULT_NOTICE_TEXT=`Auto mode is now Claude Code's default permission mode.

Auto mode lets Claude handle permission prompts automatically. Claude checks each tool call for risky actions and prompt injection before executing, runs the ones it assesses as lower-risk, and blocks the rest.

https://code.claude.com/docs/en/permission-modes`;
var Ydc=b(()=>{tr();bte();cy()});
export {jdc,shouldShowAutoDefaultNotice,AUTO_DEFAULT_NOTICE_TEXT,Ydc};
