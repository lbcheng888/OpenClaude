// @ts-nocheck
import {isModelAllowed,MO} from "./m1451.ts";
import {bme,X2} from "./m1450.ts";
import {v6,ZHe} from "../src/api/3911_model.ts";
import {dLe,es,uLe,TH} from "./m135.ts";
import {usesFirstPartyModelIds,li} from "../src/api/1282_usesFirstPartyModelIds.ts";
import {je,tk} from "./m577.ts";
import {Im,yQ} from "./m1282.ts";
import {b} from "../runtime.ts";
import {LD} from "./m194.ts";
async function t6t(e,t){let n=e.trim();if(!n)return{valid:!1,error:"Model name cannot be empty"};if(!isModelAllowed(n))return{valid:!1,error:`Model '${n}' is not in the list of available models`};if(!t?.forceServerProbe){let r=n.toLowerCase();if(bme.includes(r))return{valid:!0};if(n===process.env.ANTHROPIC_CUSTOM_MODEL_OPTION)return{valid:!0};if(Qsl.has(n))return{valid:!0}}try{return await v6({model:n,max_tokens:1,maxRetries:0,querySource:"model_validation",messages:[{role:"user",content:[{type:"text",text:"Hi",cache_control:{type:"ephemeral"}}]}]}),Qsl.set(n,!0),{valid:!0}}catch(r){return f8p(r,n)}}
function f8p(e,t){if(e instanceof dLe){let r=A8p(t),o=r?`. Try '${r}' instead`:"";return{valid:!1,error:`Model '${t}' not found${o}`,notFound:!0}}if(e instanceof es){if(e instanceof uLe)return{valid:!1,error:"Authentication failed. Please check your API credentials."};if(e instanceof TH)return{valid:!1,error:"Network error. Please check your internet connection."};let r=e.error;if(r&&typeof r==="object"&&"type"in r&&r.type==="not_found_error"&&"message"in r&&typeof r.message==="string"&&r.message.includes("model:"))return{valid:!1,error:`Model '${t}' not found`,notFound:!0};return{valid:!1,error:`API error: ${e.message}`}}return{valid:!1,error:`Unable to validate model: ${e instanceof Error?e.message:String(e)}`}}
function A8p(e){if(usesFirstPartyModelIds())return;let t=e.toLowerCase();if(t.includes("fable-5")||t.includes("fable_5"))return je.ANTHROPIC_DEFAULT_OPUS_MODEL??Im().opus48;if(t.includes("opus-4-8")||t.includes("opus_4_8"))return Im().opus47;if(t.includes("opus-4-7")||t.includes("opus_4_7"))return Im().opus46;if(t.includes("opus-4-6")||t.includes("opus_4_6"))return Im().opus45;if(t.includes("opus-4-5")||t.includes("opus_4_5"))return Im().opus41;if(t.includes("sonnet-4-6")||t.includes("sonnet_4_6"))return Im().sonnet45;if(t.includes("sonnet-4-5")||t.includes("sonnet_4_5"))return Im().sonnet40;return}
var Qsl;
var _yo=b(()=>{X2();MO();li();ZHe();LD();tk();yQ();Qsl=new Map});
export {t6t,f8p,A8p,Qsl,_yo};
