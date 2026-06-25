// @ts-nocheck
import {b} from "../runtime.ts";
function $constructor(e,t,n){function r(a,l){var c;Object.defineProperty(a,"_zod",{value:a._zod??{},enumerable:!1}),(c=a._zod).traits??(c.traits=new Set),a._zod.traits.add(e),t(a,l);for(let u in i.prototype)if(!(u in a))Object.defineProperty(a,u,{value:i.prototype[u].bind(a)});a._zod.constr=i,a._zod.def=l}let o=n?.Parent??Object;class s extends o{}Object.defineProperty(s,"name",{value:e});function i(a){var l;let c=n?.Parent?new s:this;r(c,a),(l=c._zod).deferred??(l.deferred=[]);for(let u of c._zod.deferred)u();return c}return Object.defineProperty(i,"init",{value:r}),Object.defineProperty(i,Symbol.hasInstance,{value:(a)=>{if(n?.Parent&&a instanceof n.Parent)return!0;return a?._zod?.traits?.has(e)}}),Object.defineProperty(i,"name",{value:e}),i}
function config(e){if(e)Object.assign(globalConfig,e);return globalConfig}
var U7e,$brand,$ZodAsyncError,globalConfig;
var $7e=b(()=>{U7e=Object.freeze({status:"aborted"});$brand=Symbol("zod_brand");$ZodAsyncError=class $ZodAsyncError extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}};globalConfig={}});
export {$constructor,config,U7e,$brand,$ZodAsyncError,globalConfig,$7e};
