// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {OO,rC,m1,joe,UOs,k8} from "./m1291.ts";
import {dp,sn} from "../src/config/0047_namespace.ts";
var V9s={};
isFullscreenWithTTY(V9s,{startKeychainPrefetch:()=>startKeychainPrefetch,setWindowsCredManagerAvailable:()=>setWindowsCredManagerAvailable,setLastKnown:()=>setLastKnown,isWindowsCredManagerAvailable:()=>isWindowsCredManagerAvailable,getLegacyApiKeyPrefetchResult:()=>getLegacyApiKeyPrefetchResult,getLastKnown:()=>getLastKnown,ensureKeychainPrefetchCompleted:()=>ensureKeychainPrefetchCompleted,clearLegacyApiKeyPrefetch:()=>clearLegacyApiKeyPrefetch});
function isWindowsCredManagerAvailable(){return $9s===!0}
function setWindowsCredManagerAvailable(e){$9s=e}
function getLastKnown(){return j9s}
function setLastKnown(e){j9s=e}
function F9s(e){return new Promise((t)=>{U9s.execFile("security",["find-generic-password","-a",OO(),"-w","-s",e],{encoding:"utf-8",timeout:rLu},(n,r)=>{t({stdout:n?null:r?.trim()||null,timedOut:Boolean(n&&"killed"in n&&n.killed)})})})}
function startKeychainPrefetch(){if(ydn||dp())return;let e=rC.generation,t=F9s(m1(joe)),n=F9s(m1());ydn=Promise.all([t,n]).then(([r,o])=>{if(!r.timedOut)UOs(r.stdout,e);if(!o.timedOut)Txr={stdout:o.stdout}})}
async function ensureKeychainPrefetchCompleted(){if(ydn)await ydn}
function getLegacyApiKeyPrefetchResult(){return Txr}
function clearLegacyApiKeyPrefetch(){Txr=null}
var U9s,rLu=1e4,Txr=null,ydn=null,$9s,j9s=null;
var DYe=b(()=>{sn();k8();U9s=require("child_process")});
export {V9s,isWindowsCredManagerAvailable,setWindowsCredManagerAvailable,getLastKnown,setLastKnown,F9s,startKeychainPrefetch,ensureKeychainPrefetchCompleted,getLegacyApiKeyPrefetchResult,clearLegacyApiKeyPrefetch,U9s,rLu,Txr,ydn,$9s,j9s,DYe};
