// @ts-nocheck
import {Q} from "../runtime.ts";
import {uYr} from "./m3050.ts";
import {wQi} from "./m3051.ts";
var HQi=Q((LXg,kQi)=>{var dYr=uYr(),zqd=wQi(),est={},jqd=Object.keys(dYr);function Yqd(e){let t=function(...n){let r=n[0];if(r===void 0||r===null)return r;if(r.length>1)n=r;return e(n)};if("conversion"in e)t.conversion=e.conversion;return t}function Jqd(e){let t=function(...n){let r=n[0];if(r===void 0||r===null)return r;if(r.length>1)n=r;let o=e(n);if(typeof o==="object")for(let s=o.length,i=0;i<s;i++)o[i]=Math.round(o[i]);return o};if("conversion"in e)t.conversion=e.conversion;return t}jqd.forEach((e)=>{est[e]={},Object.defineProperty(est[e],"channels",{value:dYr[e].channels}),Object.defineProperty(est[e],"labels",{value:dYr[e].labels});let t=zqd(e);Object.keys(t).forEach((r)=>{let o=t[r];est[e][r]=Jqd(o),est[e][r].raw=Yqd(o)})});kQi.exports=est});
export {HQi};
