// @ts-nocheck
import {b} from "../runtime.ts";
function GUp(){if($6n)return $6n;return $6n=new Bun.Transpiler({loader:"js",replMode:!0}),$6n}
function q6n(e){let t=GUp(),n=t.transformSync(e);return KUp(t,e),n}
function KUp(e,t){let n;try{n=e.scanImports(t.replace(/^#!.*\n?/,""))}catch{return}for(let{kind:r}of n){let o=VUp[r];if(!o)continue;throw Error(`Module loading (${o}) is not available in REPL \u2014 the vm context is sealed. `+"Use the tool globals instead: await Read({file_path: '...'}), await Glob({pattern: '...'}), the registered shell tool, etc.")}}
function W6n(e){if(e===null||typeof e!=="object")return e;if(Uja.types.isProxy(e))return e;let t=Object.getOwnPropertyDescriptor(e,"value");return t&&"value"in t?t.value:e}
var Uja,$6n,VUp;
var l_o=b(()=>{Uja=require("util");VUp={"import-statement":"import","dynamic-import":"import","require-call":"require"}});
export {GUp,q6n,KUp,W6n,Uja,$6n,VUp,l_o};
