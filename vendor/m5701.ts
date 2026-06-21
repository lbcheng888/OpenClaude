// @ts-nocheck
import {getProjectTempDir,nA} from "../src/permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
class rlc{async snapshot(e,t){return t}async restore(e){return{}}async flush(){}}
function cNo(){return L4m.getStore()??M4m}
function uNo(){return nlc.join(getProjectTempDir(),getSessionId())}
var tlc,nlc,L4m,M4m;
var olc=b(()=>{lt();nA();tlc=require("async_hooks"),nlc=require("path");L4m=new tlc.AsyncLocalStorage,M4m=new rlc});
export {rlc,cNo,uNo,tlc,nlc,L4m,M4m,olc};
