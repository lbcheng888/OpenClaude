// @ts-nocheck
import {b} from "../runtime.ts";
function zIi(e){if(!e)return 0;let t=0,n=H_d;n.length=0,n.push(e);while(n.length>0){let r=n.pop();if(t++,r.alternate)t++;if(r.sibling)n.push(r.sibling);if(r.child)n.push(r.child)}return n.length=0,t}
function jIi(e){if(!e)return 0;let t=0,n=I_d;n.length=0,n.push(e);while(n.length>0){let r=n.pop();if(t++,"childNodes"in r){let o=r.childNodes;for(let s=0;s<o.length;s++)n.push(o[s])}}return n.length=0,t}
var H_d,I_d;
var YIi=b(()=>{H_d=[],I_d=[]});
export {zIi,jIi,H_d,I_d,YIi};
