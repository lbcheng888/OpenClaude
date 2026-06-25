// @ts-nocheck
import {aq,jO} from "../src/tools/4385_stripAllEnvVars.ts";
import {u_,H1} from "../src/telemetry/5213_commandWithoutRedirections.ts";
import {b} from "../runtime.ts";
function nWp(e){return tWp.includes(e)}
function rWp(e,t){let n=aq(e),[r]=n.split(/\s+/);if(!r)return{behavior:"passthrough",message:"Base command not found"};if(t.mode==="acceptEdits"&&nWp(r))return{behavior:"allow",updatedInput:{command:e},decisionReason:{type:"mode",mode:"acceptEdits"}};return{behavior:"passthrough",message:`No mode-specific handling for '${r}' in ${t.mode} mode`}}
function yol(e,t){if(t.mode==="bypassPermissions")return{behavior:"passthrough",message:"Bypass mode is handled in main permission flow"};if(t.mode==="dontAsk")return{behavior:"passthrough",message:"DontAsk mode is handled in main permission flow"};let n=u_(e.command),r=!1;for(let o of n){let s=rWp(o,t);if(s.behavior==="ask"||s.behavior==="deny")return s;if(s.behavior==="passthrough")return{behavior:"passthrough",message:"No mode-specific validation required"};r=!0}if(r)return{behavior:"allow",updatedInput:e,decisionReason:{type:"mode",mode:t.mode}};return{behavior:"passthrough",message:"No mode-specific validation required"}}
var tWp;
var Tol=b(()=>{H1();jO();tWp=["mkdir","touch","rm","rmdir","mv","cp","sed"]});
export {nWp,rWp,yol,tWp,Tol};
