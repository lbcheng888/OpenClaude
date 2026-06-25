// @ts-nocheck
import {Jyr,Vos} from "./m665.ts";
import {b} from "../runtime.ts";
var eon,Kos=(e,t={})=>{if(typeof e!=="function")throw TypeError("Expected a function");let n,r=0,o=e.displayName||e.name||"<anonymous>",s=function(...i){if(eon.set(s,++r),r===1)n=e.apply(this,i),e=null;else if(t.throw===!0)throw Error(`Function \`${o}\` can only be called once`);return n};return Jyr(s,e),eon.set(s,r),s},zos;
var jos=b(()=>{Vos();eon=new WeakMap;Kos.callCount=(e)=>{if(!eon.has(e))throw Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);return eon.get(e)};zos=Kos});
export {eon,Kos,zos,jos};
