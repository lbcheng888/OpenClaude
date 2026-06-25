// @ts-nocheck
import {cYe,Coe,mCe,rQ,fCe} from "./m741.ts";
import {Wt,ps} from "./m230.ts";
import {$ls,_sn,dCe,qls,eNe} from "../src/config/0740_settings.ts";
import {C_,lk} from "./m125.ts";
import {b} from "../runtime.ts";
function filterEscalatingDefaultMode(e){let t=e.effective.permissions?.defaultMode;if(!t||!Obm.has(t))return e.effective;for(let n=e.sources.length-1;n>=0;n--){let r=e.sources[n];if(r.settings.permissions?.defaultMode!==void 0){if(Lbm.has(r.source)){let{defaultMode:o,...s}=e.effective.permissions??{};return{...e.effective,permissions:s}}return e.effective}}return e.effective}
async function pBl(e={}){await cYe();let t={cwd:uBl.resolve(e.cwd??Wt().cwd()),allowedSources:(e.settingSources??Pbm).map((n)=>Dbm[n]),parentManaged:e.managedSettings??null,flagInline:null,flagPath:void 0,mdm:Coe,hkcu:mCe,wslInherits:rQ,...e.serverManagedSettings!==void 0&&{remote:()=>e.serverManagedSettings}};try{let{effective:n,sources:r}=$ls(t),o=_sn(t)??void 0,s=r.map(({source:a,settings:l})=>({source:cBl[a],settings:l,path:a==="policySettings"?void 0:dCe(a,t),...a==="policySettings"&&{policyOrigin:o}})),i={};for(let a of Object.keys(n)){let l=qls(a,t);if(l)i[a]={source:cBl[l],path:l==="policySettings"?void 0:dCe(l,t),...l==="policySettings"&&{policyOrigin:o}}}return{effective:n,provenance:i,sources:s}}finally{C_()}}
var uBl,Dbm,cBl,Pbm,Obm,Lbm;
var mBl=b(()=>{ps();fCe();lk();eNe();uBl=require("path"),Dbm={user:"userSettings",project:"projectSettings",local:"localSettings"},cBl={userSettings:"user",projectSettings:"project",localSettings:"local",flagSettings:"flag",policySettings:"managed"},Pbm=["user","project","local"],Obm=new Set(["bypassPermissions","auto","acceptEdits"]),Lbm=new Set(["project"])});
export {filterEscalatingDefaultMode,pBl,uBl,Dbm,cBl,Pbm,Obm,Lbm,mBl};
