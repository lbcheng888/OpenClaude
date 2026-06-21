// @ts-nocheck
import {b} from "../runtime.ts";
function LFr(e,{include:t,exclude:n}={}){let r=(o)=>{let s=(i)=>typeof i==="string"?o===i:i.test(o);if(t)return t.some(s);if(n)return!n.some(s);return!0};for(let[o,s]of Ded(e.constructor.prototype)){if(s==="constructor"||!r(s))continue;let i=Reflect.getOwnPropertyDescriptor(o,s);if(i&&typeof i.value==="function")e[s]=e[s].bind(e)}return e}
var Ded=(e)=>{let t=new Set;do for(let n of Reflect.ownKeys(e))t.add([e,n]);while((e=Reflect.getPrototypeOf(e))&&e!==Object.prototype);return t};
function Ped(){}
var Xfe;
var MFr=b(()=>{Xfe=Ped});
export {LFr,Ded,Ped,Xfe,MFr};
