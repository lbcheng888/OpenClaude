// @ts-nocheck
import {b} from "../runtime.ts";
function OCi(e){if(!e)return 0;let t=0,n=oad;n.length=0,n.push(e);while(n.length>0){let r=n.pop();if(t++,r.alternate)t++;if(r.sibling)n.push(r.sibling);if(r.child)n.push(r.child)}return n.length=0,t}
function LCi(e){if(!e)return 0;let t=0,n=sad;n.length=0,n.push(e);while(n.length>0){let r=n.pop();if(t++,"childNodes"in r){let o=r.childNodes;for(let s=0;s<o.length;s++)n.push(o[s])}}return n.length=0,t}
var oad,sad;
var MCi=b(()=>{oad=[],sad=[]});
export {OCi,LCi,oad,sad,MCi};
