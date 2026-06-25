// @ts-nocheck
import {Q} from "../runtime.ts";
import {yQi} from "./m3046.ts";
import {cYr} from "./m3048.ts";
import {LQi} from "./m3053.ts";
var FQi=Q((NXg,NQi)=>{var Z1t=yQi(),Qqd=cYr(),Zqd=LQi(),fYr=new Set(["\x1B","\x9B"]),MQi=(e)=>`${fYr.values().next().value}[${e}m`,e6d=(e)=>e.split(" ").map((t)=>Z1t(t)),mYr=(e,t,n)=>{let r=[...t],o=!1,s=Z1t(Qqd(e[e.length-1]));for(let[i,a]of r.entries()){let l=Z1t(a);if(s+l<=n)e[e.length-1]+=a;else e.push(a),s=0;if(fYr.has(a))o=!0;else if(o&&a==="m"){o=!1;continue}if(o)continue;if(s+=l,s===n&&i<r.length-1)e.push(""),s=0}if(!s&&e[e.length-1].length>0&&e.length>1)e[e.length-2]+=e.pop()},t6d=(e)=>{let t=e.split(" "),n=t.length;while(n>0){if(Z1t(t[n-1])>0)break;n--}if(n===t.length)return e;return t.slice(0,n).join(" ")+t.slice(n).join("")},n6d=(e,t,n={})=>{if(n.trim!==!1&&e.trim()==="")return"";let r="",o="",s,i=e6d(e),a=[""];for(let[l,c]of e.split(" ").entries()){if(n.trim!==!1)a[a.length-1]=a[a.length-1].trimLeft();let u=Z1t(a[a.length-1]);if(l!==0){if(u>=t&&(n.wordWrap===!1||n.trim===!1))a.push(""),u=0;if(u>0||n.trim===!1)a[a.length-1]+=" ",u++}if(n.hard&&i[l]>t){let d=t-u,p=1+Math.floor((i[l]-d-1)/t);if(Math.floor((i[l]-1)/t)<p)a.push("");mYr(a,c,t);continue}if(u+i[l]>t&&u>0&&i[l]>0){if(n.wordWrap===!1&&u<t){mYr(a,c,t);continue}a.push("")}if(u+i[l]>t&&n.wordWrap===!1){mYr(a,c,t);continue}a[a.length-1]+=c}if(n.trim!==!1)a=a.map(t6d);r=a.join(`
`);for(let[l,c]of[...r].entries()){if(o+=c,fYr.has(c)){let d=parseFloat(/\d[^m]*/.exec(r.slice(l,l+4)));s=d===39?null:d}let u=Zqd.codes.get(Number(s));if(s&&u){if(r[l+1]===`
`)o+=MQi(u);else if(c===`
`)o+=MQi(s)}}return o};NQi.exports=(e,t,n)=>String(e).normalize().replace(/\r\n/g,`
`).split(`
`).map((r)=>n6d(r,t,n)).join(`
`)});
export {FQi};
