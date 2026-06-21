// @ts-nocheck
import {Gq,HL} from "../src/tools/4363_stripAllEnvVars.ts";
import {Zg,AN} from "../src/telemetry/5180_commandWithoutRedirections.ts";
import {b} from "../runtime.ts";
function T2p(e){return y2p.includes(e)}
function S2p(e,t){let n=Gq(e),[r]=n.split(/\s+/);if(!r)return{behavior:"passthrough",message:"Base command not found"};if(t.mode==="acceptEdits"&&T2p(r))return{behavior:"allow",updatedInput:{command:e},decisionReason:{type:"mode",mode:"acceptEdits"}};return{behavior:"passthrough",message:`No mode-specific handling for '${r}' in ${t.mode} mode`}}
function MXa(e,t){if(t.mode==="bypassPermissions")return{behavior:"passthrough",message:"Bypass mode is handled in main permission flow"};if(t.mode==="dontAsk")return{behavior:"passthrough",message:"DontAsk mode is handled in main permission flow"};let n=Zg(e.command),r=!1;for(let o of n){let s=S2p(o,t);if(s.behavior==="ask"||s.behavior==="deny")return s;if(s.behavior==="passthrough")return{behavior:"passthrough",message:"No mode-specific validation required"};r=!0}if(r)return{behavior:"allow",updatedInput:e,decisionReason:{type:"mode",mode:t.mode}};return{behavior:"passthrough",message:"No mode-specific validation required"}}
var y2p;
var NXa=b(()=>{AN();HL();y2p=["mkdir","touch","rm","rmdir","mv","cp","sed"]});
export {T2p,S2p,MXa,y2p,NXa};
