// @ts-nocheck
import {Kc,tv} from "./m232.ts";
import {zt,qs} from "./m635.ts";
import {Pn,bt} from "./m195.ts";
import {b} from "../runtime.ts";
async function kuc(e){let t=process.stdout.isTTY,n=await cOe.stat(e).then((s)=>s.size).catch(()=>0);if(n>Ruc)await KNo(e),n=0;let r=GNo(e),o=!1;return{write(s,i){let a=`[${new Date().toISOString()}] [${s}] ${Kc(i)}
`;if(n+=Buffer.byteLength(a),r.write(a),t)process.stdout.write(a);if(n>Ruc&&!o){o=!0;let l=r;(async()=>{if(zt()==="windows")await VNo(l),await KNo(e),r=GNo(e);else await KNo(e),r=GNo(e),await VNo(l);n=0,o=!1})().catch(()=>{o=!1})}},close(){return VNo(r)}}}
function GNo(e){let t=xuc.createWriteStream(e,{flags:"a"});return t.on("error",()=>{}),t}
function VNo(e){return new Promise((t)=>e.end(()=>t()))}
async function KNo(e){let t=`${e}.1`;try{await cOe.rename(e,t)}catch(n){if(Pn(n))return;await cOe.unlink(t).catch(()=>{}),await cOe.rename(e,t).catch(()=>cOe.unlink(e).catch(()=>{}))}}
var xuc,cOe,Ruc=10485760;
var Huc=b(()=>{bt();qs();tv();xuc=require("fs"),cOe=require("fs/promises")});
export {kuc,GNo,VNo,KNo,xuc,cOe,Ruc,Huc};
