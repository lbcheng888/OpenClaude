// @ts-nocheck
import {_0t,EUe,sbn} from "./m2461.ts";
import {KZe,rbn} from "../src/artifact/2461_context.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
function izp(e){let t=new Set(_0t.map((n)=>EUe(n.key)));return e.map((n)=>{let r={};for(let[o,s]of Object.entries(n.bindings))if(!t.has(EUe(o)))r[o]=s;return{context:n.context,bindings:r}}).filter((n)=>Object.keys(n.bindings).length>0)}
function ddl(){let t={$schema:"https://www.schemastore.org/claude-code-keybindings.json",$docs:"https://code.claude.com/docs/en/keybindings",bindings:izp(KZe)};return Le(t,null,2)+`
`}
var pdl=b(()=>{Xt();rbn();sbn()});
export {izp,ddl,pdl};
