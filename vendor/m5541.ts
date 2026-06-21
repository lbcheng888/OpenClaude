// @ts-nocheck
import {getSessionProjectDir,getOriginalCwd,getSessionId,lt} from "../src/session/0131_sent.ts";
import {N2,QT} from "./m642.ts";
import {ci,pT} from "./m1289.ts";
import {Le,qt,Xt} from "../src/config/0228_encoding.ts";
import {ds,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function WQl(){let e=getSessionProjectDir()??N2(getOriginalCwd());return dht.join(e,getSessionId(),"mcp-tasks")}
function GQl(e){return dht.join(WQl(),`mcp-task-${e}.meta.json`)}
async function VQl(e,t){let n=GQl(e);await ci().mkdir(dht.dirname(n)),await ci().write(n,Le(t))}
async function KQl(e){let t=GQl(e);try{await ci().delete(t)}catch(n){if(ds(n))return;throw n}}
async function zQl(){let e=WQl(),t;try{t=await ci().list(e)}catch(r){if(ds(r))return[];throw r}let n=[];for(let r of t){if(!r.endsWith(".meta.json"))continue;try{let o=await ci().read(dht.join(e,r));n.push(qt(o))}catch(o){logForDebugging(`listMcpTaskMetadata: skipping ${r}: ${String(o)}`)}}return n}
var dht;
var YQl=b(()=>{lt();pT();qe();bt();QT();Xt();dht=require("path")});
export {WQl,GQl,VQl,KQl,zQl,dht,YQl};
