// @ts-nocheck
import {_A} from "./m459.ts";
import {Abn,fbn} from "./m2468.ts";
import {M,b} from "../runtime.ts";
import {hki} from "./m2508.ts";
import {execFileNoThrow,oa} from "./m684.ts";
async function pAe(){if(Ibn)return Ibn.default;if(_A())try{let n=await Promise.resolve().then(() => (Abn(),fbn)),r=n.sharp||n.default;return Ibn={default:r},r}catch{console.warn("Native image processor not available, falling back to sharp")}let e=await Promise.resolve().then(() => M(hki(),1)),t=ymd(e);return Ibn={default:t},t}
function ymd(e){let t=typeof e==="function"?e:e.default;if(typeof t!=="function")throw Object.assign(Error("sharp module loaded but its export is not callable (native libvips binding likely failed to load)"),{code:"ERR_DLOPEN_FAILED"});return t}
var Ibn=null;
var Dbn=()=>{};
function Xa(e){return e.map((t)=>{let n=String(t);if(n==="")return"''";if(/^[A-Za-z0-9_./:=@+,-]+$/.test(n))return n;return"'"+n.replaceAll("'",`'"'"'`)+"'"}).join(" ")}
class bwe{wslDistroName;constructor(e){this.wslDistroName=e}async toLocalPath(e){if(!e)return e;if(this.wslDistroName){let o=e.match(/^\\\\wsl(?:\.localhost|\$)\\([^\\]+)(.*)$/);if(o&&o[1]!==this.wslDistroName)return e}let{stdout:t,code:n}=await execFileNoThrow("wslpath",["-u",e],{useCwd:!1}),r=t.trim();if(n===0&&r)return r;return e.replaceAll("\\","/").replace(/^([A-Z]):/i,(o,s)=>`/mnt/${s.toLowerCase()}`)}async toIDEPath(e){if(!e)return e;let{stdout:t,code:n}=await execFileNoThrow("wslpath",["-w",e],{useCwd:!1}),r=t.trim();if(n===0&&r)return r;return e}}
function gki(e,t){let n=e.match(/^\\\\wsl(?:\.localhost|\$)\\([^\\]+)(.*)$/);if(n)return n[1]===t;return!0}
var Pbn=b(()=>{oa()});
export {pAe,ymd,Ibn,Dbn,Xa,bwe,gki,Pbn};
