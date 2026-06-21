// @ts-nocheck
import {je} from "./m577.ts";
import {b,M} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
import {Lr} from "./m578.ts";
import {yB} from "./m601.ts";
import {nk} from "./m607.ts";
function xMe(){return je.AWS_REGION||je.AWS_DEFAULT_REGION||"us-east-1"}
function Bmr(){return`${je.AWS_CONFIG_FILE??""}|${je.AWS_SHARED_CREDENTIALS_FILE??""}|${je.AWS_PROFILE??""}`}
async function P2(){let e=je.AWS_REGION||je.AWS_DEFAULT_REGION;if(e)return e;return await OKc()||xMe()}
function GJo(){return Fmr().region}
function Fmr(){let e=je.AWS_REGION||je.AWS_DEFAULT_REGION;if(e)return{region:e,source:"env"};let t=WJo.get(Bmr());if(t)return{region:t,source:"shared-config"};return{region:xMe(),source:"default"}}
var WJo,OKc;
var kMe=b(()=>{ta();Lr();WJo=new Map;OKc=wn(async()=>{let e=Bmr(),t;try{let[n,r]=await Promise.all([Promise.resolve().then(() => M(yB(),1)),Promise.resolve().then(() => M(nk(),1))]),o=n.loadConfig??n.default?.loadConfig,s=r.NODE_REGION_CONFIG_FILE_OPTIONS??r.default?.NODE_REGION_CONFIG_FILE_OPTIONS;t=(await o({environmentVariableSelector:()=>{return},configFileSelector:(a)=>a.region,default:()=>{return}},s)())?.trim()||void 0}catch{t=void 0}return WJo.set(e,t),t},Bmr)});
export {xMe,Bmr,P2,GJo,Fmr,WJo,OKc,kMe};
