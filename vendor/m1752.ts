// @ts-nocheck
import {b} from "../runtime.ts";
var XVs=(e,t,n,r,o)=>(...s)=>{n.trace(`Executing function ${t}`);let i=r?.startMeasurement(t,o);if(o){let a=t+"CallCount";r?.incrementFields({[a]:1},o)}try{let a=e(...s);return i?.end({success:!0}),n.trace(`Returning result from ${t}`),a}catch(a){n.trace(`Error occurred in ${t}`);try{n.trace(JSON.stringify(a))}catch(l){n.trace("Unable to print error message.")}throw i?.end({success:!1},a),a}},Ih=(e,t,n,r,o)=>(...s)=>{n.trace(`Executing function ${t}`);let i=r?.startMeasurement(t,o);if(o){let a=t+"CallCount";r?.incrementFields({[a]:1},o)}return r?.setPreQueueTime(t,o),e(...s).then((a)=>(n.trace(`Returning result from ${t}`),i?.end({success:!0}),a)).catch((a)=>{n.trace(`Error occurred in ${t}`);try{n.trace(JSON.stringify(a))}catch(l){n.trace("Unable to print error message.")}throw i?.end({success:!1},a),a})};
var Yme=b(()=>{/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {XVs,Ih,Yme};
