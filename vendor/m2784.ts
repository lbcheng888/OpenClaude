// @ts-nocheck
import {P_,po} from "../src/tools/5224_userPromptCount.ts";
import {b} from "../runtime.ts";
function kot(e){let t=[],n=[],r;for(let o of e){if(o.type==="assistant"&&o.message.id!==r&&n.length>0)t.push(n),n=[o];else n.push(o);if(o.type==="assistant")r=o.message.id}if(n.length>0)t.push(n);return t}
function y1t(e){let t=P_(e).filter((n)=>n.type!=="progress");return kot(t)}
function p8i(e){return y1t(e).length<2}
var Szr=b(()=>{po()});
export {kot,y1t,p8i,Szr};
