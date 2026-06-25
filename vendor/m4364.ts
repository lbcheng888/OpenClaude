// @ts-nocheck
import {D3t,Sye,v6e,Qdo,Zdo} from "./m3990.ts";
import {b} from "../runtime.ts";
import {br} from "../src/config/0745_updateSettingsForSource.ts";
function T8n(e){let t=e.find((n)=>n.name===D3t);return{codeReview:e.some((n)=>n.name===Sye),verify:e.some((n)=>n.name===v6e),simplify:t!==void 0&&t.loadedFrom!=="bundled",commit:e.some((n)=>n.name===Qdo),pr:e.some((n)=>n.name===Zdo)}}
function k6t(e){return""}
var H6t=b(()=>{br()});
export {T8n,k6t,H6t};
