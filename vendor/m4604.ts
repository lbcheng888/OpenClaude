// @ts-nocheck
import {nSo,Q6,TDe} from "./m4603.ts";
import {jt,ws} from "./m228.ts";
import {qu,bk} from "./m2291.ts";
import {Ok,ab} from "../src/config/3178_path.ts";
import {wwe,fet,QK,K4} from "../src/session/2521_id.ts";
import {SQe,Mw} from "../src/config/2221_recursive.ts";
import {ySe,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
function wKp(e){return nSo(e)!==void 0}
function RG(e){let t=jt(),n=qu.get(process.stdout);if(!n)throw Error("Ink instance not found - cannot pause rendering");let r=Q6();if(!r)return{content:null};try{t.statSync(e)}catch{return{content:null}}let o=!wKp(r);if(o)n.enterAlternateScreen();else n.pause(),n.suspendStdin();try{let s=vKp[r]??r,i=s.split(" "),a=i[0]??s,l=i.slice(1),c;if(c=vul.spawnSync(a,[...l,e],{stdio:"inherit"}),c.error||c.signal||c.status!==null&&c.status!==0){let d=Ok(r);return{content:null,error:c.error?`Couldn't open ${d} \u2014 ${c.error.message}`:c.signal?`${d} closed unexpectedly (${c.signal})`:`${d} quit unexpectedly (exit code ${c.status})`}}return{content:t.readFileSync(e,{encoding:"utf-8"})}}catch{return{content:null}}finally{if(o)n.exitAlternateScreen();else n.resumeStdin(),n.resume()}}
function RKp(e,t,n){let r=e;for(let[o,s]of Object.entries(n))if(s.type==="text"){let i=parseInt(o),a=s.content,l=r.indexOf(a);if(l!==-1){let c=wwe(a),u=fet(i,c);r=r.slice(0,l)+u+r.slice(l+a.length)}}return r}
function xKp(e){let t=e.split(`
`);if(t.length>Cul)t=t.slice(-Cul),t.unshift("\u2026 (earlier output truncated)");return`# \u2500\u2500\u2500 Claude's last response (for reference; removed on save) \u2500\u2500\u2500
`+`${t.map((r)=>r?`# ${r}`:"#").join(`
`)}
${oSo}

`}
function kKp(e){let t=e.indexOf(oSo);if(t===-1)return e;return e.slice(t+oSo.length).replace(/^\r?\n\r?\n?/,"")}
function iM(e,t,n){let r=jt(),o=SQe();try{let s=t?QK(e,t):e,i=n?xKp(n)+s:s;ySe(o,i,{encoding:"utf-8",flush:!0});let a=RG(o);if(a.content===null)return a;let l=a.content;if(n)l=kKp(l);if(l.endsWith(`
`)&&!l.endsWith(`

`))l=l.slice(0,-1);if(t)l=RKp(l,e,t);return{content:l}}finally{try{r.unlinkSync(o)}catch{}}}
var vul,vKp,oSo="# \u2500\u2500\u2500 Write your reply below this line \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",Cul=50;
var q9=b(()=>{K4();bk();TDe();ws();ab();Xt();Mw();vul=require("child_process"),vKp={code:"code -w",subl:"subl --wait"}});
export {wKp,RG,RKp,xKp,kKp,iM,vul,vKp,oSo,Cul,q9};
