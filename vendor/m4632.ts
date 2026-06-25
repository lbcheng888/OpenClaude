// @ts-nocheck
import {gvo,T6,TPe} from "./m4631.ts";
import {Wt,ps} from "./m230.ts";
import {du,iw} from "./m2302.ts";
import {tH,uS} from "../src/config/3192_path.ts";
import {uwe,_nt,wz,J2} from "../src/session/2532_id.ts";
import {Eet,resolveToolAlias} from "../src/config/2229_observed_uid.ts";
import {eEe,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
function Hnm(e){return gvo(e)!==void 0}
function GG(e){let t=Wt(),n=du.get(process.stdout);if(!n)throw Error("Ink instance not found - cannot pause rendering");let r=T6();if(!r)return{content:null};try{t.statSync(e)}catch{return{content:null}}let o=!Hnm(r);if(o)n.enterAlternateScreen();else n.pause(),n.suspendStdin();try{let s=knm[r]??r,i=s.split(" "),a=i[0]??s,l=i.slice(1),c;if(c=ayl.spawnSync(a,[...l,e],{stdio:"inherit"}),c.error||c.signal||c.status!==null&&c.status!==0){let d=tH(r);return{content:null,error:c.error?`Couldn't open ${d} \u2014 ${c.error.message}`:c.signal?`${d} closed unexpectedly (${c.signal})`:`${d} quit unexpectedly (exit code ${c.status})`}}return{content:t.readFileSync(e,{encoding:"utf-8"})}}catch{return{content:null}}finally{if(o)n.exitAlternateScreen();else n.resumeStdin(),n.resume()}}
function Inm(e,t,n){let r=e;for(let[o,s]of Object.entries(n))if(s.type==="text"){let i=parseInt(o),a=s.content,l=r.indexOf(a);if(l!==-1){let c=uwe(a),u=_nt(i,c);r=r.slice(0,l)+u+r.slice(l+a.length)}}return r}
function xnm(e){let t=e.split(`
`);if(t.length>iyl)t=t.slice(-iyl),t.unshift("\u2026 (earlier output truncated)");return`# \u2500\u2500\u2500 Claude's last response (for reference; removed on save) \u2500\u2500\u2500
`+`${t.map((r)=>r?`# ${r}`:"#").join(`
`)}
${yvo}

`}
function Dnm(e){let t=e.indexOf(yvo);if(t===-1)return e;return e.slice(t+yvo.length).replace(/^\r?\n\r?\n?/,"")}
function AL(e,t,n){let r=Wt(),o=Eet();try{let s=t?wz(e,t):e,i=n?xnm(n)+s:s;eEe(o,i,{encoding:"utf-8",flush:!0});let a=GG(o);if(a.content===null)return a;let l=a.content;if(n)l=Dnm(l);if(l.endsWith(`
`)&&!l.endsWith(`

`))l=l.slice(0,-1);if(t)l=Inm(l,e,t);return{content:l}}finally{try{r.unlinkSync(o)}catch{}}}
var ayl,knm,yvo="# \u2500\u2500\u2500 Write your reply below this line \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",iyl=50;
var d9=b(()=>{J2();iw();TPe();ps();uS();tn();resolveToolAlias();ayl=require("child_process"),knm={code:"code -w",subl:"subl --wait"}});
export {Hnm,GG,Inm,xnm,Dnm,AL,ayl,knm,yvo,iyl,d9};
