// @ts-nocheck
import {Q} from "../runtime.ts";
var d8s=Q((iwh,Uxr)=>{var u8s=Symbol();function Q9u(e,t,n){let r=t[u8s];if(r)return t.stat(e,(s,i)=>{if(s)return n(s);n(null,i.mtime,r)});let o=new Date(Math.ceil(Date.now()/1000)*1000+5);t.utimes(e,o,o,(s)=>{if(s)return n(s);t.stat(e,(i,a)=>{if(i)return n(i);let l=a.mtime.getTime()%1000===0?"s":"ms";Object.defineProperty(t,u8s,{value:l}),n(null,a.mtime,l)})})}function Z9u(e){let t=Date.now();if(e==="s")t=Math.ceil(t/1000)*1000;return new Date(t)}Uxr.exports.probe=Q9u;Uxr.exports.getMtime=Z9u});
export {d8s};
