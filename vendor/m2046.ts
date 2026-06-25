// @ts-nocheck
import {b} from "../runtime.ts";
import {Es,Yt} from "./m641.ts";
function hxt(e=QBr){return`http://localhost:${e}/callback`}
function Ptd(){let e=parseInt(process.env.MCP_OAUTH_CALLBACK_PORT||"",10);return e>0?e:void 0}
async function cTn(e){let t=Ptd();if(t)return t;if(e&&await XBr(e))return e;let{min:n,max:r}=Dtd,o=r-n+1,s=Math.min(o,100);for(let i=0;i<s;i++){let a=n+Math.floor(Math.random()*o);if(await XBr(a))return a}if(await XBr(QBr))return QBr;throw Error("No available ports for OAuth redirect")}
async function XBr(e){try{return await new Promise((t,n)=>{let r=kli.createServer();r.once("error",n),r.listen(e,"127.0.0.1",()=>{r.close(()=>t())})}),!0}catch{return!1}}
var kli,Dtd,QBr=3118;
var ZBr=b(()=>{Es();kli=require("http"),Dtd=Yt()==="windows"?{min:39152,max:49151}:{min:49152,max:65535}});
export {hxt,Ptd,cTn,XBr,kli,Dtd,QBr,ZBr};
