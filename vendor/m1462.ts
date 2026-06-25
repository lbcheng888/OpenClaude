// @ts-nocheck
import {b} from "../runtime.ts";
function getTeammateContext(){return Axr.getStore()}
function runWithTeammateContext(e,t){return Axr.run(e,t)}
function isInProcessTeammate(){return Axr.getStore()!==void 0}
function createTeammateContext(e){return{...e,isInProcess:!0}}
var U5s,Axr;
var b2=b(()=>{U5s=require("async_hooks"),Axr=new U5s.AsyncLocalStorage});
export {getTeammateContext,runWithTeammateContext,isInProcessTeammate,createTeammateContext,U5s,Axr,b2};
