// @ts-nocheck
import {b,x} from "../runtime.ts";
function jyr(e){let t=typeof e==="string"?`
`:`
`.charCodeAt(),n=typeof e==="string"?"\r":"\r".charCodeAt();if(e[e.length-1]===t)e=e.slice(0,-1);if(e[e.length-1]===n)e=e.slice(0,-1);return e}
function Zrn(e={}){let{env:t=process.env,platform:n="darwin"}=e;if(n!=="win32")return"PATH";return Object.keys(t).reverse().find((r)=>r.toUpperCase()==="PATH")||"Path"}
var iRt,xje,Yyr,ksu=({cwd:e=iRt.default.cwd(),path:t=iRt.default.env[Zrn()],preferLocal:n=!0,execPath:r=iRt.default.execPath,addExecPath:o=!0}={})=>{let s=e instanceof URL?Yyr.fileURLToPath(e):e,i=xje.default.resolve(s),a=[];if(n)Hsu(a,i);if(o)Isu(a,r,i);return[...a,t].join(xje.default.delimiter)},Hsu=(e,t)=>{let n;while(n!==t)e.push(xje.default.join(t,"node_modules/.bin")),n=t,t=xje.default.resolve(t,"..")},Isu=(e,t,n)=>{let r=t instanceof URL?Yyr.fileURLToPath(t):t;e.push(xje.default.resolve(n,r,".."))},Wos=({env:e=iRt.default.env,...t}={})=>{e={...e};let n=Zrn({env:e});return t.path=e[n],e[n]=ksu(t),e};
var Gos=b(()=>{iRt=x(require("process")),xje=x(require("path")),Yyr=require("url")});
export {jyr,Zrn,iRt,xje,Yyr,ksu,Hsu,Isu,Wos,Gos};
