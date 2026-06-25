// @ts-nocheck
import {kc,aA} from "./m234.ts";
import {Yt,Es} from "./m641.ts";
import {In,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
async function MSc(e){let t=process.stdout.isTTY,n=await uLe.stat(e).then((s)=>s.size).catch(()=>0);if(n>OSc)await U9o(e),n=0;let r=F9o(e),o=!1;return{write(s,i){let a=`[${new Date().toISOString()}] [${s}] ${kc(i)}
`;if(n+=Buffer.byteLength(a),r.write(a),t)process.stdout.write(a);if(n>OSc&&!o){o=!0;let l=r;(async()=>{if(Yt()==="windows")await B9o(l),await U9o(e),r=F9o(e);else await U9o(e),r=F9o(e),await B9o(l);n=0,o=!1})().catch(()=>{o=!1})}},close(){return B9o(r)}}}
function F9o(e){let t=LSc.createWriteStream(e,{flags:"a"});return t.on("error",()=>{}),t}
function B9o(e){return new Promise((t)=>e.end(()=>t()))}
async function U9o(e){let t=`${e}.1`;try{await uLe.rename(e,t)}catch(n){if(In(n))return;await uLe.unlink(t).catch(()=>{}),await uLe.rename(e,t).catch(()=>uLe.unlink(e).catch(()=>{}))}}
var LSc,uLe,OSc=10485760;
var NSc=b(()=>{Ct();Es();aA();LSc=require("fs"),uLe=require("fs/promises")});
export {MSc,F9o,B9o,U9o,LSc,uLe,OSc,NSc};
