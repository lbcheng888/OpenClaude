// @ts-nocheck
import {b} from "../runtime.ts";
import {LB} from "./m1284.ts";
function wOs(){return null}
function ROs(e){let t=wOs();if(!t)return e;let n=new globalThis.Headers(e);return Object.entries(t).forEach(([r,o])=>{if(o!==void 0)n.set(r,o)}),n}
function Jze(){return!1}
function hvr(){return null}
function gvr(){return null}
function _vr(){return Yze&&vOs!==null&&!1}
function WD(){return null}
function yvr(){return null;switch(e){case"not-started":return{endsAt:null};case"expired":return{endsAt:new Date(Date.now()-t).toISOString()};default:{let n=Number(e);return Number.isFinite(n)&&n>0?{endsAt:new Date(Date.now()+n*t).toISOString()}:null}}}
function xOs(e){return}
var SIu,Yze=!1,vOs=null,bIu=null,EIu="max",CIu=null,rcn=null;
var _me=b(()=>{LB();SIu={}});
export {wOs,ROs,Jze,hvr,gvr,_vr,WD,yvr,xOs,SIu,Yze,vOs,bIu,EIu,CIu,rcn,_me};
