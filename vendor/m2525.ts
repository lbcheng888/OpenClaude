// @ts-nocheck
import {Wt,ps} from "./m230.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {Zrs,Xl} from "../src/config/0651_maxBytes.ts";
import {getCurrentProjectConfig,saveCurrentProjectConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {He,mn} from "../src/telemetry/0600_feature_name.ts";
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
function lOt(e,t){switch(t){case"bash":return`!${e}`;default:return e}}
function React(e){if(e.startsWith("!"))return"bash";return"prompt"}
function qF(e){if(React(e)==="prompt")return e;return e.slice(1)}
function cOt(e){return e==="!"}
function u5r(){let e=Wt().existsSync(uLi.join(isTmuxControlMode(),"CLAUDE.md")),t=Zrs(isTmuxControlMode());return[{key:"workspace",text:"Ask Claude to create a new app or clone a repository",isComplete:!1,isCompletable:!0,isEnabled:t},{key:"claudemd",text:"Run /init to create a CLAUDE.md file with instructions for Claude",isComplete:e,isCompletable:!0,isEnabled:!t}]}
function dLi(){return u5r().filter(({isCompletable:e,isEnabled:t})=>e&&t).every(({isComplete:e})=>e)}
function pnt(){if(getCurrentProjectConfig().hasCompletedProjectOnboarding)return;if(dLi())saveCurrentProjectConfig((e)=>({...e,hasCompletedProjectOnboarding:!0})),He("onboarding_project_complete")}
function mLi(){saveCurrentProjectConfig((e)=>({...e,projectOnboardingSeenCount:e.projectOnboardingSeenCount+1}))}
var uLi,pLi;
var uOt=b(()=>{Wi();mn();tr();Po();Xl();ps();uLi=require("path");pLi=Hn(()=>{let e=getCurrentProjectConfig();if(e.hasCompletedProjectOnboarding||e.projectOnboardingSeenCount>=4||process.env.IS_DEMO)return!1;return!dLi()})});
export {lOt,React,qF,cOt,u5r,dLi,pnt,mLi,uLi,pLi,uOt};
