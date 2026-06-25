// @ts-nocheck
import {b} from "../runtime.ts";
function ayo(e){return syo.get(e)}
function YQa(e){let t=iyo.get(e);return t!==void 0?syo.get(t):void 0}
function I5n(e,t){syo.set(e,t)}
function lyo(e,t){iyo.set(e,t)}
function cyo(e){iyo.delete(e)}
function uyo(e,t){if(e===void 0||e===""||e==="owner")return{mode:"owner",isSharedLive:!1};if(e==="users"||e==="org")return{mode:e,isSharedLive:(t??"")===""};return{mode:"unknown",isSharedLive:!0}}
function JQa(e){if(e==="org")return"your organization";if(e==="users")return"specific users";return"others (unrecognized share mode \u2014 treating as shared)"}
var syo,iyo;
var XQa=b(()=>{syo=new Map,iyo=new Map});
export {ayo,YQa,I5n,lyo,cyo,uyo,JQa,syo,iyo,XQa};
