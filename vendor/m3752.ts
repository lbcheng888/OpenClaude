// @ts-nocheck
import {useApp} from "./m2442.ts";
import {render,ze} from "./m2452.ts";
import {OSn,F4} from "./m2416.ts";
import {Ec} from "./m2449.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Zup(){}
function dy(e){let t=bwa.c(5),{children:n}=e,{exit:r}=useApp(),o,s;if(t[0]!==r)o=()=>{let a=setTimeout(r,0);return()=>clearTimeout(a)},s=[r],t[0]=r,t[1]=o,t[2]=s;else o=t[1],s=t[2];Ewa.useLayoutEffect(o,s);let i;if(t[3]!==n)i=Wle.createElement(Wle.Fragment,null,n),t[3]=n,t[4]=i;else i=t[4];return i}
async function hat(e,t){let n="",r=!1,o=new Cwa.PassThrough;if(t!==void 0)o.columns=t;return o.on("data",(i)=>{if(r)return;r=!0,n=i.toString()}),await(await render(Wle.createElement(dy,null,Wle.createElement(OSn,{value:Zup},e)),{stdout:o,patchConsole:!1})).waitUntilExit(),n}
async function vwa(e,t){let n=await hat(e,t);return Ec(n)}
var bwa,Wle,Ewa,Cwa;
var _He=b(()=>{F4();ze();bwa=M(rt(),1),Wle=M(Te(),1),Ewa=M(Te(),1),Cwa=require("stream")});
export {Zup,dy,hat,vwa,bwa,Wle,Ewa,Cwa,_He};
