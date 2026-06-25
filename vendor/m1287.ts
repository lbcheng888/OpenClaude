// @ts-nocheck
import {ed,Mdn,h2} from "./m1285.ts";
import {Uoe,qJe,NNe,_Ae,$oe} from "../src/config/1285_BedrockClient.ts";
import {qns,t2,E1e} from "./m614.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {getInitialSettings,br} from "../src/config/0745_updateSettingsForSource.ts";
import {getModelStrings,setModelStrings,lt} from "../src/session/0132_sent.ts";
import {getAPIProvider,Ps} from "../src/api/1287_usesFirstPartyModelIds.ts";
import {b} from "../runtime.ts";
import {vn,Ie} from "../src/session/0621_length.ts";
import {fje} from "./m621.ts";
function Jwt(e,t){let n=qHr.find((s)=>ed[s][e]!==null),r=e==="bedrock"?Uoe(t??qns()):void 0,o={};for(let s of qHr){let i=ed[s][e]??(n?ed[n][e]:ed[s].firstParty);o[s]=r?qJe(i,r):i}return o}
async function OBu(){let e=await t2(),t=Jwt("bedrock",e),n;try{n=await NNe()}catch(s){return logForDebugging(`Failed to list Bedrock inference profiles, falling back to hardcoded models: ${s instanceof Error?s.message:String(s)}`,{level:"error"}),t}if(!n?.length)return t;let r=Uoe(e),o={};for(let s of qHr){let i=ed[s].firstParty;o[s]=_Ae(n,i,r)||t[s]}return o}
function pBs(e){let t=getInitialSettings().modelOverrides;if(!t)return e;let n={...e};for(let[r,o]of Object.entries(t)){let s=Mdn[r];if(s&&o)n[s]=o}return n}
function GJe(e){let t;try{t=getInitialSettings().modelOverrides}catch{return e}if(!t)return e;for(let[n,r]of Object.entries(t))if(r===e)return n;return e}
function fBs(){if(getModelStrings()!==null)return;if(getAPIProvider()!=="bedrock"){setModelStrings(Jwt(getAPIProvider()));return}mBs()}
function Kp(){let e=getModelStrings();if(e===null)return fBs(),pBs(Jwt(getAPIProvider()));return pBs(e)}
function SAe(){let e=getModelStrings();if(e===null)return fBs(),Jwt(getAPIProvider());return e}
async function Fdn(){if(getModelStrings()!==null)return;if(getAPIProvider()!=="bedrock"){setModelStrings(Jwt(getAPIProvider()));return}await mBs()}
var qHr,mBs;
var gQ=b(()=>{lt();E1e();qe();vn();br();$oe();h2();Ps();qHr=Object.keys(ed);mBs=fje(async()=>{if(getModelStrings()!==null)return;try{let e=await OBu();setModelStrings(e)}catch(e){Ie(e)}})});
export {Jwt,OBu,pBs,GJe,fBs,Kp,SAe,Fdn,qHr,mBs,gQ};
