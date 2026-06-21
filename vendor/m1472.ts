// @ts-nocheck
import {X} from "../runtime.ts";
import {mT} from "./m1464.ts";
var E9s=X((UfA,b9s)=>{var $Ou=mT();function qOu(e){let t=["mkdir","realpath","stat","rmdir","utimes"],n={...e};return t.forEach((r)=>{n[r]=(...o)=>{let s=o.pop(),i;try{i=e[`${r}Sync`](...o)}catch(a){return s(a)}s(null,i)}}),n}function jOu(e){return(...t)=>new Promise((n,r)=>{t.push((o,s)=>{if(o)r(o);else n(s)}),e(...t)})}function WOu(e){return(...t)=>{let n,r;if(t.push((o,s)=>{n=o,r=s}),e(...t),n)throw n;return r}}function GOu(e){if(e={...e},e.fs=qOu(e.fs||$Ou),typeof e.retries==="number"&&e.retries>0||e.retries&&typeof e.retries.retries==="number"&&e.retries.retries>0)throw Object.assign(Error("Cannot use retries with the sync api"),{code:"ESYNC"});return e}b9s.exports={toPromise:jOu,toSync:WOu,toSyncOptions:GOu}});
export {E9s};
