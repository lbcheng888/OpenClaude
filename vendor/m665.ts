// @ts-nocheck
import {b} from "../runtime.ts";
function Jyr(e,t,{ignoreNonConfigurable:n=!1}={}){let{name:r}=e;for(let o of Reflect.ownKeys(t))xsu(e,t,o,n);return Psu(e,t),Nsu(e,t,r),e}
var xsu=(e,t,n,r)=>{if(n==="length"||n==="prototype")return;if(n==="arguments"||n==="caller")return;let o=Object.getOwnPropertyDescriptor(e,n),s=Object.getOwnPropertyDescriptor(t,n);if(!Dsu(o,s)&&r)return;Object.defineProperty(e,n,s)},Dsu=function(e,t){return e===void 0||e.configurable||e.writable===t.writable&&e.enumerable===t.enumerable&&e.configurable===t.configurable&&(e.writable||e.value===t.value)},Psu=(e,t)=>{let n=Object.getPrototypeOf(t);if(n===Object.getPrototypeOf(e))return;Object.setPrototypeOf(e,n)},Osu=(e,t)=>`/* Wrapped ${e}*/
${t}`,Lsu,Msu,Nsu=(e,t,n)=>{let r=n===""?"":`with ${n.trim()}() `,o=Osu.bind(null,r,t.toString());Object.defineProperty(o,"name",Msu),Object.defineProperty(e,"toString",{...Lsu,value:o})};
var Vos=b(()=>{Lsu=Object.getOwnPropertyDescriptor(Function.prototype,"toString"),Msu=Object.getOwnPropertyDescriptor(Function.prototype.toString,"name")});
export {Jyr,xsu,Dsu,Psu,Osu,Lsu,Msu,Nsu,Vos};
