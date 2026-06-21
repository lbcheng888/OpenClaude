// @ts-nocheck
import {bJ,sM} from "./m4581.ts";
import {Se,bt} from "./m195.ts";
import {Le,qt,Xt} from "../src/config/0228_encoding.ts";
import {Pt,Go} from "./m632.ts";
import {Cp,rM} from "./m4493.ts";
import {bgSupervisorNoun,daemonHint,bv} from "../src/config/2204_shouldShowLaunchComposer.ts";
import {s5n,MTo} from "./m4580.ts";
import {b} from "../runtime.ts";
async function OT(e,t){let n;try{n=a5n.connect(bJ())}catch(u){return{ok:!1,code:"ENOCONN",error:Se(u)}}let r=t?.timeoutMs??5000,o,s=new Promise((u)=>{o=u}),i=!1,a=(u)=>{if(i)return;i=!0,n.destroy(),o(u)};n.setTimeout(r,()=>a({ok:!1,code:"ETIMEOUT",error:"control socket timeout"})),n.on("error",(u)=>a({ok:!1,code:"ENOCONN",error:Se(u)})),n.once("connect",()=>{n.write(Le(e)+`
`)});let l=new kcl.StringDecoder("utf8"),c="";return n.on("data",(u)=>{c+=l.write(u);let d=c.indexOf(`
`);if(d<0)return;let p=c.slice(0,d);try{a(qt(p))}catch(m){a({ok:!1,code:"ENOCONN",error:Se(m)})}}),n.once("close",()=>{if(!i)a({ok:!1,code:"ENOCONN",error:"connection dropped mid-request \u2014 it may have restarted; retry"})}),s}
function l5n(e){let t={label:e,cwd:Pt(),pid:process.pid},n=!1,r=null,o=null,s=()=>{if(n)return;try{r=a5n.connect(bJ())}catch{r=null,o=setTimeout(s,1000),o.unref();return}r.on("error",()=>r?.destroy()),r.once("connect",()=>r?.write(Le({proto:Cp,op:"lease",client:t})+`
`)),r.on("data",()=>{}),r.once("close",()=>{if(r=null,n)return;o=setTimeout(s,1000),o.unref()}),r.unref()};return s(),()=>{if(n=!0,o)clearTimeout(o);r?.destroy()}}
function Hcl(e,t,n,r){let o;try{o=a5n.connect(bJ())}catch(c){return queueMicrotask(()=>r(Se(c))),()=>{}}let s=!1,i=!1,a=(c)=>{if(s)return;s=!0,r(c)};o.setTimeout(1e4,()=>{if(!i)a(`${bgSupervisorNoun()} did not respond \u2014 it may be stalled${daemonHint("restart")}`),o.destroy()}),o.on("error",(c)=>a(Se(c))),o.on("close",()=>a("control socket closed")),o.on("connect",()=>o.write(Le({proto:Cp,op:"subscribe",short:e,tail:t})+`
`));let l=s5n(o,(c)=>{if(!i)i=!0,o.setTimeout(0);try{let u=qt(c);if("ok"in u&&u.ok===!1)a(u.error);else n(u)}catch{}});return()=>{s=!0,l(),o.destroy()}}
var a5n,kcl;
var gue=b(()=>{bv();Go();bt();Xt();MTo();sM();rM();a5n=require("net"),kcl=require("string_decoder")});
export {OT,l5n,Hcl,a5n,kcl,gue};
