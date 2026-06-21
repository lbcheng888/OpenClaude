// @ts-nocheck
import {IWs,DWs,PWs} from "./m1665.ts";
import {b} from "../runtime.ts";
var Opn="1.21.0",OWs=3;
function gNu(e){let t=[];for(let[n,r]of e){let o=r?`${n}/${r}`:n;t.push(o)}return t.join(" ")}
function LWs(){return IWs()}
async function Lpn(e){let t=new Map;t.set("core-rest-pipeline",Opn),await DWs(t);let n=gNu(t);return e?`${e} ${n}`:n}
var qHr=b(()=>{PWs()});
export {Opn,OWs,gNu,LWs,Lpn,qHr};
