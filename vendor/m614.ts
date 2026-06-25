// @ts-nocheck
import {Ne} from "./m583.ts";
import {b,x} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
import {Ir} from "./m584.ts";
import {$N} from "./m607.ts";
import {yk} from "./m613.ts";
function b1e(){return Ne.AWS_REGION||Ne.AWS_DEFAULT_REGION||"us-east-1"}
function myr(){return`${Ne.AWS_CONFIG_FILE??""}|${Ne.AWS_SHARED_CREDENTIALS_FILE??""}|${Ne.AWS_PROFILE??""}`}
async function t2(){let e=Ne.AWS_REGION||Ne.AWS_DEFAULT_REGION;if(e)return e;return await Xru()||b1e()}
function qns(){return fyr().region}
function fyr(){let e=Ne.AWS_REGION||Ne.AWS_DEFAULT_REGION;if(e)return{region:e,source:"env"};let t=$ns.get(myr());if(t)return{region:t,source:"shared-config"};return{region:b1e(),source:"default"}}
var $ns,Xru;
var E1e=b(()=>{Wi();Ir();$ns=new Map;Xru=Hn(async()=>{let e=myr(),t;try{let[n,r]=await Promise.all([Promise.resolve().then(() => x($N(),1)),Promise.resolve().then(() => x(yk(),1))]),o=n.loadConfig??n.default?.loadConfig,s=r.NODE_REGION_CONFIG_FILE_OPTIONS??r.default?.NODE_REGION_CONFIG_FILE_OPTIONS;t=(await o({environmentVariableSelector:()=>{return},configFileSelector:(a)=>a.region,default:()=>{return}},s)())?.trim()||void 0}catch{t=void 0}return $ns.set(e,t),t},myr)});
export {b1e,myr,t2,qns,fyr,$ns,Xru,E1e};
