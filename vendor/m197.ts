// @ts-nocheck
import {qp} from "./m137.ts";
import {isKeybindingCustomizationEnabled,Ve} from "./m5.ts";
import {b} from "../runtime.ts";
import {jx} from "./m196.ts";
function allTools(e){try{return e instanceof $c||e instanceof qp||e instanceof Error&&e.name==="AbortError"}catch{return!1}}
function EX(e,t){return e instanceof Error&&e.message===t}
function mo(e){return e instanceof Error?e:Error(String(e))}
function Ce(e){return e instanceof Error?e.message:String(e)}
function cn(e){if(e&&typeof e==="object"&&"code"in e&&typeof e.code==="string")return e.code;return}
function Xd(e){let t=cn(e);return t&&/^[A-Z][A-Z0-9_]{0,63}$/.test(t)?t:void 0}
function dK(e){let t=e?.name;return typeof t==="string"&&/^[A-Z][a-zA-Z]*$/.test(t)?t:void 0}
function IXt(e){let t=Xd(e)??dK(e);return t===void 0?void 0:isKeybindingCustomizationEnabled(t)}
function j5o(e){let t=dK(e);return t===void 0?void 0:isKeybindingCustomizationEnabled(t)}
function Y5o(e){return e!==void 0&&/^[A-Z][A-Za-z0-9_]*$/.test(e)?isKeybindingCustomizationEnabled(e):void 0}
function l7e(e){return typeof e==="string"&&/^[A-Z][a-zA-Z]*$/.test(e)?e:void 0}
function J5o(e){return typeof e==="string"&&/^[a-z][a-z_]{0,39}$/.test(e)?isKeybindingCustomizationEnabled(e):Ve("unparseable")}
function X5o(e){let t=l7e(e);return t===void 0?void 0:isKeybindingCustomizationEnabled(t)}
function Q5o(e){return/^[^/\\]+:\d+:\d+$/.test(e)?e:void 0}
function sp(e){return e!==null&&typeof e==="object"&&"errno"in e&&typeof e.errno==="number"}
function In(e){return cn(e)==="ENOENT"}
function Dre(e){return cn(e)==="EISDIR"}
function Z5o(e){if(e&&typeof e==="object"&&"path"in e&&typeof e.path==="string")return e.path;return}
function e8o(e,t=5){if(!(e instanceof Error))return String(e);if(!e.stack)return e.message;let n=e.stack.split(`
`),r=n[0]??e.message,o=n.slice(1).filter((s)=>s.trim().startsWith("at "));if(o.length<=t)return e.stack;return[r,...o.slice(0,t)].join(`
`)}
function Jo(e){let t=cn(e);return t==="ENOENT"||t==="EACCES"||t==="EPERM"||t==="ENOTDIR"||t==="ELOOP"||t==="ENAMETOOLONG"||t==="EROFS"}
function __export(e,t){if(t?.(e))return!0;if(!e||typeof e!=="object"||!("isAxiosError"in e)||!e.isAxiosError)return!1;let n=e.response?.status;return n===void 0||n===401||n===403||n===429}
function Fb(e){let t=Ce(e);if(!e||typeof e!=="object"||!("isAxiosError"in e)||!e.isAxiosError)return{kind:"other",message:t};let n=e,r=n.response?.status;if(r===401||r===403)return{kind:"auth",status:r,message:t};if(n.code==="ECONNABORTED")return{kind:"timeout",status:r,message:t};if(n.code==="ECONNREFUSED"||n.code==="ENOTFOUND")return{kind:"network",status:r,message:t};return{kind:"http",status:r,message:t}}
var Fbt,uK,$c,$U,XL,Xy,Ta,ipe;
var Ct=b(()=>{jx();Fbt=class Fbt extends Error{constructor(e){super(e);this.name=this.constructor.name}};uK=class uK extends Error{};$c=class $c extends Error{constructor(e){super(e);this.name="AbortError"}};$U=class $U extends Error{filePath;defaultConfig;constructor(e,t,n){super(e);this.name="ConfigParseError",this.filePath=t,this.defaultConfig=n}};XL=class XL extends Error{stdout;stderr;code;interrupted;hadSandboxViolation;constructor(e,t,n,r,o=!1){super("Shell command failed");this.stdout=e;this.stderr=t;this.code=n;this.interrupted=r;this.hadSandboxViolation=o;this.name="ShellError"}};Xy=class Xy extends Error{formattedMessage;constructor(e,t){super(e);this.formattedMessage=t;this.name="TeleportOperationError"}};Ta=class Ta extends Error{telemetryMessage;constructor(e,t){super(e);this.name="TelemetrySafeError",this.telemetryMessage=t??e}};ipe=new Set(["ENOSPC","EDQUOT","ENFILE","EMFILE"])});
export {allTools,EX,mo,Ce,cn,Xd,dK,IXt,j5o,Y5o,l7e,J5o,X5o,Q5o,sp,In,Dre,Z5o,e8o,Jo,__export,Fb,Fbt,uK,$c,$U,XL,Xy,Ta,ipe,Ct};
