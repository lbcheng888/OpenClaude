// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {Vi,$d} from "../src/config/0620_$d.ts";
import {p8,PBe} from "../src/config/2026_error.ts";
import {initProfileReportModule,Ph} from "../src/agent/1459_agentType.ts";
import {isClaudeAISubscriber,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {OAUTH_BETA_HEADER,Sc} from "../src/api/0465_getOauthConfig.ts";
import {J_,$X} from "./m446.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
import {Qr} from "./m323.ts";
import {pd,ba} from "./m706.ts";
import {Ps} from "../src/api/1287_usesFirstPartyModelIds.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
function hai(){return YFr.join(or(),"cache")}
function gai(){return YFr.join(hai(),"model-capabilities.json")}
function _ai(){return!1}
function QZu(e){return[...e].sort((t,n)=>n.id.length-t.id.length||t.id.localeCompare(n.id))}
function yai(e){if(!_ai())return;let t=jFr(gai());if(!t||t.length===0)return;let n=e.toLowerCase(),r=t.find((o)=>o.id.toLowerCase()===n);if(r)return r;return t.find((o)=>n.includes(o.id.toLowerCase()))}
async function Tai(){if(!_ai())return;if(Vi())return;try{let e=await p8({maxRetries:1,agentContext:initProfileReportModule()}),t=isClaudeAISubscriber()?[OAUTH_BETA_HEADER]:void 0,n=[];for await(let s of e.models.list({betas:t})){let i=fai().safeParse(s);if(i.success)n.push(i.data)}if(n.length===0)return;let r=gai(),o=QZu(n);if(J_(jFr(r),o)){logForDebugging("[modelCapabilities] cache unchanged, skipping write");return}await Iyn.mkdir(hai(),{recursive:!0}),await Iyn.writeFile(r,TeamDeleteToolName({models:o,timestamp:Date.now()}),{encoding:"utf-8",mode:384}),jFr.cache.delete(r),logForDebugging(`[modelCapabilities] cached ${o.length} models`)}catch(e){logForDebugging(`[modelCapabilities] fetch failed: ${e instanceof Error?e.message:"unknown"}`)}}
var mai,Iyn,YFr,fai,XZu,jFr;
var JFr=b(()=>{$X();Wi();Qr();Sc();PBe();Ph();lo();qe();dn();pd();$d();tn();Ps();mai=require("fs"),Iyn=require("fs/promises"),YFr=require("path"),fai=ve(()=>C.object({id:C.string(),max_input_tokens:C.number().optional(),max_tokens:C.number().optional()}).strip()),XZu=ve(()=>C.object({models:C.array(fai()),timestamp:C.number()}));jFr=Hn((e)=>{try{let t=mai.readFileSync(e,"utf-8"),n=XZu().safeParse(ba(t,!1));return n.success?n.data.models:null}catch{return null}},(e)=>e)});
export {hai,gai,_ai,QZu,yai,Tai,mai,Iyn,YFr,fai,XZu,jFr,JFr};
