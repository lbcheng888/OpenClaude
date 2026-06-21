// @ts-nocheck
import {v9s} from "./m1473.ts";
import {z7} from "../src/session/1460_promise.ts";
import {B7,k8} from "./m1291.ts";
import {ci,pT} from "./m1289.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {kme,sdn} from "./m1460.ts";
import {b} from "../runtime.ts";
function gxr(){if(!hxr)hxr=v9s();return hxr}
async function Mg(e,t){let n=await gxr().lock(e,t);return Object.assign(n,{[Symbol.asyncDispose]:n})}
function w9s(e,t){let n=gxr().lockSync(e,t);return Object.assign(n,{[Symbol.dispose]:n})}
function R9s(e,t){return gxr().check(e,t)}
var hxr;
async function XOu(e){if(x9s.getStore())return e();let t=k9s,n=z7();k9s=n.promise;try{await t;let r=B7();await ci().mkdir(r);let o=await Mg(I9s.join(r,".storage-write"),{realpath:!1,retries:{retries:10,minTimeout:100,maxTimeout:1000},stale:15000,onCompromised:(s)=>logForDebugging(`[secureStorage] write lock compromised: ${Se(s)}`,{level:"warn"})});try{return await x9s.run(!0,e)}finally{await o().catch((s)=>logForDebugging(`[secureStorage] write lock release failed: ${Se(s)}`,{level:"warn"}))}}finally{n.resolve()}}
function hNe(e,t){return XOu(async()=>{e.invalidateCache?.();let n=await(e.readAsyncStrict?.()??e.readAsync());if(n===kme)return{success:!1,transient:!0};let r=n??{},o=t(r);return o===r?{success:!0}:await e.update(o)})}
var H9s,I9s,x9s,k9s;
var Rwt=b(()=>{pT();qe();bt();k8();sdn();H9s=require("async_hooks"),I9s=require("path"),x9s=new H9s.AsyncLocalStorage,k9s=Promise.resolve()});
export {gxr,Mg,w9s,R9s,hxr,XOu,hNe,H9s,I9s,x9s,k9s,Rwt};
