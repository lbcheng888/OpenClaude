// @ts-nocheck
import {Rm,tI} from "./m465.ts";
import {execFileNoThrow,Ii} from "./m690.ts";
import {b} from "../runtime.ts";
function eat(e,t){let n=0,r=[];function o(){if(n<e)return n++,Promise.resolve();return new Promise((i)=>r.push(i))}function s(){let i=r.shift();if(i)i();else n--}return async(...i)=>{await o();try{return await t(...i)}finally{s()}}}
async function vha(e){let t=pto.get(e);if(t!==void 0)return t;let n=await LZd(e);return pto.set(e,n),n}
function mto(e){pto.delete(e)}
async function LZd(e){let t=e==="github.com"?process.env.GH_TOKEN||process.env.GITHUB_TOKEN:process.env.GH_HOST===e?process.env.GH_ENTERPRISE_TOKEN||process.env.GITHUB_ENTERPRISE_TOKEN:void 0;if(t)return t;if(!await Rm("gh"))return null;let{stdout:r,code:o}=await execFileNoThrow("gh",["auth","token","--hostname",e],{timeout:5000,preserveOutputOnError:!1,env:{...process.env,GH_TOKEN:"",GITHUB_TOKEN:"",GH_ENTERPRISE_TOKEN:"",GITHUB_ENTERPRISE_TOKEN:""}});if(o!==0)return null;let s=r.trim();return s.length>0?s:null}
var pto;
var wha=b(()=>{Ii();tI();pto=new Map});
export {eat,vha,mto,LZd,pto,wha};
