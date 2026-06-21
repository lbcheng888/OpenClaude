// @ts-nocheck
import {b,M} from "../runtime.ts";
function yfr(e){let t=typeof e==="string"?`
`:`
`.charCodeAt(),n=typeof e==="string"?"\r":"\r".charCodeAt();if(e[e.length-1]===t)e=e.slice(0,-1);if(e[e.length-1]===n)e=e.slice(0,-1);return e}
function _tn(e={}){let{env:t=process.env,platform:n="darwin"}=e;if(n!=="win32")return"PATH";return Object.keys(t).reverse().find((r)=>r.toUpperCase()==="PATH")||"Path"}
var Obt,O7e,Tfr,dYc=({cwd:e=Obt.default.cwd(),path:t=Obt.default.env[_tn()],preferLocal:n=!0,execPath:r=Obt.default.execPath,addExecPath:o=!0}={})=>{let s=e instanceof URL?Tfr.fileURLToPath(e):e,i=O7e.default.resolve(s),a=[];if(n)pYc(a,i);if(o)mYc(a,r,i);return[...a,t].join(O7e.default.delimiter)},pYc=(e,t)=>{let n;while(n!==t)e.push(O7e.default.join(t,"node_modules/.bin")),n=t,t=O7e.default.resolve(t,"..")},mYc=(e,t,n)=>{let r=t instanceof URL?Tfr.fileURLToPath(t):t;e.push(O7e.default.resolve(n,r,".."))},VQo=({env:e=Obt.default.env,...t}={})=>{e={...e};let n=_tn({env:e});return t.path=e[n],e[n]=dYc(t),e};
var KQo=b(()=>{Obt=M(require("process")),O7e=M(require("path")),Tfr=require("url")});
export {yfr,_tn,Obt,O7e,Tfr,dYc,pYc,mYc,VQo,KQo};
