// @ts-nocheck
import {tMt,C$e,A$e,Hrt} from "./m2689.ts";
import {b} from "../runtime.ts";
function gQp(e){let t=tMt(e),n=Math.min(t.length,C$e());return 2+e.name.length+2+n+1}
function iRo(e,t,n){let r=new Map;for(let c of e){if(c.type!=="prompt"||c.disableModelInvocation)continue;let u=c.pluginInfo?.pluginManifest.name;if(!u)continue;let d=gQp(c),p=r.get(u)??[];p.push({name:c.name,chars:d,approxTokens:Math.round(d/t)}),r.set(u,p)}let o=[...r.entries()].map(([c,u])=>{u.sort((p,m)=>m.chars-p.chars);let d=u.reduce((p,m)=>p+m.chars,0);return{pluginName:c,skillCount:u.length,chars:d,approxTokens:Math.round(d/t),skills:u}}).sort((c,u)=>u.chars-c.chars),s=o.reduce((c,u)=>c+u.chars,0),i=A$e(n,t),a=s>i,l=a?i:s;return{byPlugin:o,totalChars:l,totalTokens:Math.round(l/t),overBudget:a,budgetTokens:Math.round(i/t)}}
var aRo=b(()=>{Hrt()});
export {gQp,iRo,aRo};
