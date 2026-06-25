// @ts-nocheck
import {Q} from "../runtime.ts";
import {oT} from "./m1469.ts";
var y8s=Q((lwh,_8s)=>{var i3u=oT();function a3u(e){let t=["mkdir","realpath","stat","rmdir","utimes"],n={...e};return t.forEach((r)=>{n[r]=(...o)=>{let s=o.pop(),i;try{i=e[`${r}Sync`](...o)}catch(a){return s(a)}s(null,i)}}),n}function l3u(e){return(...t)=>new Promise((n,r)=>{t.push((o,s)=>{if(o)r(o);else n(s)}),e(...t)})}function c3u(e){return(...t)=>{let n,r;if(t.push((o,s)=>{n=o,r=s}),e(...t),n)throw n;return r}}function u3u(e){if(e={...e},e.fs=a3u(e.fs||i3u),typeof e.retries==="number"&&e.retries>0||e.retries&&typeof e.retries.retries==="number"&&e.retries.retries>0)throw Object.assign(Error("Cannot use retries with the sync api"),{code:"ESYNC"});return e}_8s.exports={toPromise:l3u,toSync:c3u,toSyncOptions:u3u}});
export {y8s};
