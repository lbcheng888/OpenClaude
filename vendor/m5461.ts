// @ts-nocheck
import {Pza,Afo} from "./m4320.ts";
import {Tke,PYr} from "./m3269.ts";
import {YIn,c9e,IYr} from "./m3260.ts";
import {_ke,Jae} from "../src/config/3258_errors.ts";
import {Di,Uu,dr} from "./m231.ts";
import {b} from "../runtime.ts";
function RLm(e){let t=[];for(let n of e.statements)for(let r of n.commands)if(r.elementType==="CommandAst")t.push(r);return t}
async function AVl(e){if(e.nameType==="application")return null;let t=e.name;if(!t)return null;if(!/^[A-Za-z0-9_+-]+$/.test(t))return null;if(Pza.has(t.toLowerCase()))return null;if(e.nameType==="cmdlet")return t;if(e.elementTypes?.[0]!=="StringConstant")return null;for(let i=0;i<e.args.length;i++){let a=e.elementTypes[i+1];if(a!=="StringConstant"&&a!=="Parameter")return null}let n=t.toLowerCase(),r=await Tke(n),o=await YIn(t,e.args,r),s=0;for(let i of o.split(" ").slice(1)){if(i.includes("\\"))return null;while(s<e.args.length){let a=e.args[s];if(a===i)break;if(a.startsWith("-")){if(s++,r?.options&&s<e.args.length&&e.args[s]!==i&&!e.args[s].startsWith("-")){let l=a.toLowerCase();if(r.options.find((u)=>Array.isArray(u.name)?u.name.includes(l):u.name===l)?.args)s++}continue}return null}if(s>=e.args.length)return null;s++}if(!o.includes(" ")&&(r?.subcommands?.length||c9e[n]))return null;return o}
async function hVl(e,t){let n=await _ke(e);if(!n.valid)return[];let r=RLm(n);if(r.length<=1){let a=r[0]?await AVl(r[0]):null;return a?[a]:[]}let o=[];for(let a of r){if(t?.(a))continue;let l=await AVl(a);if(l)o.push(l)}if(o.length===0)return[];let s=new Map;for(let a of o){let l=Di(a," ").toLowerCase(),c=s.get(l);if(c)c.push(a);else s.set(l,[a])}let i=[];for(let[a,l]of s){let c=xLm(l);if((c===""?0:Uu(c," ")+1)<=1){if((await Tke(a))?.subcommands?.length||c9e[a])continue}i.push(c)}return i}
function xLm(e){if(e.length===0)return"";if(e.length===1)return e[0];let t=e[0].split(" "),n=t.length;for(let r=1;r<e.length;r++){let o=e[r].split(" "),s=0;while(s<n&&s<o.length&&o[s].toLowerCase()===t[s].toLowerCase())s++;if(n=s,n===0)break}return t.slice(0,n).join(" ")}
var gVl=b(()=>{PYr();IYr();dr();Afo();Jae()});
export {RLm,AVl,hVl,xLm,gVl};
