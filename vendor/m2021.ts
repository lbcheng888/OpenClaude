// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {ra,Ap} from "../src/config/0614_Ap.ts";
import {Q8,NBe} from "../src/config/2021_error.ts";
import {Af,S_} from "../src/agent/1454_agentType.ts";
import {isClaudeAISubscriber,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {OAUTH_BETA_HEADER,Dc} from "../src/api/0459_getOauthConfig.ts";
import {aT,durationUnitMillis} from "./m442.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
import {Xr} from "./m321.ts";
import {Pd,Fa} from "./m701.ts";
import {li} from "../src/api/1282_usesFirstPartyModelIds.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
function yti(){return yLr.join(tr(),"cache")}
function Tti(){return yLr.join(yti(),"model-capabilities.json")}
function Sti(){return!1}
function LWu(e){return[...e].sort((t,n)=>n.id.length-t.id.length||t.id.localeCompare(n.id))}
function bti(e){if(!Sti())return;let t=_Lr(Tti());if(!t||t.length===0)return;let n=e.toLowerCase(),r=t.find((o)=>o.id.toLowerCase()===n);if(r)return r;return t.find((o)=>n.includes(o.id.toLowerCase()))}
async function Eti(){if(!Sti())return;if(ra())return;try{let e=await Q8({maxRetries:1,agentContext:Af()}),t=isClaudeAISubscriber()?[OAUTH_BETA_HEADER]:void 0,n=[];for await(let s of e.models.list({betas:t})){let i=_ti().safeParse(s);if(i.success)n.push(i.data)}if(n.length===0)return;let r=Tti(),o=LWu(n);if(aT(_Lr(r),o)){logForDebugging("[modelCapabilities] cache unchanged, skipping write");return}await zAn.mkdir(yti(),{recursive:!0}),await zAn.writeFile(r,Le({models:o,timestamp:Date.now()}),{encoding:"utf-8",mode:384}),_Lr.cache.delete(r),logForDebugging(`[modelCapabilities] cached ${o.length} models`)}catch(e){logForDebugging(`[modelCapabilities] fetch failed: ${e instanceof Error?e.message:"unknown"}`)}}
var gti,zAn,yLr,_ti,OWu,_Lr;
var TLr=b(()=>{durationUnitMillis();ta();Xr();Dc();NBe();S_();Ao();qe();sn();Pd();Ap();Xt();li();gti=require("fs"),zAn=require("fs/promises"),yLr=require("path"),_ti=we(()=>E.object({id:E.string(),max_input_tokens:E.number().optional(),max_tokens:E.number().optional()}).strip()),OWu=we(()=>E.object({models:E.array(_ti()),timestamp:E.number()}));_Lr=wn((e)=>{try{let t=gti.readFileSync(e,"utf-8"),n=OWu().safeParse(Fa(t,!1));return n.success?n.data.models:null}catch{return null}},(e)=>e)});
export {yti,Tti,Sti,LWu,bti,Eti,gti,zAn,yLr,_ti,OWu,_Lr,TLr};
