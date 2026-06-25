// @ts-nocheck
import {b} from "../runtime.ts";
function qCn(e,t={},n,r=[]){let o=e.textStyles?{...t,...e.textStyles}:t;for(let s of e.childNodes){if(s===void 0)continue;if(s.nodeName==="#text"){if(s.nodeValue.length>0)r.push({text:s.nodeValue,styles:o,hyperlink:n})}else if(s.nodeName==="ink-text"||s.nodeName==="ink-virtual-text")qCn(s,o,n,r);else if(s.nodeName==="ink-link"){let i=s.attributes.href;qCn(s,o,i||n,r)}}return r}
function R4r(e){let t="";for(let n of e.childNodes){if(n===void 0)continue;if(n.nodeName==="#text")t+=n.nodeValue;else if(n.nodeName==="ink-text"||n.nodeName==="ink-virtual-text")t+=R4r(n);else if(n.nodeName==="ink-link")t+=R4r(n)}return t}
var Gki;
var v4r=b(()=>{Gki=R4r});
export {qCn,R4r,Gki,v4r};
