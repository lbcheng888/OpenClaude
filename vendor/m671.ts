// @ts-nocheck
import {b} from "../runtime.ts";
var ton,Ksu=(e)=>ton.some((t)=>e[t]!==void 0),iss=(e)=>{if(!e)return;let{stdio:t}=e;if(t===void 0)return ton.map((r)=>e[r]);if(Ksu(e))throw Error(`It's not possible to provide \`stdio\` in combination with one of ${ton.map((r)=>`\`${r}\``).join(", ")}`);if(typeof t==="string")return t;if(!Array.isArray(t))throw TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);let n=Math.max(t.length,ton.length);return Array.from({length:n},(r,o)=>t[o])};
var ass=b(()=>{ton=["stdin","stdout","stderr"]});
export {ton,Ksu,iss,ass};
