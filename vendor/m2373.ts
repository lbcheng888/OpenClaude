// @ts-nocheck
import {H4r,GCn,Jki,Qki,I4r,Xki,fPt} from "./m2366.ts";
import {L4r,oHi} from "./m2372.ts";
import {b} from "../runtime.ts";
function Yhd(e,t){e=e.slice(t);for(let r=1;r<H4r.length;r++)if(e.charCodeAt(r)!==H4r[r])return;let n=e.indexOf("\x07",GCn.length);if(n===-1)return;return e.slice(0,n+1)}
function egd(e){for(let t=2;t<e.length;t++){let n=e.charCodeAt(t);if(n===Zhd)return t;if(n===Qhd)continue;if(n>=Jhd&&n<=Xhd)continue;break}return-1}
function tgd(e,t){e=e.slice(t);let n=egd(e);if(n===-1)return;return e.slice(0,n+1)}
function ngd(e){if(!e.includes(";"))return[e];let t=e.slice(2,-1).split(";"),n=[];for(let r=0;r<t.length;r++){let o=t[r];if(o==="38"||o==="48"){if(r+2<t.length&&t[r+1]==="5"){n.push(t.slice(r,r+3).join(";")),r+=2;continue}else if(r+4<t.length&&t[r+1]==="2"){n.push(t.slice(r,r+5).join(";")),r+=4;continue}}n.push(o)}return n.map((r)=>`\x1B[${r}m`)}
function utt(e,t=Number.POSITIVE_INFINITY){let n=[],r=0,o=0;while(r<e.length){let s=e.codePointAt(r);if(Jki.has(s)){let l,c=e.codePointAt(r+1);if(c===Qki){if(l=Yhd(e,r),l)n.push({type:"ansi",code:l,endCode:I4r(l)})}else if(c===Xki){if(l=tgd(e,r),l){let u=ngd(l);for(let d of u)n.push({type:"ansi",code:d,endCode:I4r(d)})}}if(l){r+=l.length;continue}}let i=L4r(s),a=String.fromCodePoint(s);if(n.push({type:"char",value:a,fullWidth:i}),r+=a.length,o+=i?2:a.length,o>=t)break}return n}
var Jhd=48,Xhd=57,Qhd=59,Zhd=109;
var sHi=b(()=>{oHi();fPt()});
export {Yhd,egd,tgd,ngd,utt,Jhd,Xhd,Qhd,Zhd,sHi};
