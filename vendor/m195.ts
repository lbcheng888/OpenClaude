// @ts-nocheck
import {xm} from "./m135.ts";
import {fromSanitizer_SANITIZER_OUTPUT_ONLY} from "./m5.ts";
import {b} from "../runtime.ts";
import {LD} from "./m194.ts";
function h_(e){try{return e instanceof vu||e instanceof xm||e instanceof Error&&e.name==="AbortError"}catch{return!1}}
function CX(e,t){return e instanceof Error&&e.message===t}
function _o(e){return e instanceof Error?e:Error(String(e))}
function Se(e){return e instanceof Error?e.message:String(e)}
function dn(e){if(e&&typeof e==="object"&&"code"in e&&typeof e.code==="string")return e.code;return}
function xp(e){let t=dn(e);return t&&/^[A-Z][A-Z0-9_]{0,63}$/.test(t)?t:void 0}
function vX(e){let t=e?.name;return typeof t==="string"&&/^[A-Z][a-zA-Z]*$/.test(t)?t:void 0}
function Xzt(e){let t=xp(e)??vX(e);return t===void 0?void 0:fromSanitizer_SANITIZER_OUTPUT_ONLY(t)}
function dyt(e){return typeof e==="string"&&/^[A-Z][a-zA-Z]*$/.test(e)?e:void 0}
function r9o(e){return/^[^/\\]+:\d+:\d+$/.test(e)?e:void 0}
function qp(e){return e!==null&&typeof e==="object"&&"errno"in e&&typeof e.errno==="number"}
function Pn(e){return dn(e)==="ENOENT"}
function Lre(e){return dn(e)==="EISDIR"}
function o9o(e){if(e&&typeof e==="object"&&"path"in e&&typeof e.path==="string")return e.path;return}
function s9o(e,t=5){if(!(e instanceof Error))return String(e);if(!e.stack)return e.message;let n=e.stack.split(`
`),r=n[0]??e.message,o=n.slice(1).filter((s)=>s.trim().startsWith("at "));if(o.length<=t)return e.stack;return[r,...o.slice(0,t)].join(`
`)}
function ds(e){let t=dn(e);return t==="ENOENT"||t==="EACCES"||t==="EPERM"||t==="ENOTDIR"||t==="ELOOP"||t==="ENAMETOOLONG"||t==="EROFS"}
function K_(e,t){if(t?.(e))return!0;if(!e||typeof e!=="object"||!("isAxiosError"in e)||!e.isAxiosError)return!1;let n=e.response?.status;return n===void 0||n===401||n===403||n===429}
function Lb(e){let t=Se(e);if(!e||typeof e!=="object"||!("isAxiosError"in e)||!e.isAxiosError)return{kind:"other",message:t};let n=e,r=n.response?.status;if(r===401||r===403)return{kind:"auth",status:r,message:t};if(n.code==="ECONNABORTED")return{kind:"timeout",status:r,message:t};if(n.code==="ECONNREFUSED"||n.code==="ENOTFOUND")return{kind:"network",status:r,message:t};return{kind:"http",status:r,message:t}}
var uyt,UV,vu,T2,BM,iT,Fl,bLe;
var bt=b(()=>{LD();uyt=class uyt extends Error{constructor(e){super(e);this.name=this.constructor.name}};UV=class UV extends Error{};vu=class vu extends Error{constructor(e){super(e);this.name="AbortError"}};T2=class T2 extends Error{filePath;defaultConfig;constructor(e,t,n){super(e);this.name="ConfigParseError",this.filePath=t,this.defaultConfig=n}};BM=class BM extends Error{stdout;stderr;code;interrupted;hadSandboxViolation;constructor(e,t,n,r,o=!1){super("Shell command failed");this.stdout=e;this.stderr=t;this.code=n;this.interrupted=r;this.hadSandboxViolation=o;this.name="ShellError"}};iT=class iT extends Error{formattedMessage;constructor(e,t){super(e);this.formattedMessage=t;this.name="TeleportOperationError"}};Fl=class Fl extends Error{telemetryMessage;constructor(e,t){super(e);this.name="TelemetrySafeError",this.telemetryMessage=t??e}};bLe=new Set(["ENOSPC","EDQUOT","ENFILE","EMFILE"])});
export {h_,CX,_o,Se,dn,xp,vX,Xzt,dyt,r9o,qp,Pn,Lre,o9o,s9o,ds,K_,Lb,uyt,UV,vu,T2,BM,iT,Fl,bLe,bt};
