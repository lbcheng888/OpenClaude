// @ts-nocheck
import {getProjectTempDir,Xm} from "../src/permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
class pyc{async snapshot(e,t){return t}async restore(e){return{}}async flush(){}}
function Z$o(){return qYm.getStore()??WYm}
function e9o(){return dyc.join(getProjectTempDir(),getSessionId())}
var uyc,dyc,qYm,WYm;
var myc=b(()=>{lt();Xm();uyc=require("async_hooks"),dyc=require("path");qYm=new uyc.AsyncLocalStorage,WYm=new pyc});
export {pyc,Z$o,e9o,uyc,dyc,qYm,WYm,myc};
