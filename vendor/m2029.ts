// @ts-nocheck
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
import {Ps,usesFirstPartyModelIds} from "../src/api/1287_usesFirstPartyModelIds.ts";
var oed,m8;
var G0t=b(()=>{Wi();Ps();oed=[{modelEnvVar:"ANTHROPIC_DEFAULT_FABLE_MODEL",capabilitiesEnvVar:"ANTHROPIC_DEFAULT_FABLE_MODEL_SUPPORTED_CAPABILITIES"},{modelEnvVar:"ANTHROPIC_DEFAULT_OPUS_MODEL",capabilitiesEnvVar:"ANTHROPIC_DEFAULT_OPUS_MODEL_SUPPORTED_CAPABILITIES"},{modelEnvVar:"ANTHROPIC_DEFAULT_SONNET_MODEL",capabilitiesEnvVar:"ANTHROPIC_DEFAULT_SONNET_MODEL_SUPPORTED_CAPABILITIES"},{modelEnvVar:"ANTHROPIC_DEFAULT_HAIKU_MODEL",capabilitiesEnvVar:"ANTHROPIC_DEFAULT_HAIKU_MODEL_SUPPORTED_CAPABILITIES"},{modelEnvVar:"ANTHROPIC_CUSTOM_MODEL_OPTION",capabilitiesEnvVar:"ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES"}],m8=Hn((e,t)=>{if(usesFirstPartyModelIds())return;let n=e.toLowerCase();for(let r of oed){let o=process.env[r.modelEnvVar],s=process.env[r.capabilitiesEnvVar];if(!o||s===void 0)continue;if(n!==o.toLowerCase())continue;return s.toLowerCase().split(",").map((i)=>i.trim()).includes(t)}return},(e,t)=>`${e.toLowerCase()}:${t}`)});
export {oed,m8,G0t};
