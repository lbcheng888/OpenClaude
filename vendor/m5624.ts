// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {isAutoModeFromFallback,Gte} from "./m4087.ts";
import {isAutoModeGateEnabled,ly} from "../src/permissions/5185_verifyAutoModeGateAccess.ts";
var arc={};
isFullscreenWithTTY(arc,{shouldShowAutoDefaultNotice:()=>shouldShowAutoDefaultNotice,AUTO_DEFAULT_NOTICE_TEXT:()=>AUTO_DEFAULT_NOTICE_TEXT});
function shouldShowAutoDefaultNotice(e){{let t=getGlobalConfig();return isAutoModeFromFallback()&&e==="auto"&&isAutoModeGateEnabled()&&t.hasCompletedOnboarding===!0&&!t.hasSeenAutoDefaultNotice}return!1}
var AUTO_DEFAULT_NOTICE_TEXT=`Auto mode is now Claude Code's default permission mode.

Auto mode lets Claude handle permission prompts automatically. Claude checks each tool call for risky actions and prompt injection before executing, runs the ones it assesses as lower-risk, and blocks the rest.

https://code.claude.com/docs/en/permission-modes`;
var lrc=b(()=>{Qn();Gte();ly()});
export {arc,shouldShowAutoDefaultNotice,AUTO_DEFAULT_NOTICE_TEXT,lrc};
