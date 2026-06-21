// @ts-nocheck
import {X} from "../runtime.ts";
var h9s=X((BfA,uxr)=>{var A9s=Symbol();function POu(e,t,n){let r=t[A9s];if(r)return t.stat(e,(s,i)=>{if(s)return n(s);n(null,i.mtime,r)});let o=new Date(Math.ceil(Date.now()/1000)*1000+5);t.utimes(e,o,o,(s)=>{if(s)return n(s);t.stat(e,(i,a)=>{if(i)return n(i);let l=a.mtime.getTime()%1000===0?"s":"ms";Object.defineProperty(t,A9s,{value:l}),n(null,a.mtime,l)})})}function OOu(e){let t=Date.now();if(e==="s")t=Math.ceil(t/1000)*1000;return new Date(t)}uxr.exports.probe=POu;uxr.exports.getMtime=OOu});
export {h9s};
