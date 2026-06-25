// @ts-nocheck
import {nYr,h0n,J1t} from "./m3029.ts";
import {b} from "../runtime.ts";
function vqd(e){return{rl:e,hooks:[],hooksCleanup:[],hooksEffect:[],index:0,handleChange(){}}}
function YXi(e,t){let n=vqd(e);return jXi.run(n,()=>{function r(o){n.handleChange=()=>{n.index=0,o()},n.handleChange()}return t(r)})}
function g9e(){let e=jXi.getStore();if(!e)throw new nYr("[Inquirer] Hook functions can only be called from within a prompt");return e}
function rYr(){return g9e().rl}
function oYr(e){let t=(...n)=>{let r=g9e(),o=!1,s=r.handleChange;r.handleChange=()=>{o=!0};let i=e(...n);if(o)s();return r.handleChange=s,i};return g0n.AsyncResource.bind(t)}
function Qot(e){let t=g9e(),{index:n}=t,r={get(){return t.hooks[n]},set(s){t.hooks[n]=s},initialized:n in t.hooks},o=e(r);return t.index++,o}
function JXi(){g9e().handleChange()}
var g0n,jXi,_9e;
var y9e=b(()=>{h0n();g0n=require("async_hooks"),jXi=new g0n.AsyncLocalStorage;_9e={queue(e){let t=g9e(),{index:n}=t;t.hooksEffect.push(()=>{t.hooksCleanup[n]?.();let r=e(rYr());if(r!=null&&typeof r!=="function")throw new J1t("useEffect return value must be a cleanup function or nothing.");t.hooksCleanup[n]=r})},run(){let e=g9e();oYr(()=>{e.hooksEffect.forEach((t)=>{t()}),e.hooksEffect.length=0})()},clearAll(){let e=g9e();e.hooksCleanup.forEach((t)=>{t?.()}),e.hooksEffect.length=0,e.hooksCleanup.length=0}}});
export {vqd,YXi,g9e,rYr,oYr,Qot,JXi,g0n,jXi,_9e,y9e};
