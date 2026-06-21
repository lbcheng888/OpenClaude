// @ts-nocheck
import {mt,configProtoStore} from "./m2458.ts";
import {Ui,Ld} from "./m2459.ts";
import {DQn,PQn,QMo} from "./m5591.ts";
import {hasShownLspRecommendationThisSession,setLspRecommendationShownThisSession,lt} from "../src/session/0131_sent.ts";
import {Atc,gtc,htc,_tc} from "./m5590.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Cqt,tue} from "../src/config/4442_ref.ts";
import {getSettingsForSource,updateSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Stc(){let e=Ttc.c(12),t=mt(h$m),{addNotification:n}=Ui(),r;if(e[0]===Symbol.for("react.memo_cache_sentinel"))r=new Set,e[0]=r;else r=e[0];let o=LQn.useRef(r),{recommendation:s,clearRecommendation:i,tryResolve:a}=DQn(),l,c;if(e[1]!==t||e[2]!==a)l=()=>{a(async()=>{if(hasShownLspRecommendationThisSession())return null;let m=[];for(let f of t)if(!o.current.has(f))o.current.add(f),m.push(f);for(let f of m)try{let h=(await Atc(f))[0];if(h)return logForDebugging(`[useLspPluginRecommendation] Found match: ${h.pluginName} for ${f}`),setLspRecommendationShownThisSession(!0),{pluginId:h.pluginId,pluginName:h.pluginName,pluginDescription:h.description,fileExtension:OQn.extname(f),shownAt:Date.now()}}catch(A){logForDebugging(`[useLspPluginRecommendation] Failed to check for LSP plugins for ${f}: ${A}`,{level:"error"})}return null})},c=[t,a],e[1]=t,e[2]=a,e[3]=l,e[4]=c;else l=e[3],c=e[4];LQn.useEffect(l,c);let u;if(e[5]!==n||e[6]!==i||e[7]!==s)u=(m)=>{if(!s)return;let{pluginId:f,pluginName:A,shownAt:h}=s;logForDebugging(`[useLspPluginRecommendation] User response: ${m} for ${A}`);e:switch(m){case"yes":{PQn(f,A,"lsp-plugin",n,async(g)=>{logForDebugging(`[useLspPluginRecommendation] Installing plugin: ${f}`);let _=typeof g.entry.source==="string"?OQn.join(g.marketplaceInstallLocation,g.entry.source):void 0;await Cqt(f,g.entry,"user",void 0,_,void 0,void 0,g.marketplaceInstallLocation);let y=getSettingsForSource("userSettings");updateSettingsForSource("userSettings",{enabledPlugins:{...y?.enabledPlugins,[f]:!0}}),logForDebugging(`[useLspPluginRecommendation] Plugin installed: ${f}`)});break e}case"no":{let g=Date.now()-h;if(g>=f$m)logForDebugging(`[useLspPluginRecommendation] Timeout detected (${g}ms), incrementing ignored count`),gtc();break e}case"never":{htc(f);break e}case"disable":saveGlobalConfig(A$m)}i()},e[5]=n,e[6]=i,e[7]=s,e[8]=u;else u=e[8];let d=u,p;if(e[9]!==d||e[10]!==s)p={recommendation:s,handleResponse:d},e[9]=d,e[10]=s,e[11]=p;else p=e[11];return p}
function A$m(e){if(e.lspRecommendationDisabled)return e;return{...e,lspRecommendationDisabled:!0}}
function h$m(e){return e.fileHistory.trackedFiles}
var Ttc,OQn,LQn,f$m=28000;
var btc=b(()=>{lt();Ld();configProtoStore();Qn();qe();_tc();tue();yr();QMo();Ttc=M(rt(),1),OQn=require("path"),LQn=M(Te(),1)});
export {Stc,A$m,h$m,Ttc,OQn,LQn,f$m,btc};
