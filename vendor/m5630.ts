// @ts-nocheck
import {_t,uo} from "./m2468.ts";
import {Ci,fd} from "./m2469.ts";
import {Lnr,Mnr,b2o} from "./m5629.ts";
import {hasShownLspRecommendationThisSession,setLspRecommendationShownThisSession,lt} from "../src/session/0132_sent.ts";
import {ruc,suc,ouc,iuc} from "./m5628.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {J5t,Qce} from "../src/config/4464_ref.ts";
import {getSettingsForSource,ao,br} from "../src/config/0745_updateSettingsForSource.ts";
import {saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
function cuc(){let e=luc.c(12),t=_t(VGm),{addNotification:n}=Ci(),r;if(e[0]===Symbol.for("react.memo_cache_sentinel"))r=new Set,e[0]=r;else r=e[0];let o=Fnr.useRef(r),{recommendation:s,clearRecommendation:i,tryResolve:a}=Lnr(),l,c;if(e[1]!==t||e[2]!==a)l=()=>{a(async()=>{if(hasShownLspRecommendationThisSession())return null;let m=[];for(let f of t)if(!o.current.has(f))o.current.add(f),m.push(f);for(let f of m)try{let g=(await ruc(f))[0];if(g)return logForDebugging(`[useLspPluginRecommendation] Found match: ${g.pluginName} for ${f}`),setLspRecommendationShownThisSession(!0),{pluginId:g.pluginId,pluginName:g.pluginName,pluginDescription:g.description,fileExtension:Nnr.extname(f),shownAt:Date.now()}}catch(h){logForDebugging(`[useLspPluginRecommendation] Failed to check for LSP plugins for ${f}: ${h}`,{level:"error"})}return null})},c=[t,a],e[1]=t,e[2]=a,e[3]=l,e[4]=c;else l=e[3],c=e[4];Fnr.useEffect(l,c);let u;if(e[5]!==n||e[6]!==i||e[7]!==s)u=(m)=>{if(!s)return;let{pluginId:f,pluginName:h,shownAt:g}=s;logForDebugging(`[useLspPluginRecommendation] User response: ${m} for ${h}`);e:switch(m){case"yes":{Mnr(f,h,"lsp-plugin",n,async(_)=>{logForDebugging(`[useLspPluginRecommendation] Installing plugin: ${f}`);let T=typeof _.entry.source==="string"?Nnr.join(_.marketplaceInstallLocation,_.entry.source):void 0;await J5t(f,_.entry,"user",void 0,T,void 0,void 0,_.marketplaceInstallLocation);let y=getSettingsForSource("userSettings");ao("userSettings",{enabledPlugins:{...y?.enabledPlugins,[f]:!0}}),logForDebugging(`[useLspPluginRecommendation] Plugin installed: ${f}`)});break e}case"no":{let _=Date.now()-g;if(_>=WGm)logForDebugging(`[useLspPluginRecommendation] Timeout detected (${_}ms), incrementing ignored count`),suc();break e}case"never":{ouc(f);break e}case"disable":saveGlobalConfig(GGm)}i()},e[5]=n,e[6]=i,e[7]=s,e[8]=u;else u=e[8];let d=u,p;if(e[9]!==d||e[10]!==s)p={recommendation:s,handleResponse:d},e[9]=d,e[10]=s,e[11]=p;else p=e[11];return p}
function GGm(e){if(e.lspRecommendationDisabled)return e;return{...e,lspRecommendationDisabled:!0}}
function VGm(e){return e.fileHistory.trackedFiles}
var luc,Nnr,Fnr,WGm=28000;
var uuc=b(()=>{lt();fd();uo();tr();qe();iuc();Qce();br();b2o();luc=x(tt(),1),Nnr=require("path"),Fnr=x(et(),1)});
export {cuc,GGm,VGm,luc,Nnr,Fnr,WGm,uuc};
