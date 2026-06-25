// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {navigator} from "./m527.ts";
var Gi={};
ft(Gi,{unwrapMessage:()=>unwrapMessage,stringifyPrimitive:()=>stringifyPrimitive,required:()=>required,randomString:()=>randomString,propertyKeyTypes:()=>propertyKeyTypes,promiseAllObject:()=>promiseAllObject,primitiveTypes:()=>primitiveTypes,prefixIssues:()=>prefixIssues,pick:()=>pick,partial:()=>partial,optionalKeys:()=>optionalKeys,omit:()=>omit,numKeys:()=>numKeys,nullish:()=>nullish,normalizeParams:()=>normalizeParams,merge:()=>merge,jsonStringifyReplacer:()=>jsonStringifyReplacer,joinValues:()=>joinValues,issue:()=>issue,isPlainObject:()=>isPlainObject,isObject:()=>isObject,getSizableOrigin:()=>getSizableOrigin,getParsedType:()=>NIc,getLengthableOrigin:()=>getLengthableOrigin,getEnumValues:()=>getEnumValues,getElementAtPath:()=>getElementAtPath,floatSafeRemainder:()=>floatSafeRemainder,finalizeIssue:()=>finalizeIssue,extend:()=>extend,escapeRegex:()=>escapeRegex,esc:()=>xMe,defineLazy:()=>defineLazy,createTransparentProxy:()=>createTransparentProxy,clone:()=>clone,cleanRegex:()=>cleanRegex,cleanEnum:()=>cleanEnum,captureStackTrace:()=>captureStackTrace,cached:()=>cached,assignProp:()=>assignProp,assertNotEqual:()=>assertNotEqual,assertNever:()=>assertNever,assertIs:()=>assertIs,assertEqual:()=>assertEqual,assert:()=>assert,allowsEval:()=>allowsEval,aborted:()=>aborted,NUMBER_FORMAT_RANGES:()=>NUMBER_FORMAT_RANGES,Class:()=>Class,BIGINT_FORMAT_RANGES:()=>BIGINT_FORMAT_RANGES});
function assertEqual(e){return e}
function assertNotEqual(e){return e}
function assertIs(e){}
function assertNever(e){throw Error()}
function assert(e){}
function getEnumValues(e){let t=Object.values(e).filter((r)=>typeof r==="number");return Object.entries(e).filter(([r,o])=>t.indexOf(+r)===-1).map(([r,o])=>o)}
function joinValues(e,t="|"){return e.map((n)=>stringifyPrimitive(n)).join(t)}
function jsonStringifyReplacer(e,t){if(typeof t==="bigint")return t.toString();return t}
function cached(e){return{get value(){{let n=e();return Object.defineProperty(this,"value",{value:n}),n}throw Error("cached value already set")}}}
function nullish(e){return e===null||e===void 0}
function cleanRegex(e){let t=e.startsWith("^")?1:0,n=e.endsWith("$")?e.length-1:e.length;return e.slice(t,n)}
function floatSafeRemainder(e,t){let n=(e.toString().split(".")[1]||"").length,r=(t.toString().split(".")[1]||"").length,o=n>r?n:r,s=Number.parseInt(e.toFixed(o).replace(".","")),i=Number.parseInt(t.toFixed(o).replace(".",""));return s%i/10**o}
function defineLazy(e,t,n){Object.defineProperty(e,t,{get(){{let o=n();return e[t]=o,o}throw Error("cached value already set")},set(o){Object.defineProperty(e,t,{value:o})},configurable:!0})}
function assignProp(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0,configurable:!0})}
function getElementAtPath(e,t){if(!t)return e;return t.reduce((n,r)=>n?.[r],e)}
function promiseAllObject(e){let t=Object.keys(e),n=t.map((r)=>e[r]);return Promise.all(n).then((r)=>{let o={};for(let s=0;s<t.length;s++)o[t[s]]=r[s];return o})}
function randomString(e=10){let n="";for(let r=0;r<e;r++)n+="abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random()*26)];return n}
function xMe(e){return JSON.stringify(e)}
function isObject(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}
function isPlainObject(e){if(isObject(e)===!1)return!1;let t=e.constructor;if(t===void 0)return!0;let n=t.prototype;if(isObject(n)===!1)return!1;if(Object.prototype.hasOwnProperty.call(n,"isPrototypeOf")===!1)return!1;return!0}
function numKeys(e){let t=0;for(let n in e)if(Object.prototype.hasOwnProperty.call(e,n))t++;return t}
function escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
function clone(e,t,n){let r=new e._zod.constr(t??e._zod.def);if(!t||n?.parent)r._zod.parent=e;return r}
function normalizeParams(e){let t=e;if(!t)return{};if(typeof t==="string")return{error:()=>t};if(t?.message!==void 0){if(t?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");t.error=t.message}if(delete t.message,typeof t.error==="string")return{...t,error:()=>t.error};return t}
function createTransparentProxy(e){let t;return new Proxy({},{get(n,r,o){return t??(t=e()),Reflect.get(t,r,o)},set(n,r,o,s){return t??(t=e()),Reflect.set(t,r,o,s)},has(n,r){return t??(t=e()),Reflect.has(t,r)},deleteProperty(n,r){return t??(t=e()),Reflect.deleteProperty(t,r)},ownKeys(n){return t??(t=e()),Reflect.ownKeys(t)},getOwnPropertyDescriptor(n,r){return t??(t=e()),Reflect.getOwnPropertyDescriptor(t,r)},defineProperty(n,r,o){return t??(t=e()),Reflect.defineProperty(t,r,o)}})}
function stringifyPrimitive(e){if(typeof e==="bigint")return e.toString()+"n";if(typeof e==="string")return`"${e}"`;return`${e}`}
function optionalKeys(e){return Object.keys(e).filter((t)=>e[t]._zod.optin==="optional"&&e[t]._zod.optout==="optional")}
function pick(e,t){let n={},r=e._zod.def;for(let o in t){if(!(o in r.shape))throw Error(`Unrecognized key: "${o}"`);if(!t[o])continue;n[o]=r.shape[o]}return clone(e,{...e._zod.def,shape:n,checks:[]})}
function omit(e,t){let n={...e._zod.def.shape},r=e._zod.def;for(let o in t){if(!(o in r.shape))throw Error(`Unrecognized key: "${o}"`);if(!t[o])continue;delete n[o]}return clone(e,{...e._zod.def,shape:n,checks:[]})}
function extend(e,t){if(!isPlainObject(t))throw Error("Invalid input to extend: expected a plain object");let n={...e._zod.def,get shape(){let r={...e._zod.def.shape,...t};return assignProp(this,"shape",r),r},checks:[]};return clone(e,n)}
function merge(e,t){return clone(e,{...e._zod.def,get shape(){let n={...e._zod.def.shape,...t._zod.def.shape};return assignProp(this,"shape",n),n},catchall:t._zod.def.catchall,checks:[]})}
function partial(e,t,n){let r=t._zod.def.shape,o={...r};if(n)for(let s in n){if(!(s in r))throw Error(`Unrecognized key: "${s}"`);if(!n[s])continue;o[s]=e?new e({type:"optional",innerType:r[s]}):r[s]}else for(let s in r)o[s]=e?new e({type:"optional",innerType:r[s]}):r[s];return clone(t,{...t._zod.def,shape:o,checks:[]})}
function required(e,t,n){let r=t._zod.def.shape,o={...r};if(n)for(let s in n){if(!(s in o))throw Error(`Unrecognized key: "${s}"`);if(!n[s])continue;o[s]=new e({type:"nonoptional",innerType:r[s]})}else for(let s in r)o[s]=new e({type:"nonoptional",innerType:r[s]});return clone(t,{...t._zod.def,shape:o,checks:[]})}
function aborted(e,t=0){for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue!==!0)return!0;return!1}
function prefixIssues(e,t){return t.map((n)=>{var r;return(r=n).path??(r.path=[]),n.path.unshift(e),n})}
function unwrapMessage(e){return typeof e==="string"?e:e?.message}
function finalizeIssue(e,t,n){let r={...e,path:e.path??[]};if(!e.message){let o=unwrapMessage(e.inst?._zod.def?.error?.(e))??unwrapMessage(t?.error?.(e))??unwrapMessage(n.customError?.(e))??unwrapMessage(n.localeError?.(e))??"Invalid input";r.message=o}if(delete r.inst,delete r.continue,!t?.reportInput)delete r.input;return r}
function getSizableOrigin(e){if(e instanceof Set)return"set";if(e instanceof Map)return"map";if(e instanceof File)return"file";return"unknown"}
function getLengthableOrigin(e){if(Array.isArray(e))return"array";if(typeof e==="string")return"string";return"unknown"}
function issue(...e){let[t,n,r]=e;if(typeof t==="string")return{message:t,code:"custom",input:n,inst:r};return{...t}}
function cleanEnum(e){return Object.entries(e).filter(([t,n])=>Number.isNaN(Number.parseInt(t,10))).map((t)=>t[1])}
class Class{constructor(...e){}}
var captureStackTrace,allowsEval,NIc=(e)=>{let t=typeof e;switch(t){case"undefined":return"undefined";case"string":return"string";case"number":return Number.isNaN(e)?"nan":"number";case"boolean":return"boolean";case"function":return"function";case"bigint":return"bigint";case"symbol":return"symbol";case"object":if(Array.isArray(e))return"array";if(e===null)return"null";if(e.then&&typeof e.then==="function"&&e.catch&&typeof e.catch==="function")return"promise";if(typeof Map<"u"&&e instanceof Map)return"map";if(typeof Set<"u"&&e instanceof Set)return"set";if(typeof Date<"u"&&e instanceof Date)return"date";if(typeof File<"u"&&e instanceof File)return"file";return"object";default:throw Error(`Unknown data type: ${t}`)}},propertyKeyTypes,primitiveTypes,NUMBER_FORMAT_RANGES,BIGINT_FORMAT_RANGES;
var Fd=b(()=>{captureStackTrace=Error.captureStackTrace?Error.captureStackTrace:(...e)=>{};allowsEval=cached(()=>{if(typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{return new Function(""),!0}catch(e){return!1}});propertyKeyTypes=new Set(["string","number","symbol"]),primitiveTypes=new Set(["string","number","bigint","boolean","symbol","undefined"]);NUMBER_FORMAT_RANGES={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-340282346638528860000000000000000000000,340282346638528860000000000000000000000],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]},BIGINT_FORMAT_RANGES={int64:[BigInt("-9223372036854775808"),BigInt("9223372036854775807")],uint64:[BigInt(0),BigInt("18446744073709551615")]}});
export {Gi,assertEqual,assertNotEqual,assertIs,assertNever,assert,getEnumValues,joinValues,jsonStringifyReplacer,cached,nullish,cleanRegex,floatSafeRemainder,defineLazy,assignProp,getElementAtPath,promiseAllObject,randomString,xMe,isObject,isPlainObject,numKeys,escapeRegex,clone,normalizeParams,createTransparentProxy,stringifyPrimitive,optionalKeys,pick,omit,extend,merge,partial,required,aborted,prefixIssues,unwrapMessage,finalizeIssue,getSizableOrigin,getLengthableOrigin,issue,cleanEnum,Class,captureStackTrace,allowsEval,NIc,propertyKeyTypes,primitiveTypes,NUMBER_FORMAT_RANGES,BIGINT_FORMAT_RANGES,Fd};
