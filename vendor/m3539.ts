// @ts-nocheck
import {X} from "../runtime.ts";
var _ga=X((gga)=>{var VZr=gga,hga=VZr.isAbsolute=function(t){return/^(?:\/|\w+:)/.test(t)},GZr=VZr.normalize=function(t){t=t.replace(/\\/g,"/").replace(/\/{2,}/g,"/");var n=t.split("/"),r=hga(t),o="";if(r)o=n.shift()+"/";for(var s=0;s<n.length;)if(n[s]==="..")if(s>0&&n[s-1]!=="..")n.splice(--s,2);else if(r)n.splice(s,1);else++s;else if(n[s]===".")n.splice(s,1);else++s;return o+n.join("/")};VZr.resolve=function(t,n,r){if(!r)n=GZr(n);if(hga(n))return n;if(!r)t=GZr(t);return(t=t.replace(/(?:\/|^)[^/]+$/,"")).length?GZr(t+"/"+n):n}});
export {_ga};
