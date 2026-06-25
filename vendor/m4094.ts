// @ts-nocheck
import {JV,FLe} from "./m106.ts";
import {a5,BLe} from "./m107.ts";
import {V6a,K6a} from "./m4093.ts";
import {z3,pDt} from "./m2214.ts";
import {b} from "../runtime.ts";
function rOp(e,t){t=JV(t,e);var n=-1,r=t.length;if(!r)return!0;while(++n<r){var o=a5(t[n]);if(o==="__proto__"&&!nOp.call(e,"__proto__"))return!1;if((o==="constructor"||o==="prototype")&&n<r-1)return!1}var s=V6a(e,t);return s==null||delete s[a5(z3(t))]}
var tOp,nOp,z6a;
var j6a=b(()=>{FLe();pDt();K6a();BLe();tOp=Object.prototype,nOp=tOp.hasOwnProperty;z6a=rOp});
export {rOp,tOp,nOp,z6a,j6a};
