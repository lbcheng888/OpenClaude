// @ts-nocheck
import {b} from "../runtime.ts";
import {qs,zt} from "./m635.ts";
function qkt(e=CMr){return`http://localhost:${e}/callback`}
function fVu(){let e=parseInt(process.env.MCP_OAUTH_CALLBACK_PORT||"",10);return e>0?e:void 0}
async function khn(e){let t=fVu();if(t)return t;if(e&&await EMr(e))return e;let{min:n,max:r}=mVu,o=r-n+1,s=Math.min(o,100);for(let i=0;i<s;i++){let a=n+Math.floor(Math.random()*o);if(await EMr(a))return a}if(await EMr(CMr))return CMr;throw Error("No available ports for OAuth redirect")}
async function EMr(e){try{return await new Promise((t,n)=>{let r=Pni.createServer();r.once("error",n),r.listen(e,"127.0.0.1",()=>{r.close(()=>t())})}),!0}catch{return!1}}
var Pni,mVu,CMr=3118;
var vMr=b(()=>{qs();Pni=require("http"),mVu=zt()==="windows"?{min:39152,max:49151}:{min:49152,max:65535}});
export {qkt,fVu,khn,EMr,Pni,mVu,CMr,vMr};
