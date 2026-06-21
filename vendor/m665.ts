// @ts-nocheck
import {b} from "../runtime.ts";
var Ttn,kYc=(e)=>Ttn.some((t)=>e[t]!==void 0),cZo=(e)=>{if(!e)return;let{stdio:t}=e;if(t===void 0)return Ttn.map((r)=>e[r]);if(kYc(e))throw Error(`It's not possible to provide \`stdio\` in combination with one of ${Ttn.map((r)=>`\`${r}\``).join(", ")}`);if(typeof t==="string")return t;if(!Array.isArray(t))throw TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);let n=Math.max(t.length,Ttn.length);return Array.from({length:n},(r,o)=>t[o])};
var uZo=b(()=>{Ttn=["stdin","stdout","stderr"]});
export {Ttn,kYc,cZo,uZo};
