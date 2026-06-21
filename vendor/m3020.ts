// @ts-nocheck
import {SGr,wxn,bLt} from "./m3019.ts";
import {b} from "../runtime.ts";
function GMd(e){return{rl:e,hooks:[],hooksCleanup:[],hooksEffect:[],index:0,handleChange(){}}}
function nVi(e,t){let n=GMd(e);return tVi.run(n,()=>{function r(o){n.handleChange=()=>{n.index=0,o()},n.handleChange()}return t(r)})}
function m$e(){let e=tVi.getStore();if(!e)throw new SGr("[Inquirer] Hook functions can only be called from within a prompt");return e}
function bGr(){return m$e().rl}
function EGr(e){let t=(...n)=>{let r=m$e(),o=!1,s=r.handleChange;r.handleChange=()=>{o=!0};let i=e(...n);if(o)s();return r.handleChange=s,i};return Rxn.AsyncResource.bind(t)}
function znt(e){let t=m$e(),{index:n}=t,r={get(){return t.hooks[n]},set(s){t.hooks[n]=s},initialized:n in t.hooks},o=e(r);return t.index++,o}
function rVi(){m$e().handleChange()}
var Rxn,tVi,f$e;
var A$e=b(()=>{wxn();Rxn=require("async_hooks"),tVi=new Rxn.AsyncLocalStorage;f$e={queue(e){let t=m$e(),{index:n}=t;t.hooksEffect.push(()=>{t.hooksCleanup[n]?.();let r=e(bGr());if(r!=null&&typeof r!=="function")throw new bLt("useEffect return value must be a cleanup function or nothing.");t.hooksCleanup[n]=r})},run(){let e=m$e();EGr(()=>{e.hooksEffect.forEach((t)=>{t()}),e.hooksEffect.length=0})()},clearAll(){let e=m$e();e.hooksCleanup.forEach((t)=>{t?.()}),e.hooksEffect.length=0,e.hooksCleanup.length=0}}});
export {GMd,nVi,m$e,bGr,EGr,znt,rVi,Rxn,tVi,f$e,A$e};
