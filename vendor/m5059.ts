// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {ownProcStart,isSameProcessAsync,rE} from "./m1456.ts";
import {ci,pT} from "./m1289.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {Fa,Pd} from "./m701.ts";
import {b} from "../runtime.ts";
function P8t(){return kIl.join(tr(),"daemon.status.json")}
async function HIl(e){let t={supervisorPid:process.pid,supervisorProcStart:ownProcStart(),writtenAt:Date.now(),workers:e};try{await ci().atomicWrite(P8t(),Le(t,null,2))}catch{}}
async function IIl(){try{await ci().delete(P8t())}catch{}}
async function DIl(){let e;try{e=await ci().read(P8t())}catch{return null}let t=Fa(e,!1);if(!t||typeof t!=="object")return null;let n=t;if(typeof n.supervisorPid!=="number"||typeof n.workers!=="object"||n.workers===null)return null;try{process.kill(n.supervisorPid,0)}catch{return null}let r=typeof n.supervisorProcStart==="string"?n.supervisorProcStart:void 0;if(!await isSameProcessAsync(n.supervisorPid,r))return null;return t}
var kIl;
var o7n=b(()=>{pT();sn();rE();Pd();Xt();kIl=require("path")});
export {P8t,HIl,IIl,DIl,kIl,o7n};
