// @ts-nocheck
import {dKe,voe,Ibe,iQ,Dbe} from "./m736.ts";
import {jt,ws} from "./m228.ts";
import {Kns,Onn,kbe,zns,a1e} from "../src/config/0735_settings.ts";
import {f_,Kx} from "./m128.ts";
import {b} from "../runtime.ts";
function filterEscalatingDefaultMode(e){let t=e.effective.permissions?.defaultMode;if(!t||!Epm.has(t))return e.effective;for(let n=e.sources.length-1;n>=0;n--){let r=e.sources[n];if(r.settings.permissions?.defaultMode!==void 0){if(Cpm.has(r.source)){let{defaultMode:o,...s}=e.effective.permissions??{};return{...e.effective,permissions:s}}return e.effective}}return e.effective}
async function B0l(e={}){await dKe();let t={cwd:M0l.resolve(e.cwd??jt().cwd()),allowedSources:(e.settingSources??bpm).map((n)=>Spm[n]),parentManaged:e.managedSettings??null,flagInline:null,flagPath:void 0,mdm:voe,hkcu:Ibe,wslInherits:iQ,...e.serverManagedSettings!==void 0&&{remote:()=>e.serverManagedSettings}};try{let{effective:n,sources:r}=Kns(t),o=Onn(t)??void 0,s=r.map(({source:a,settings:l})=>({source:L0l[a],settings:l,path:a==="policySettings"?void 0:kbe(a,t),...a==="policySettings"&&{policyOrigin:o}})),i={};for(let a of Object.keys(n)){let l=zns(a,t);if(l)i[a]={source:L0l[l],path:l==="policySettings"?void 0:kbe(l,t),...l==="policySettings"&&{policyOrigin:o}}}return{effective:n,provenance:i,sources:s}}finally{f_()}}
var M0l,Spm,L0l,bpm,Epm,Cpm;
var F0l=b(()=>{ws();Dbe();Kx();a1e();M0l=require("path"),Spm={user:"userSettings",project:"projectSettings",local:"localSettings"},L0l={userSettings:"user",projectSettings:"project",localSettings:"local",flagSettings:"flag",policySettings:"managed"},bpm=["user","project","local"],Epm=new Set(["bypassPermissions","auto","acceptEdits"]),Cpm=new Set(["project"])});
export {filterEscalatingDefaultMode,B0l,M0l,Spm,L0l,bpm,Epm,Cpm,F0l};
