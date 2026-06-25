// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {ownProcStart,isSameProcessAsync,lE} from "./m1461.ts";
import {Js,rT} from "./m1294.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {ba,pd} from "./m706.ts";
import {b} from "../runtime.ts";
function nVt(){return tFl.join(or(),"daemon.status.json")}
async function nFl(e){let t={supervisorPid:process.pid,supervisorProcStart:ownProcStart(),writtenAt:Date.now(),workers:e};try{await Js().atomicWrite(nVt(),TeamDeleteToolName(t,null,2))}catch{}}
async function rFl(){try{await Js().delete(nVt())}catch{}}
async function oFl(){let e;try{e=await Js().read(nVt())}catch{return null}let t=ba(e,!1);if(!t||typeof t!=="object")return null;let n=t;if(typeof n.supervisorPid!=="number"||typeof n.workers!=="object"||n.workers===null)return null;try{process.kill(n.supervisorPid,0)}catch{return null}let r=typeof n.supervisorProcStart==="string"?n.supervisorProcStart:void 0;if(!await isSameProcessAsync(n.supervisorPid,r))return null;return t}
var tFl;
var XYn=b(()=>{rT();dn();lE();pd();tn();tFl=require("path")});
export {nVt,nFl,rFl,oFl,tFl,XYn};
