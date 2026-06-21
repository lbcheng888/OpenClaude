// @ts-nocheck
import {b} from "../runtime.ts";
function getTeammateContext(){return zRr.getStore()}
function runWithTeammateContext(e,t){return zRr.run(e,t)}
function isInProcessTeammate(){return zRr.getStore()!==void 0}
function createTeammateContext(e){return{...e,isInProcess:!0}}
var G$s,zRr;
var Q2=b(()=>{G$s=require("async_hooks"),zRr=new G$s.AsyncLocalStorage});
export {getTeammateContext,runWithTeammateContext,isInProcessTeammate,createTeammateContext,G$s,zRr,Q2};
