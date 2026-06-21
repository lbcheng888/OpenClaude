// @ts-nocheck
import {X} from "../runtime.ts";
import {vVi} from "./m3036.ts";
import {xGr} from "./m3038.ts";
import {qVi} from "./m3043.ts";
var GVi=X((zqh,WVi)=>{var vLt=vVi(),g1d=xGr(),_1d=qVi(),PGr=new Set(["\x1B","\x9B"]),jVi=(e)=>`${PGr.values().next().value}[${e}m`,y1d=(e)=>e.split(" ").map((t)=>vLt(t)),DGr=(e,t,n)=>{let r=[...t],o=!1,s=vLt(g1d(e[e.length-1]));for(let[i,a]of r.entries()){let l=vLt(a);if(s+l<=n)e[e.length-1]+=a;else e.push(a),s=0;if(PGr.has(a))o=!0;else if(o&&a==="m"){o=!1;continue}if(o)continue;if(s+=l,s===n&&i<r.length-1)e.push(""),s=0}if(!s&&e[e.length-1].length>0&&e.length>1)e[e.length-2]+=e.pop()},T1d=(e)=>{let t=e.split(" "),n=t.length;while(n>0){if(vLt(t[n-1])>0)break;n--}if(n===t.length)return e;return t.slice(0,n).join(" ")+t.slice(n).join("")},S1d=(e,t,n={})=>{if(n.trim!==!1&&e.trim()==="")return"";let r="",o="",s,i=y1d(e),a=[""];for(let[l,c]of e.split(" ").entries()){if(n.trim!==!1)a[a.length-1]=a[a.length-1].trimLeft();let u=vLt(a[a.length-1]);if(l!==0){if(u>=t&&(n.wordWrap===!1||n.trim===!1))a.push(""),u=0;if(u>0||n.trim===!1)a[a.length-1]+=" ",u++}if(n.hard&&i[l]>t){let d=t-u,p=1+Math.floor((i[l]-d-1)/t);if(Math.floor((i[l]-1)/t)<p)a.push("");DGr(a,c,t);continue}if(u+i[l]>t&&u>0&&i[l]>0){if(n.wordWrap===!1&&u<t){DGr(a,c,t);continue}a.push("")}if(u+i[l]>t&&n.wordWrap===!1){DGr(a,c,t);continue}a[a.length-1]+=c}if(n.trim!==!1)a=a.map(T1d);r=a.join(`
`);for(let[l,c]of[...r].entries()){if(o+=c,PGr.has(c)){let d=parseFloat(/\d[^m]*/.exec(r.slice(l,l+4)));s=d===39?null:d}let u=_1d.codes.get(Number(s));if(s&&u){if(r[l+1]===`
`)o+=jVi(u);else if(c===`
`)o+=jVi(s)}}return o};WVi.exports=(e,t,n)=>String(e).normalize().replace(/\r\n/g,`
`).split(`
`).map((r)=>S1d(r,t,n)).join(`
`)});
export {GVi};
