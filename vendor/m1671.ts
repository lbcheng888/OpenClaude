// @ts-nocheck
import {vYs,wYs,kYs} from "./m1670.ts";
import {b} from "../runtime.ts";
var ghn="1.21.0",HYs=3;
function M6u(e){let t=[];for(let[n,r]of e){let o=r?`${n}/${r}`:n;t.push(o)}return t.join(" ")}
function IYs(){return vYs()}
async function _hn(e){let t=new Map;t.set("core-rest-pipeline",ghn),await wYs(t);let n=M6u(t);return e?`${e} ${n}`:n}
var yOr=b(()=>{kYs()});
export {ghn,HYs,M6u,IYs,_hn,yOr};
