// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {ZP,aC,wM,Woe,LBs,G5} from "./m1296.ts";
import {Ed,dn} from "../src/config/0137_namespace.ts";
var $8s={};
ft($8s,{startKeychainPrefetch:()=>startKeychainPrefetch,setWindowsCredManagerAvailable:()=>setWindowsCredManagerAvailable,setLastKnown:()=>setLastKnown,isWindowsCredManagerAvailable:()=>isWindowsCredManagerAvailable,getLegacyApiKeyPrefetchResult:()=>getLegacyApiKeyPrefetchResult,getLastKnown:()=>getLastKnown,ensureKeychainPrefetchCompleted:()=>ensureKeychainPrefetchCompleted,clearLegacyApiKeyPrefetch:()=>clearLegacyApiKeyPrefetch});
function isWindowsCredManagerAvailable(){return M8s===!0}
function setWindowsCredManagerAvailable(e){M8s=e}
function getLastKnown(){return F8s}
function setLastKnown(e){F8s=e}
function O8s(e){return new Promise((t)=>{L8s.execFile("security",["find-generic-password","-a",ZP(),"-w","-s",e],{encoding:"utf-8",timeout:E3u},(n,r)=>{t({stdout:n?null:r?.trim()||null,timedOut:Boolean(n&&"killed"in n&&n.killed)})})})}
function startKeychainPrefetch(){if(tfn||Ed())return;let e=aC.generation,t=O8s(wM(Woe)),n=O8s(wM());tfn=Promise.all([t,n]).then(([r,o])=>{if(!r.timedOut)LBs(r.stdout,e);if(!o.timedOut)Jxr={stdout:o.stdout}})}
async function ensureKeychainPrefetchCompleted(){if(tfn)await tfn}
function getLegacyApiKeyPrefetchResult(){return Jxr}
function clearLegacyApiKeyPrefetch(){Jxr=null}
var L8s,E3u=1e4,Jxr=null,tfn=null,M8s,F8s=null;
var IXe=b(()=>{dn();G5();L8s=require("child_process")});
export {$8s,isWindowsCredManagerAvailable,setWindowsCredManagerAvailable,getLastKnown,setLastKnown,O8s,startKeychainPrefetch,ensureKeychainPrefetchCompleted,getLegacyApiKeyPrefetchResult,clearLegacyApiKeyPrefetch,L8s,E3u,Jxr,tfn,M8s,F8s,IXe};
