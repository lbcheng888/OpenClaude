// @ts-nocheck
import {S8s} from "./m1478.ts";
import {T7} from "../src/session/1465_promise.ts";
import {u7,G5} from "./m1296.ts";
import {Js,rT} from "./m1294.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {Fme,$mn} from "./m1465.ts";
import {b} from "../runtime.ts";
function zxr(){if(!Kxr)Kxr=S8s();return Kxr}
async function zg(e,t){let n=await zxr().lock(e,t);return Object.assign(n,{[Symbol.asyncDispose]:n})}
function b8s(e,t){let n=zxr().lockSync(e,t);return Object.assign(n,{[Symbol.dispose]:n})}
function E8s(e,t){return zxr().check(e,t)}
var Kxr;
async function g3u(e){if(C8s.getStore())return e();let t=A8s,n=T7();A8s=n.promise;try{await t;let r=u7();await Js().mkdir(r);let o=await zg(v8s.join(r,".storage-write"),{realpath:!1,retries:{retries:10,minTimeout:100,maxTimeout:1000},stale:15000,onCompromised:(s)=>logForDebugging(`[secureStorage] write lock compromised: ${Ce(s)}`,{level:"warn"})});try{return await C8s.run(!0,e)}finally{await o().catch((s)=>logForDebugging(`[secureStorage] write lock release failed: ${Ce(s)}`,{level:"warn"}))}}finally{n.resolve()}}
function pFe(e,t){return g3u(async()=>{e.invalidateCache?.();let n=await(e.readAsyncStrict?.()??e.readAsync());if(n===Fme)return{success:!1,transient:!0};let r=n??{},o=t(r);return o===r?{success:!0}:await e.update(o)})}
var R8s,v8s,C8s,A8s;
var eHt=b(()=>{rT();qe();Ct();G5();$mn();R8s=require("async_hooks"),v8s=require("path"),C8s=new R8s.AsyncLocalStorage,A8s=Promise.resolve()});
export {zxr,zg,b8s,E8s,Kxr,g3u,pFe,R8s,v8s,C8s,A8s,eHt};
