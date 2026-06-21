// @ts-nocheck
import {_o,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function A2l(e){f2l.push(e)}
function aDo(e,t){let n=t;for(let r of f2l)try{let o=r(e,n);if(o)n={...n,...o}}catch(o){let s=_o(o);logForDebugging(`session rehydrator threw: ${s.stack??s.message}`,{level:"error"})}return n}
var f2l;
var lDo=b(()=>{qe();bt();f2l=[]});
export {A2l,aDo,f2l,lDo};
