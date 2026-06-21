// @ts-nocheck
import {b} from "../runtime.ts";
function nSn(e,t={},n,r=[]){let o=e.textStyles?{...t,...e.textStyles}:t;for(let s of e.childNodes){if(s===void 0)continue;if(s.nodeName==="#text"){if(s.nodeValue.length>0)r.push({text:s.nodeValue,styles:o,hyperlink:n})}else if(s.nodeName==="ink-text"||s.nodeName==="ink-virtual-text")nSn(s,o,n,r);else if(s.nodeName==="ink-link"){let i=s.attributes.href;nSn(s,o,i||n,r)}}return r}
function KUr(e){let t="";for(let n of e.childNodes){if(n===void 0)continue;if(n.nodeName==="#text")t+=n.nodeValue;else if(n.nodeName==="ink-text"||n.nodeName==="ink-virtual-text")t+=KUr(n);else if(n.nodeName==="ink-link")t+=KUr(n)}return t}
var Obi;
var zUr=b(()=>{Obi=KUr});
export {nSn,KUr,Obi,zUr};
