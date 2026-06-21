// @ts-nocheck
import {Sfr,zQo} from "./m659.ts";
import {b} from "../runtime.ts";
var ytn,YQo=(e,t={})=>{if(typeof e!=="function")throw TypeError("Expected a function");let n,r=0,o=e.displayName||e.name||"<anonymous>",s=function(...i){if(ytn.set(s,++r),r===1)n=e.apply(this,i),e=null;else if(t.throw===!0)throw Error(`Function \`${o}\` can only be called once`);return n};return Sfr(s,e),ytn.set(s,r),s},JQo;
var XQo=b(()=>{zQo();ytn=new WeakMap;YQo.callCount=(e)=>{if(!ytn.has(e))throw Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);return ytn.get(e)};JQo=YQo});
export {ytn,YQo,JQo,XQo};
