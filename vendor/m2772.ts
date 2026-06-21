// @ts-nocheck
import {allTools,lo} from "../src/tools/5190_userPromptCount.ts";
import {b} from "../runtime.ts";
function Ent(e){let t=[],n=[],r;for(let o of e){if(o.type==="assistant"&&o.message.id!==r&&n.length>0)t.push(n),n=[o];else n.push(o);if(o.type==="assistant")r=o.message.id}if(n.length>0)t.push(n);return t}
function FOt(e){let t=allTools(e).filter((n)=>n.type!=="progress");return Ent(t)}
function S$i(e){return FOt(e).length<2}
var $5r=b(()=>{lo()});
export {Ent,FOt,S$i,$5r};
