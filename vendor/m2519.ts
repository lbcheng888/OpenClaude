// @ts-nocheck
import {Rf} from "./m465.ts";
import {nRn,tRn} from "./m2478.ts";
import {x,b} from "../runtime.ts";
import {NOi} from "./m2518.ts";
import {execFileNoThrow,Ii} from "./m690.ts";
async function Rhe(){if(yRn)return yRn.default;if(Rf())try{let n=await Promise.resolve().then(() => (nRn(),tRn)),r=n.sharp||n.default;return yRn={default:r},r}catch{console.warn("Native image processor not available, falling back to sharp")}let e=await Promise.resolve().then(() => x(NOi(),1)),t=WCd(e);return yRn={default:t},t}
function WCd(e){let t=typeof e==="function"?e:e.default;if(typeof t!=="function")throw Object.assign(Error("sharp module loaded but its export is not callable (native libvips binding likely failed to load)"),{code:"ERR_DLOPEN_FAILED"});return t}
var yRn=null;
var TRn=()=>{};
function Ma(e){return e.map((t)=>{let n=String(t);if(n==="")return"''";if(/^[A-Za-z0-9_./:=@+,-]+$/.test(n))return n;return"'"+n.replaceAll("'",`'"'"'`)+"'"}).join(" ")}
class awe{wslDistroName;constructor(e){this.wslDistroName=e}async toLocalPath(e){if(!e)return e;if(this.wslDistroName){let o=e.match(/^\\\\wsl(?:\.localhost|\$)\\([^\\]+)(.*)$/);if(o&&o[1]!==this.wslDistroName)return e}let{stdout:t,code:n}=await execFileNoThrow("wslpath",["-u",e],{useCwd:!1}),r=t.trim();if(n===0&&r)return r;return e.replaceAll("\\","/").replace(/^([A-Z]):/i,(o,s)=>`/mnt/${s.toLowerCase()}`)}async toIDEPath(e){if(!e)return e;let{stdout:t,code:n}=await execFileNoThrow("wslpath",["-w",e],{useCwd:!1}),r=t.trim();if(n===0&&r)return r;return e}}
function FOi(e,t){let n=e.match(/^\\\\wsl(?:\.localhost|\$)\\([^\\]+)(.*)$/);if(n)return n[1]===t;return!0}
var SRn=b(()=>{Ii()});
export {Rhe,WCd,yRn,TRn,Ma,awe,FOi,SRn};
