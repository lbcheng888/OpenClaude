// @ts-nocheck
import {getSessionProjectDir,getOriginalCwd,getSessionId,lt} from "../src/session/0132_sent.ts";
import {s2,VT} from "./m648.ts";
import {Js,rT} from "./m1294.ts";
import {TeamDeleteToolName,qt,tn} from "../src/config/0230_encoding.ts";
import {Jo,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function xac(e,t,n){let r=()=>{try{return t(e.getState())}catch{return!1}};if(r())return Promise.resolve(!0);return new Promise((o)=>{let s=setTimeout(()=>{i(),o(!1)},n.timeoutMs),i=e.subscribe(()=>{if(r())clearTimeout(s),i(),o(!0)})})}
function Dac(){let e=getSessionProjectDir()??s2(getOriginalCwd());return xyt.join(e,getSessionId(),"mcp-tasks")}
function Pac(e){return xyt.join(Dac(),`mcp-task-${e}.meta.json`)}
async function Oac(e,t){let n=Pac(e);await Js().mkdir(xyt.dirname(n)),await Js().write(n,TeamDeleteToolName(t))}
async function Lac(e){let t=Pac(e);try{await Js().delete(t)}catch(n){if(Jo(n))return;throw n}}
async function Mac(){let e=Dac(),t;try{t=await Js().list(e)}catch(r){if(Jo(r))return[];throw r}let n=[];for(let r of t){if(!r.endsWith(".meta.json"))continue;try{let o=await Js().read(xyt.join(e,r));n.push(qt(o))}catch(o){logForDebugging(`listMcpTaskMetadata: skipping ${r}: ${String(o)}`)}}return n}
var xyt;
var Nac=b(()=>{lt();rT();qe();Ct();VT();tn();xyt=require("path")});
export {xac,Dac,Pac,Oac,Lac,Mac,xyt,Nac};
