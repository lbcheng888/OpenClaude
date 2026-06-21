// @ts-nocheck
import {b} from "../runtime.ts";
function cmo(e){return amo.get(e)}
function C7a(e){let t=lmo.get(e);return t!==void 0?amo.get(t):void 0}
function _4n(e,t){amo.set(e,t)}
function umo(e,t){lmo.set(e,t)}
function dmo(e){lmo.delete(e)}
function pmo(e,t){if(e===void 0||e===""||e==="owner")return{mode:"owner",isSharedLive:!1};if(e==="users"||e==="org")return{mode:e,isSharedLive:(t??"")===""};return{mode:"unknown",isSharedLive:!0}}
function v7a(e){if(e==="org")return"your organization";if(e==="users")return"specific users";return"others (unrecognized share mode \u2014 treating as shared)"}
var amo,lmo;
var w7a=b(()=>{amo=new Map,lmo=new Map});
export {cmo,C7a,_4n,umo,dmo,pmo,v7a,amo,lmo,w7a};
