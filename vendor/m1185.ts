// @ts-nocheck
import {b} from "../runtime.ts";
function ZOs(e){let{signer:t,signer:n}=e,r=Object.assign(e,{eventSigner:t,messageSigner:n}),o=r.eventStreamPayloadHandlerProvider(r);return Object.assign(r,{eventStreamPayloadHandler:o})}
var eLs=()=>{};
var tLs=()=>{};
var nLs=()=>{};
class wNe{method;protocol;hostname;port;path;query;headers;username;password;fragment;body;constructor(e){this.method=e.method||"GET",this.hostname=e.hostname||"localhost",this.port=e.port,this.query=e.query||{},this.headers=e.headers||{},this.body=e.body,this.protocol=e.protocol?e.protocol.slice(-1)!==":"?`${e.protocol}:`:e.protocol:"https:",this.path=e.path?e.path.charAt(0)!=="/"?`/${e.path}`:e.path:"/",this.username=e.username,this.password=e.password,this.fragment=e.fragment}static clone(e){let t=new wNe({...e,headers:{...e.headers}});if(t.query)t.query=gMu(t.query);return t}static isInstance(e){if(!e)return!1;let t=e;return"method"in t&&"protocol"in t&&"hostname"in t&&"path"in t&&typeof t.query==="object"&&typeof t.headers==="object"}clone(){return wNe.clone(this)}}
function gMu(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return{...t,[n]:Array.isArray(r)?[...r]:r}},{})}
var rLs=()=>{};
var Tkr=b(()=>{eLs();tLs();nLs();rLs()});
export {ZOs,eLs,tLs,nLs,wNe,gMu,rLs,Tkr};
