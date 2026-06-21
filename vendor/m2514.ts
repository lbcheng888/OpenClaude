// @ts-nocheck
import {jt,ws} from "./m228.ts";
import {Pt,Go} from "./m632.ts";
import {nQo,mc} from "../src/config/0645_maxBytes.ts";
import {getCurrentProjectConfig,saveCurrentProjectConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
function I0t(e,t){switch(t){case"bash":return`!${e}`;default:return e}}
function Ck(e){if(e.startsWith("!"))return"bash";return"prompt"}
function TF(e){if(Ck(e)==="prompt")return e;return e.slice(1)}
function D0t(e){return e==="!"}
function D9r(){let e=jt().existsSync(Wki.join(Pt(),"CLAUDE.md")),t=nQo(Pt());return[{key:"workspace",text:"Ask Claude to create a new app or clone a repository",isComplete:!1,isCompletable:!0,isEnabled:t},{key:"claudemd",text:"Run /init to create a CLAUDE.md file with instructions for Claude",isComplete:e,isCompletable:!0,isEnabled:!t}]}
function Gki(){return D9r().filter(({isCompletable:e,isEnabled:t})=>e&&t).every(({isComplete:e})=>e)}
function uet(){if(getCurrentProjectConfig().hasCompletedProjectOnboarding)return;if(Gki())saveCurrentProjectConfig((e)=>({...e,hasCompletedProjectOnboarding:!0})),Ie("onboarding_project_complete")}
function Kki(){saveCurrentProjectConfig((e)=>({...e,projectOnboardingSeenCount:e.projectOnboardingSeenCount+1}))}
var Wki,Vki;
var P0t=b(()=>{ta();ln();Qn();Go();mc();ws();Wki=require("path");Vki=wn(()=>{let e=getCurrentProjectConfig();if(e.hasCompletedProjectOnboarding||e.projectOnboardingSeenCount>=4||process.env.IS_DEMO)return!1;return!Gki()})});
export {I0t,Ck,TF,D0t,D9r,Gki,uet,Kki,Wki,Vki,P0t};
