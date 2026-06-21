// @ts-nocheck
import {X} from "../runtime.ts";
import {mT} from "./m1464.ts";
import {EC} from "./m3064.ts";
import {grt} from "./m3084.ts";
var DVr=X((hjh,rYi)=>{var _rt;try{_rt=mT()}catch(e){_rt=require("fs")}var akn=EC(),{stringify:tYi,stripBom:nYi}=grt();async function wBd(e,t={}){if(typeof t==="string")t={encoding:t};let n=t.fs||_rt,r="throws"in t?t.throws:!0,o=await akn.fromCallback(n.readFile)(e,t);o=nYi(o);let s;try{s=JSON.parse(o,t?t.reviver:null)}catch(i){if(r)throw i.message=`${e}: ${i.message}`,i;else return null}return s}var RBd=akn.fromPromise(wBd);function xBd(e,t={}){if(typeof t==="string")t={encoding:t};let n=t.fs||_rt,r="throws"in t?t.throws:!0;try{let o=n.readFileSync(e,t);return o=nYi(o),JSON.parse(o,t.reviver)}catch(o){if(r)throw o.message=`${e}: ${o.message}`,o;else return null}}async function kBd(e,t,n={}){let r=n.fs||_rt,o=tYi(t,n);await akn.fromCallback(r.writeFile)(e,o,n)}var HBd=akn.fromPromise(kBd);function IBd(e,t,n={}){let r=n.fs||_rt,o=tYi(t,n);return r.writeFileSync(e,o,n)}var DBd={readFile:RBd,readFileSync:xBd,writeFile:HBd,writeFileSync:IBd};rYi.exports=DBd});
export {DVr};
