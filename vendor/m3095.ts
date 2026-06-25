// @ts-nocheck
import {Q} from "../runtime.ts";
import {oT} from "./m1469.ts";
import {AC} from "./m3074.ts";
import {bst} from "./m3094.ts";
var mJr=Q((sZg,Jta)=>{var Est;try{Est=oT()}catch(e){Est=require("fs")}var J0n=AC(),{stringify:jta,stripBom:Yta}=bst();async function a8d(e,t={}){if(typeof t==="string")t={encoding:t};let n=t.fs||Est,r="throws"in t?t.throws:!0,o=await J0n.fromCallback(n.readFile)(e,t);o=Yta(o);let s;try{s=JSON.parse(o,t?t.reviver:null)}catch(i){if(r)throw i.message=`${e}: ${i.message}`,i;else return null}return s}var l8d=J0n.fromPromise(a8d);function c8d(e,t={}){if(typeof t==="string")t={encoding:t};let n=t.fs||Est,r="throws"in t?t.throws:!0;try{let o=n.readFileSync(e,t);return o=Yta(o),JSON.parse(o,t.reviver)}catch(o){if(r)throw o.message=`${e}: ${o.message}`,o;else return null}}async function u8d(e,t,n={}){let r=n.fs||Est,o=jta(t,n);await J0n.fromCallback(r.writeFile)(e,o,n)}var d8d=J0n.fromPromise(u8d);function p8d(e,t,n={}){let r=n.fs||Est,o=jta(t,n);return r.writeFileSync(e,o,n)}var m8d={readFile:l8d,readFileSync:c8d,writeFile:d8d,writeFileSync:p8d};Jta.exports=m8d});
export {mJr};
