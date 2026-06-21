// @ts-nocheck
import {bd,Qln,z2} from "./m1280.ts";
import {qoe,Gze,Svt,LEe,gme} from "../src/config/1280_BedrockClient.ts";
import {GJo,P2,kMe} from "./m608.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {getInitialSettings,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {getModelStrings,setModelStrings,lt} from "../src/session/0131_sent.ts";
import {getAPIProvider,li} from "../src/api/1282_usesFirstPartyModelIds.ts";
import {b} from "../runtime.ts";
import {Rn,De} from "../src/session/0615_length.ts";
import {g7e} from "./m615.ts";
function Cvt(e,t){let n=mvr.find((s)=>bd[s][e]!==null),r=e==="bedrock"?qoe(t??GJo()):void 0,o={};for(let s of mvr){let i=bd[s][e]??(n?bd[n][e]:bd[s].firstParty);o[s]=r?Gze(i,r):i}return o}
async function _Iu(){let e=await P2(),t=Cvt("bedrock",e),n;try{n=await Svt()}catch(s){return logForDebugging(`Failed to list Bedrock inference profiles, falling back to hardcoded models: ${s instanceof Error?s.message:String(s)}`,{level:"error"}),t}if(!n?.length)return t;let r=qoe(e),o={};for(let s of mvr){let i=bd[s].firstParty;o[s]=LEe(n,i,r)||t[s]}return o}
function _Os(e){let t=getInitialSettings().modelOverrides;if(!t)return e;let n={...e};for(let[r,o]of Object.entries(t)){let s=Qln[r];if(s&&o)n[s]=o}return n}
function Kze(e){let t;try{t=getInitialSettings().modelOverrides}catch{return e}if(!t)return e;for(let[n,r]of Object.entries(t))if(r===e)return n;return e}
function TOs(){if(getModelStrings()!==null)return;if(getAPIProvider()!=="bedrock"){setModelStrings(Cvt(getAPIProvider()));return}yOs()}
function Im(){let e=getModelStrings();if(e===null)return TOs(),_Os(Cvt(getAPIProvider()));return _Os(e)}
function NEe(){let e=getModelStrings();if(e===null)return TOs(),Cvt(getAPIProvider());return e}
async function ecn(){if(getModelStrings()!==null)return;if(getAPIProvider()!=="bedrock"){setModelStrings(Cvt(getAPIProvider()));return}await yOs()}
var mvr,yOs;
var yQ=b(()=>{lt();kMe();qe();Rn();yr();gme();z2();li();mvr=Object.keys(bd);yOs=g7e(async()=>{if(getModelStrings()!==null)return;try{let e=await _Iu();setModelStrings(e)}catch(e){De(e)}})});
export {Cvt,_Iu,_Os,Kze,TOs,Im,NEe,ecn,mvr,yOs,yQ};
