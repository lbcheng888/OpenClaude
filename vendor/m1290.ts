// @ts-nocheck
import {b} from "../runtime.ts";
import {RM} from "./m1289.ts";
function SBs(){return null}
function bBs(e){let t=SBs();if(!t)return e;let n=new globalThis.Headers(e);return Object.entries(t).forEach(([r,o])=>{if(o!==void 0)n.set(r,o)}),n}
function zJe(){return!1}
function VHr(){return null}
function KHr(){return null}
function zHr(){return KJe&&TBs!==null&&!1}
function iI(){return null}
function jHr(){return null;switch(e){case"not-started":return{endsAt:null};case"expired":return{endsAt:new Date(Date.now()-t).toISOString()};default:{let n=Number(e);return Number.isFinite(n)&&n>0?{endsAt:new Date(Date.now()+n*t).toISOString()}:null}}}
function EBs(e){return}
var NBu,KJe=!1,TBs=null,FBu=null,BBu="max",UBu=null,$dn=null;
var qoe=b(()=>{RM();NBu={}});
export {SBs,bBs,zJe,VHr,KHr,zHr,iI,jHr,EBs,NBu,KJe,TBs,FBu,BBu,UBu,$dn,qoe};
