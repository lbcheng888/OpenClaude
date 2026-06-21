// @ts-nocheck
import {X} from "../runtime.ts";
import {kGr} from "./m3040.ts";
import {OVi} from "./m3041.ts";
var MVi=X((Vqh,LVi)=>{var HGr=kGr(),p1d=OVi(),Jnt={},m1d=Object.keys(HGr);function f1d(e){let t=function(...n){let r=n[0];if(r===void 0||r===null)return r;if(r.length>1)n=r;return e(n)};if("conversion"in e)t.conversion=e.conversion;return t}function A1d(e){let t=function(...n){let r=n[0];if(r===void 0||r===null)return r;if(r.length>1)n=r;let o=e(n);if(typeof o==="object")for(let s=o.length,i=0;i<s;i++)o[i]=Math.round(o[i]);return o};if("conversion"in e)t.conversion=e.conversion;return t}m1d.forEach((e)=>{Jnt[e]={},Object.defineProperty(Jnt[e],"channels",{value:HGr[e].channels}),Object.defineProperty(Jnt[e],"labels",{value:HGr[e].labels});let t=p1d(e);Object.keys(t).forEach((r)=>{let o=t[r];Jnt[e][r]=A1d(o),Jnt[e][r].raw=f1d(o)})});LVi.exports=Jnt});
export {MVi};
