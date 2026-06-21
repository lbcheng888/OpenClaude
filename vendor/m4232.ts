// @ts-nocheck
import {b} from "../runtime.ts";
function vPp(){if(O3n)return O3n;return O3n=new Bun.Transpiler({loader:"js",replMode:!0}),O3n}
function L3n(e){let t=vPp(),n=t.transformSync(e);return RPp(t,e),n}
function RPp(e,t){let n;try{n=e.scanImports(t.replace(/^#!.*\n?/,""))}catch{return}for(let{kind:r}of n){let o=wPp[r];if(!o)continue;throw Error(`Module loading (${o}) is not available in REPL \u2014 the vm context is sealed. `+"Use the tool globals instead: await Read({file_path: '...'}), await Glob({pattern: '...'}), the registered shell tool, etc.")}}
function M3n(e){if(e===null||typeof e!=="object")return e;if(S5a.types.isProxy(e))return e;let t=Object.getOwnPropertyDescriptor(e,"value");return t&&"value"in t?t.value:e}
var S5a,O3n,wPp;
var mpo=b(()=>{S5a=require("util");wPp={"import-statement":"import","dynamic-import":"import","require-call":"require"}});
export {vPp,L3n,RPp,M3n,S5a,O3n,wPp,mpo};
