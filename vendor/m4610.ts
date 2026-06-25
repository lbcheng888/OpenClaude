// @ts-nocheck
import {aJ,CL} from "./m4609.ts";
import {Ce,Ct} from "./m197.ts";
import {TeamDeleteToolName,qt,tn} from "../src/config/0230_encoding.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {zd,bL} from "./m4515.ts";
import {bgSupervisorNoun,daemonHint,fC} from "../src/config/2212_shouldShowLaunchComposer.ts";
import {BKn,YRo} from "./m4608.ts";
import {b} from "../runtime.ts";
async function AT(e,t){let n;try{n=$Kn.connect(aJ())}catch(u){return{ok:!1,code:"ENOCONN",error:Ce(u)}}let r=t?.timeoutMs??5000,o,s=new Promise((u)=>{o=u}),i=!1,a=(u)=>{if(i)return;i=!0,n.destroy(),o(u)};n.setTimeout(r,()=>a({ok:!1,code:"ETIMEOUT",error:"control socket timeout"})),n.on("error",(u)=>a({ok:!1,code:"ENOCONN",error:Ce(u)})),n.once("connect",()=>{n.write(TeamDeleteToolName(e)+`
`)});let l=new u_l.StringDecoder("utf8"),c="";return n.on("data",(u)=>{c+=l.write(u);let d=c.indexOf(`
`);if(d<0)return;let p=c.slice(0,d);try{a(qt(p))}catch(m){a({ok:!1,code:"ENOCONN",error:Ce(m)})}}),n.once("close",()=>{if(!i)a({ok:!1,code:"ENOCONN",error:"connection dropped mid-request \u2014 it may have restarted; retry"})}),s}
function qKn(e){let t={label:e,cwd:isTmuxControlMode(),pid:process.pid},n=!1,r=null,o=null,s=()=>{if(n)return;try{r=$Kn.connect(aJ())}catch{r=null,o=setTimeout(s,1000),o.unref();return}r.on("error",()=>r?.destroy()),r.once("connect",()=>r?.write(TeamDeleteToolName({proto:zd,op:"lease",client:t})+`
`)),r.on("data",()=>{}),r.once("close",()=>{if(r=null,n)return;o=setTimeout(s,1000),o.unref()}),r.unref()};return s(),()=>{if(n=!0,o)clearTimeout(o);r?.destroy()}}
function d_l(e,t,n,r){let o;try{o=$Kn.connect(aJ())}catch(c){return queueMicrotask(()=>r(Ce(c))),()=>{}}let s=!1,i=!1,a=(c)=>{if(s)return;s=!0,r(c)};o.setTimeout(1e4,()=>{if(!i)a(`${bgSupervisorNoun()} did not respond \u2014 it may be stalled${daemonHint("restart")}`),o.destroy()}),o.on("error",(c)=>a(Ce(c))),o.on("close",()=>a("control socket closed")),o.on("connect",()=>o.write(TeamDeleteToolName({proto:zd,op:"subscribe",short:e,tail:t})+`
`));let l=BKn(o,(c)=>{if(!i)i=!0,o.setTimeout(0);try{let u=qt(c);if("ok"in u&&u.ok===!1)a(u.error);else n(u)}catch{}});return()=>{s=!0,l(),o.destroy()}}
var $Kn,u_l;
var fue=b(()=>{fC();Po();Ct();tn();YRo();CL();bL();$Kn=require("net"),u_l=require("string_decoder")});
export {AT,qKn,d_l,$Kn,u_l,fue};
