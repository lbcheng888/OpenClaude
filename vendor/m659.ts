// @ts-nocheck
import {b} from "../runtime.ts";
function Sfr(e,t,{ignoreNonConfigurable:n=!1}={}){let{name:r}=e;for(let o of Reflect.ownKeys(t))fYc(e,t,o,n);return hYc(e,t),TYc(e,t,r),e}
var fYc=(e,t,n,r)=>{if(n==="length"||n==="prototype")return;if(n==="arguments"||n==="caller")return;let o=Object.getOwnPropertyDescriptor(e,n),s=Object.getOwnPropertyDescriptor(t,n);if(!AYc(o,s)&&r)return;Object.defineProperty(e,n,s)},AYc=function(e,t){return e===void 0||e.configurable||e.writable===t.writable&&e.enumerable===t.enumerable&&e.configurable===t.configurable&&(e.writable||e.value===t.value)},hYc=(e,t)=>{let n=Object.getPrototypeOf(t);if(n===Object.getPrototypeOf(e))return;Object.setPrototypeOf(e,n)},gYc=(e,t)=>`/* Wrapped ${e}*/
${t}`,_Yc,yYc,TYc=(e,t,n)=>{let r=n===""?"":`with ${n.trim()}() `,o=gYc.bind(null,r,t.toString());Object.defineProperty(o,"name",yYc),Object.defineProperty(e,"toString",{..._Yc,value:o})};
var zQo=b(()=>{_Yc=Object.getOwnPropertyDescriptor(Function.prototype,"toString"),yYc=Object.getOwnPropertyDescriptor(Function.prototype.toString,"name")});
export {Sfr,fYc,AYc,hYc,gYc,_Yc,yYc,TYc,zQo};
