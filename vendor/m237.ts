// @ts-nocheck
import {tn,Hc} from "./m235.ts";
import {KT,KI} from "./m234.ts";
import {b} from "../runtime.ts";
import {ope} from "./m236.ts";
function truncatePathMiddle(e,t){if(tn(e)<=t)return e;if(t<=0)return"\u2026";if(t<5)return truncateToWidth(e,t);let n=e.lastIndexOf("/"),r=n>=0?e.slice(n):e,o=n>=0?e.slice(0,n):"",s=tn(r);if(s>=t-1)return truncateStartToWidth(e,t);let i=t-1-s;return truncateToWidthNoEllipsis(o,i)+"\u2026"+r}
function truncateToWidth(e,t){if(tn(e)<=t)return e;if(t<=1)return"\u2026";let n=0,r="";for(let{segment:o}of KT().segment(e)){let s=tn(o);if(n+s>t-1)break;r+=o,n+=s}return r+"\u2026"}
function truncateStartToWidth(e,t){if(tn(e)<=t)return e;if(t<=1)return"\u2026";let n=[...KT().segment(e)],r=0,o=n.length;for(let s=n.length-1;s>=0;s--){let i=tn(n[s].segment);if(r+i>t-1)break;r+=i,o=s}return"\u2026"+n.slice(o).map((s)=>s.segment).join("")}
function truncateToWidthNoEllipsis(e,t){if(tn(e)<=t)return e;if(t<=0)return"";let n=0,r="";for(let{segment:o}of KT().segment(e)){let s=tn(o);if(n+s>t)break;r+=o,n+=s}return r}
function truncate(e,t,n=!1){let r=e;if(n){let o=e.indexOf(`
`);if(o!==-1){if(r=e.substring(0,o),tn(r)+1>t)return truncateToWidth(r,t);return`${r}\u2026`}}if(tn(r)<=t)return r;return truncateToWidth(r,t)}
function wrapText(e,t){let n=[],r="",o=0;for(let{segment:s}of KT().segment(e)){let i=tn(s);if(o+i<=t)r+=s,o+=i;else{if(r)n.push(r);r=s,o=i}}if(r)n.push(r);return n}
var EH=b(()=>{Hc();ope();KI()});
export {truncatePathMiddle,truncateToWidth,truncateStartToWidth,truncateToWidthNoEllipsis,truncate,wrapText,EH};
