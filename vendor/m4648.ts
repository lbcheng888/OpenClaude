// @ts-nocheck
import {zPt,b2e,KAn} from "./m2471.ts";
import {Ytt,GAn} from "../src/artifact/2471_context.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
function lrm(e){let t=new Set(zPt.map((n)=>b2e(n.key)));return e.map((n)=>{let r={};for(let[o,s]of Object.entries(n.bindings))if(!t.has(b2e(o)))r[o]=s;return{context:n.context,bindings:r}}).filter((n)=>Object.keys(n.bindings).length>0)}
function Kyl(){let t={$schema:"https://www.schemastore.org/claude-code-keybindings.json",$docs:"https://code.claude.com/docs/en/keybindings",bindings:lrm(Ytt)};return TeamDeleteToolName(t,null,2)+`
`}
var zyl=b(()=>{tn();GAn();KAn()});
export {lrm,Kyl,zyl};
