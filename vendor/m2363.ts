// @ts-nocheck
import {XUr,oSn,Ubi,qbi,QUr,$bi,BIt} from "./m2356.ts";
import {r2r,zbi} from "./m2362.ts";
import {b} from "../runtime.ts";
function Csd(e,t){e=e.slice(t);for(let r=1;r<XUr.length;r++)if(e.charCodeAt(r)!==XUr[r])return;let n=e.indexOf("\x07",oSn.length);if(n===-1)return;return e.slice(0,n+1)}
function ksd(e){for(let t=2;t<e.length;t++){let n=e.charCodeAt(t);if(n===xsd)return t;if(n===Rsd)continue;if(n>=vsd&&n<=wsd)continue;break}return-1}
function Hsd(e,t){e=e.slice(t);let n=ksd(e);if(n===-1)return;return e.slice(0,n+1)}
function Isd(e){if(!e.includes(";"))return[e];let t=e.slice(2,-1).split(";"),n=[];for(let r=0;r<t.length;r++){let o=t[r];if(o==="38"||o==="48"){if(r+2<t.length&&t[r+1]==="5"){n.push(t.slice(r,r+3).join(";")),r+=2;continue}else if(r+4<t.length&&t[r+1]==="2"){n.push(t.slice(r,r+5).join(";")),r+=4;continue}}n.push(o)}return n.map((r)=>`\x1B[${r}m`)}
function uZe(e,t=Number.POSITIVE_INFINITY){let n=[],r=0,o=0;while(r<e.length){let s=e.codePointAt(r);if(Ubi.has(s)){let l,c=e.codePointAt(r+1);if(c===qbi){if(l=Csd(e,r),l)n.push({type:"ansi",code:l,endCode:QUr(l)})}else if(c===$bi){if(l=Hsd(e,r),l){let u=Isd(l);for(let d of u)n.push({type:"ansi",code:d,endCode:QUr(d)})}}if(l){r+=l.length;continue}}let i=r2r(s),a=String.fromCodePoint(s);if(n.push({type:"char",value:a,fullWidth:i}),r+=a.length,o+=i?2:a.length,o>=t)break}return n}
var vsd=48,wsd=57,Rsd=59,xsd=109;
var Ybi=b(()=>{zbi();BIt()});
export {Csd,ksd,Hsd,Isd,uZe,vsd,wsd,Rsd,xsd,Ybi};
