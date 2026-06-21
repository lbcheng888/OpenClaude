// @ts-nocheck
import {F2t,K4e,B2t,_io} from "./m3923.ts";
import {b} from "../runtime.ts";
import {yr} from "../src/config/0740_updateSettingsForSource.ts";
function Jfo(e){let t=e.find((n)=>n.name===F2t);return{codeReview:e.some((n)=>n.name===K4e),verify:e.some((n)=>n.name===B2t),simplify:t!==void 0&&t.loadedFrom!=="bundled",commit:e.some((n)=>n.name===_io)}}
function nqn(e){return""}
var rqn=b(()=>{yr()});
export {Jfo,nqn,rqn};
