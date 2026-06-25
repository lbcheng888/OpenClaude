// @ts-nocheck
import {Oa,eO} from "./m1456.ts";
import {kme,T2} from "./m1455.ts";
import {Wq,cxe} from "../src/api/3982_model.ts";
import {sMe,Uo,oMe,uk} from "./m137.ts";
import {usesFirstPartyModelIds,Ps} from "../src/api/1287_usesFirstPartyModelIds.ts";
import {Ne,AR} from "./m583.ts";
import {Kp,gQ} from "./m1287.ts";
import {b} from "../runtime.ts";
import {jx} from "./m196.ts";
function s3a(){hpo.clear()}
async function L3t(e,t){let n=e.trim();if(!n)return{valid:!1,error:"Model name cannot be empty"};if(!Oa(n))return{valid:!1,error:`Model '${n}' is not in the list of available models`};if(!t?.forceServerProbe){let r=n.toLowerCase();if(kme.includes(r))return{valid:!0};if(n===process.env.ANTHROPIC_CUSTOM_MODEL_OPTION)return{valid:!0};if(hpo.has(n))return{valid:!0}}try{return await Wq({model:n,max_tokens:1,maxRetries:0,querySource:"model_validation",messages:[{role:"user",content:[{type:"text",text:"Hi",cache_control:{type:"ephemeral"}}]}]}),hpo.set(n,!0),{valid:!0}}catch(r){return x0p(r,n)}}
function x0p(e,t){if(e instanceof sMe){let r=D0p(t),o=r?`. Try '${r}' instead`:"";return{valid:!1,error:`Model '${t}' not found${o}`,notFound:!0}}if(e instanceof Uo){if(e instanceof oMe)return{valid:!1,error:"Authentication failed. Please check your API credentials."};if(e instanceof uk)return{valid:!1,error:"Network error. Please check your internet connection."};let r=e.error;if(r&&typeof r==="object"&&"type"in r&&r.type==="not_found_error"&&"message"in r&&typeof r.message==="string"&&r.message.includes("model:"))return{valid:!1,error:`Model '${t}' not found`,notFound:!0};return{valid:!1,error:`API error: ${e.message}`}}return{valid:!1,error:`Unable to validate model: ${e instanceof Error?e.message:String(e)}`}}
function D0p(e){if(usesFirstPartyModelIds())return;let t=e.toLowerCase();if(t.includes("fable-5")||t.includes("fable_5"))return Ne.ANTHROPIC_DEFAULT_OPUS_MODEL??Kp().opus48;if(t.includes("opus-4-8")||t.includes("opus_4_8"))return Kp().opus47;if(t.includes("opus-4-7")||t.includes("opus_4_7"))return Kp().opus46;if(t.includes("opus-4-6")||t.includes("opus_4_6"))return Kp().opus45;if(t.includes("opus-4-5")||t.includes("opus_4_5"))return Kp().opus41;if(t.includes("sonnet-4-6")||t.includes("sonnet_4_6"))return Kp().sonnet45;if(t.includes("sonnet-4-5")||t.includes("sonnet_4_5"))return Kp().sonnet40;return}
var hpo;
var t3n=b(()=>{T2();eO();Ps();cxe();jx();AR();gQ();hpo=new Map});
export {s3a,L3t,x0p,D0p,hpo,t3n};
