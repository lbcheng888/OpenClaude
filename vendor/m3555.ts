// @ts-nocheck
import {Q} from "../runtime.ts";
var PAa=Q((DAa)=>{var koo=DAa,xAa=koo.isAbsolute=function(t){return/^(?:\/|\w+:)/.test(t)},woo=koo.normalize=function(t){t=t.replace(/\\/g,"/").replace(/\/{2,}/g,"/");var n=t.split("/"),r=xAa(t),o="";if(r)o=n.shift()+"/";for(var s=0;s<n.length;)if(n[s]==="..")if(s>0&&n[s-1]!=="..")n.splice(--s,2);else if(r)n.splice(s,1);else++s;else if(n[s]===".")n.splice(s,1);else++s;return o+n.join("/")};koo.resolve=function(t,n,r){if(!r)n=woo(n);if(xAa(n))return n;if(!r)t=woo(t);return(t=t.replace(/(?:\/|^)[^/]+$/,"")).length?woo(t+"/"+n):n}});
export {PAa};
